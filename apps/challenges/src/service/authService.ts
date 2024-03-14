import { SupabaseService } from '../utils/supabase';
import mongoose from 'mongoose';
import { jwtDecode } from "jwt-decode";
import UserService from "../service/userService";
import { isValidEmail, getEmailPrefix, zodIsValidObjectId } from "../utils/validator";
import supabase from "../utils/supabase";
import { z } from 'zod';
import TokenService from './tokenService';
import { GeneralResp, OauthcallbackResp } from '../types/types';
import TokenRepo from '../repo/tokenRepo';
import { StatusCodeError } from "../types/types"
import jwt from "jsonwebtoken";
import UserRepo from '../repo/userRepo';
import { refreshCookieMaxAgeSeconds, secondInMilliseconds } from "../model/constants";

const oauthSignIn = async (
    url: string
) => {
    let redirectURL: string;
    try {
        redirectURL = z.string().url().parse(url);
    } catch (err) {
        return {
            status: 400,
            message: 'Invalid redirectURL',
            data: null,
        } as GeneralResp;
    }

    try {
        const resp = await SupabaseService.signInWithAzure(redirectURL);
        return {
            status: 302,
            message: 'waiting for response from azure',
            data: resp,
        } as GeneralResp;
    } catch (err) {
        console.log("error in createUser with azure: ", err)
        return {
            status: 500,
            message: 'Internal Server Error',
            data: null,
        } as GeneralResp;
    }
}

const oauthCallback = async (
    code: string,
    next: string | undefined,
): Promise<OauthcallbackResp> => {
    // verify the query parameters
    const resp = await supabase.auth.exchangeCodeForSession(code);

    const supabaseToken = resp.data.session?.access_token;

    if (resp.error || !supabaseToken) {
        throw new Error("Failed to exchange code for session.");
    }

    const decodedJWTToken = jwtDecode(supabaseToken);
    const decodedJWTObj = decodedJWTToken as {
        aud: string;
        exp: number;
        iat: number;
        iss: string;
        sub: string;
        email: string;
        role: string;
        session_id: string;
    }
    console.log(decodedJWTObj);

    let user = await UserService.getUserByEmail(decodedJWTObj.email);

    if (!user) {
        const email = isValidEmail.parse(decodedJWTObj.email);
        const userName = getEmailPrefix(email);
        user = await UserService.createUser(userName, decodedJWTObj.email);
    }

    const accessToken = await TokenService.generateAccessToken(user._id.toString(), user.email);
    const refreshToken = await TokenService.generateRefreshToken(user._id.toString(), user.email);
    const now = new Date();
    const newExpiry = new Date(now.getTime() + refreshCookieMaxAgeSeconds * secondInMilliseconds);

    const tokenModel = await TokenRepo.saveRefreshToken({
        _id: new mongoose.Types.ObjectId(),
        jwt: refreshToken,
        userID: user._id,
        expiry: newExpiry
    })

    if (!tokenModel) {
        throw new Error("token not saved")
    }

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}

const refreshToken = async (userID: string) => {
    const _id = zodIsValidObjectId.parse(userID);
    const mongoUserID = new mongoose.Types.ObjectId(_id)
    const token = await TokenRepo.getRefreshToken(mongoUserID);

    if (token == null) {
        throw new StatusCodeError(500, "Token not found")
    }

    // verify jwt token 
    const decoded = jwt.verify(token.jwt, process.env.JWT_SECRET || "")
    const user = await UserRepo.getUserByID(mongoUserID);

    if (!user) {
        throw new StatusCodeError(500, "User not found")
    }

    return TokenService.generateAccessToken(user._id.toString(), user.email)
}

const AuthService = {
    oauthSignIn,
    oauthCallback,
    refreshToken,
}

export { AuthService as default };