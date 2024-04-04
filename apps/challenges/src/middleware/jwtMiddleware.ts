// jwt middleware for express
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET || "", (err, tokenContent: any) => {
        if (err) {
            return res.sendStatus(401);
        }

        req.params.userID = tokenContent.id;
        req.params.email = tokenContent.email;

        
        next();
    });
}

export default jwtMiddleware;
