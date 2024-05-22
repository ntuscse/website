// jwt middleware for express
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JWTAcessTokenContent {
  id: string;
  email: string;
}
const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.CHALLENGES_JWT_SECRET || "",
    (err, tokenContent) => {
      if (err) {
        return res.sendStatus(401);
      }
      const jwtAccessToken = tokenContent as JWTAcessTokenContent;

      req.params.userID = jwtAccessToken.id;
      req.params.email = jwtAccessToken.email;

      next();
    }
  );
};

export default jwtMiddleware;
