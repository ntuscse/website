// jwt middleware for express
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET || "", (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
}

export default jwtMiddleware;
