import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import AuthService from "../service/authService";

interface OauthSignInReq {
    access_token: string
}

const oauthSignIn = asyncHandler(async (req: Request, res: Response) => {
    const { access_token } = req.body as OauthSignInReq;

    try {
        const { accessToken, refreshToken, createNewUser } = await AuthService.oauthSignIn(access_token);
        res.status(createNewUser ? 200 : 201).json({
            "access_token": accessToken,
            "refresh_token": refreshToken
        })
    } catch (error) {
        console.log("AuthService.oauthSignIn", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userID = req.params.userID;
        const token = await AuthService.refreshToken(userID);
        res.status(200).json(token);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
})

const AuthController = {
    oauthSignIn,
    refreshToken,
}

export { AuthController as default };
