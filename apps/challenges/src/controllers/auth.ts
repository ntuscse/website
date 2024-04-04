import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import AuthService from "../service/authService";
import TokenService from "../service/tokenService";

// TODO: remove this when deployed, only for local use now
const signIn = asyncHandler(async (req: Request, res: Response) => {
    const url = process.env.BASE_URL || null;
    if (!url?.includes("localhost")) {
        res.status(404);
        return;
    }
    try {
        const accessToken = await TokenService.generateAccessToken("65d0479b3f6a9f5986e68ce3", "test@gmail.com");
        const refreshToken = await TokenService.generateRefreshToken("65d0479b3f6a9f5986e68ce3", "test@gmail.com");
        res.status(200).json({
            "access_token": accessToken,
            "refresh_token": refreshToken
        })
    } catch (error) {
        console.log("AuthService.oauthSignIn", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const oauthSignIn = asyncHandler(async (req: Request, res: Response) => {
    const { access_token } = req.body;

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
    signIn,
    oauthSignIn,
    refreshToken,
}

export { AuthController as default };
