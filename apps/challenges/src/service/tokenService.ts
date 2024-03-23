import jwt from "jsonwebtoken";
import { accessTokenMaxAgeSeconds, refreshCookieMaxAgeSeconds } from "../model/constants";
import { isValidObjectId } from "../utils/db";

const generateAccessToken = async (
    id: string,
    email: string
) => {
    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id, email }, secret, {
        expiresIn: accessTokenMaxAgeSeconds
    });
    return token;
}

const generateRefreshToken = async (
    id: string,
    email: string
) => {
    const secret = process.env.JWT_SECRET || "";
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