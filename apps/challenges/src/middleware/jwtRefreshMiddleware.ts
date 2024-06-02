// jwt middleware for express
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {
  refreshCookieMaxAgeSeconds,
  secondInMilliseconds,
} from "../model/constants";
import TokenService from "../service/tokenService";
import { z } from "zod";
import { TokenModel } from "../model/token";

interface JWTRefreshTokenContent {
  id: string;
  email: string;
}
const jwtRefreshMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (token == null) {
    return res.sendStatus(401);
  }

  let jwtRefreshToken: JWTRefreshTokenContent;
  try {
    const decoded = jwt.verify(token, process.env.CHALLENGES_JWT_SECRET || "");
    jwtRefreshToken = decoded as JWTRefreshTokenContent;
  } catch (err) {
    return res.sendStatus(401);
  }

  TokenService.extendRefreshToken(jwtRefreshToken.id)
    .then((tokenModel: TokenModel | null) => {
      if (tokenModel == null) {
        res.status(401).json({ message: "Invalid refresh token" });
        return;
      }

      res.cookie("refresh_token", tokenModel, {
        httpOnly: true,
        maxAge: refreshCookieMaxAgeSeconds * secondInMilliseconds,
        signed: true,
      });

      req.params.userID = jwtRefreshToken.id;
      req.params.email = jwtRefreshToken.email;

      next();
    })
    .catch((err) => {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request" });
      }
      return;
    });
};

export default jwtRefreshMiddleware;
