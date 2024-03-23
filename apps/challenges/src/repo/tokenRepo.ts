import { refreshCookieMaxAgeSeconds, secondInMilliseconds } from "../model/constants";
import Token, { TokenModel } from "../model/token"
import mongoose from 'mongoose';

const getRefreshToken = async (userID: mongoose.Types.ObjectId): Promise<TokenModel | null> => {
    const token = await Token.findOne({
        userID: userID,
        expiry: { $gt: new Date() }
    });
    return token;
}

const saveRefreshToken = async (
    token: TokenModel
): Promise<TokenModel | null> => {
    const dbToken = new Token(token);
    dbToken.save();
    return dbToken;
}


const extendRefreshToken = async (userID: mongoose.Types.ObjectId): Promise<TokenModel | null> => {
    const now = new Date();
    const newExpiry = new Date(now.getTime() + refreshCookieMaxAgeSeconds * secondInMilliseconds);

    const token = await Token.findOneAndUpdate({
        userID: userID,
        expiry : { $gt: new Date() }
    }, {
        $set: { "expiry": newExpiry }
    }, { new: true })
    return token
}

const TokenRepo = {
    getRefreshToken,
    saveRefreshToken,
    extendRefreshToken,
}

export { TokenRepo as default }