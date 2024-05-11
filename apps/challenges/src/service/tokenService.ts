import jwt from "jsonwebtoken";
import { accessTokenMaxAgeSeconds, refreshCookieMaxAgeSeconds } from "../model/constants";

const generateAccessToken = (
    id: string,
    email: string
) => {
    const secret = process.env.CHALLENGES_JWT_SECRET || "";
    const token = jwt.sign({ id, email }, secret, {
        expiresIn: accessTokenMaxAgeSeconds
    });
    return token;
}

const generateRefreshToken = (
    id: string,
    email: string
) => {
    const secret = process.env.CHALLENGES_JWT_SECRET || "";
    const token = jwt.sign({ id, email }, secret, {
        expiresIn: refreshCookieMaxAgeSeconds,
    });
    return token;
}


const TokenService = {
    generateAccessToken,
    generateRefreshToken,
}

export { TokenService as default };