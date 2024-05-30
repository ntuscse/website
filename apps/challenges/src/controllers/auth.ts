import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import AuthService from "../service/authService";
import { Logger } from "nodelogger";

interface OauthSignInReq {
  access_token: string;
}

const oauthSignIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.body as OauthSignInReq;

  try {
    const { accessToken, refreshToken, createNewUser } =
      await AuthService.oauthSignIn(access_token);
    res.status(createNewUser ? 200 : 201).json({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    Logger.error("AuthController.oauthSignIn error", error);
    next(error)
  }
});

const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userID = req.params.userID;
      const token = await AuthService.refreshToken(userID);
      res.status(200).json(token);
    } catch (err) {
      Logger.error("AuthController.refreshToken error", err);
      next(err);
    }
  }
);

const AuthController = {
  oauthSignIn,
  refreshToken,
};

export { AuthController as default };
