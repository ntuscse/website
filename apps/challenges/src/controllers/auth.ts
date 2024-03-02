import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { z } from "zod";
import AuthService from "../service/authService";


const oauthSignIn = asyncHandler(async (req: Request, res: Response) => {
    const { redirectURL } = req.body;

    try {
        const resp = await AuthService.oauthSignIn(redirectURL);
        res.status(resp.status).json({ resp });
    } catch (error) {
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
        append = `#access_token=${accessToken}&refresh_token=${refreshToken}&status=auth_success`;
        
    } catch (err) {
        console.error(err);
    } finally {
        if (nextString) {
            res.redirect(303, nextString + append);
        } else {
            res.status(append === '#status=auth_failure' ? 400 : 200).json({ message: append });
        }
    }

});


const AuthController = {
    oauthSignIn,
    authCallback,
}

export { AuthController as default };
