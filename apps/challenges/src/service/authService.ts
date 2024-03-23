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
    supabaseAccessToken: string
) => {
    jwt.verify(supabaseAccessToken, process.env.SUPABASE_JWT_SECRET || "");

    const resp = await supabase.auth.getUser(supabaseAccessToken);

    if (resp.error) {
        throw new Error("Failed to exchange supabaseAccessToken for session.");
    }

    // const decodedJWTToken = jwtDecode(code);
    // const decodedJWTObj = decodedJWTToken as {
    //     aud: string;
    //     exp: number;
    //     iat: number;
    //     iss: string;
    //     sub: string;
    //     email: string;
    //     role: string;
    //     session_id: string;
    // }
    // console.log(decodedJWTObj);

    const email = isValidEmail.parse(resp.data.user.email);
    
    var createNewUser: boolean = false;
    let user = await UserService.getUserByEmail(email);

    if (!user) {
        const userName = getEmailPrefix(email);
        user = await UserService.createUser(userName, email);
        createNewUser = true;
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
        createNewUser: createNewUser
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
    refreshToken,
}

export { AuthService as default };