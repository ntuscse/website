// jwt middleware for express
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Logger } from "nodelogger";
interface JWTAcessTokenContent {
  id: string;
  email: string;
}
const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token == null) {
    Logger.debug("jwtMiddleware receive null token");
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.CHALLENGES_JWT_SECRET || "",
    (err, tokenContent) => {
      if (err) {
        Logger.debug(
          "jwtMiddleware error when receiving this tokenContent",
          err,
          tokenContent
        );
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
