// jwt middleware for express
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import TokenService from "../service/tokenService";
import { z } from "zod";
import { TokenModel } from "../model/token";
import { Logger } from "nodelogger";

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
    Logger.error("jwtRefreshMiddleware receive null token");
    return res.sendStatus(401);
  }

  let jwtRefreshToken: JWTRefreshTokenContent;
  try {
    const decoded = jwt.verify(token, process.env.CHALLENGES_JWT_SECRET || "");
    jwtRefreshToken = decoded as JWTRefreshTokenContent;
  } catch (err) {
    Logger.error(
      `jwtRefreshMiddleware error when verifying this refresh token: ${token}`,
      err,
      err instanceof Error ? err.stack : undefined
    );
    return res.sendStatus(401);
  }

  TokenService.ExtendRefreshToken(jwtRefreshToken.id)
    .then((tokenModel: TokenModel | null) => {
      if (tokenModel == null) {
        res.status(401).json({ message: "Invalid refresh token" });
        return;
      }

      req.params.userID = jwtRefreshToken.id;
      req.params.email = jwtRefreshToken.email;

      next();
    })
    .catch((err) => {
      Logger.error(
        `jwtRefreshMiddleware TokenService.extendRefreshToken error`,
        err,
        err instanceof Error ? err.stack : undefined
      );
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request" });
      } else if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
      return;
    });
};

export default jwtRefreshMiddleware;
