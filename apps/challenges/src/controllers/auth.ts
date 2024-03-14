import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { z } from "zod";
import AuthService from "../service/authService";
import { accessTokenMaxAgeSeconds, refreshCookieMaxAgeSeconds, secondInMilliseconds } from "../model/constants";


const oauthSignIn = asyncHandler(async (req: Request, res: Response) => {
    const { redirectURL } = req.body;

    try {
        const resp = await AuthService.oauthSignIn(redirectURL);
        res.status(resp.status).json({ resp });
    } catch (error) {
        console.log("AuthService.oauthSignIn", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const authCallback = asyncHandler(async (req: Request, res: Response) => {
    let codeString: string;
    let nextString: string | undefined;
    let append = '#status=auth_failure';

    try {
        console.log(req.query);
        const { code, next } = req.query;

        if (!code) {
            throw new Error('Invalid code');
        }

        codeString = z.string().parse(code);
        nextString = z.string().optional().parse(next);

        const { accessToken, refreshToken } = await AuthService.oauthCallback(codeString, nextString);
        append = `#access_token=${accessToken}&status=auth_success`;
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: refreshCookieMaxAgeSeconds * secondInMilliseconds,
            signed: true,
        });
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: accessTokenMaxAgeSeconds * secondInMilliseconds,
            signed: true,
        });
    } catch (err) {
        console.error(err);
    } finally {
        if (nextString) {
            res.redirect(302, nextString + append);
        } else {
            res.status(append === '#status=auth_failure' ? 400 : 200).json({ message: append });
        }
    }
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userID = req.params.userID;
        const token = await AuthService.refreshToken(userID);
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: accessTokenMaxAgeSeconds * secondInMilliseconds,
            signed: true,
        });
        res.status(201).json(token);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

const AuthController = {
    oauthSignIn,
    authCallback,
    refreshToken,
}

export { AuthController as default };
