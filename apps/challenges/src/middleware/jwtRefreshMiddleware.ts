// jwt middleware for express
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import TokenRepo from "../repo/tokenRepo";
import { refreshCookieMaxAgeSeconds, secondInMilliseconds } from "../model/constants";

const jwtRefreshMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies.refreshToken; 

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET || "", (err, tokenContent: any) => {
        if (err) {
            return res.sendStatus(401);
        }

        const token = TokenRepo.extendRefreshToken(tokenContent.id)
        if (token == null) {
            res.status(401).json({message: "Invalid refresh token"})
            return;
        }

        res.cookie('refresh_token', token, {
            httpOnly: true,
            maxAge: refreshCookieMaxAgeSeconds * secondInMilliseconds,
            signed: true,
        });

        req.params.userID = tokenContent.id;
        req.params.email = tokenContent.email;

        next();
    });
}

export default jwtRefreshMiddleware;
