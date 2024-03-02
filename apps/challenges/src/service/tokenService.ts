import jwt from "jsonwebtoken";

const minuteInSeconds = 60;

const generateAccessToken = async (
    id: string,
    email: string
) => {
    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id, email }, secret, {
        expiresIn: 10 * minuteInSeconds
    });
    return token;
}

const generateRefreshToken = async (
    id: string,
    email: string
) => {
    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id, email }, secret, {
        expiresIn: "7d"
    });
    return token;
}

const TokenService = {
    generateAccessToken,
    generateRefreshToken,
}

export { TokenService as default };