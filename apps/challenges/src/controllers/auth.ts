import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import AuthService from "../service/authService";
import { Logger } from "nodelogger";
import { ErrorHandling } from "../middleware/errorHandler";

interface OauthSignInReq {
  access_token: string;
}

const OauthSignIn = asyncHandler(async (req: Request, res: Response) => {
  const { access_token } = req.body as OauthSignInReq;

  try {
    const { accessToken, refreshToken, createNewUser } =
      await AuthService.OauthSignIn(access_token);
    res.status(createNewUser ? 200 : 201).json({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (err) {
    const error = err as Error;
    Logger.error("AuthController.oauthSignIn error", error, error.stack);
    ErrorHandling(error, res);
  }
});

const RefreshToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userID = req.params.userID;
    const token = await AuthService.RefreshToken(userID);
    res.status(200).json({ access_token: token });
  } catch (err) {
    const error = err as Error;
    Logger.error("AuthController.refreshToken error", error, error.stack);
    ErrorHandling(err, res);
  }
});

const AuthController = {
  OauthSignIn,
  RefreshToken,
};

export { AuthController as default };
