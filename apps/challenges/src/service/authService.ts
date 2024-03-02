import { SupabaseService } from '../utils/supabase';

import { jwtDecode } from "jwt-decode";
import UserService from "../service/userService";
import { isValidEmail, getEmailPrefix } from "../utils/validator";
import supabase from "../utils/supabase";
import { z } from 'zod';
import TokenService from './tokenService';
import { GeneralResp, OauthcallbackResp } from '../types/types';

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

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}

const AuthService = {
    oauthSignIn,
    oauthCallback,
}

export { AuthService as default };