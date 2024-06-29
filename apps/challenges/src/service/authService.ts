import mongoose from "mongoose";
import UserService from "../service/userService";
import {
  isValidEmail,
  getEmailPrefix,
  zodGetValidObjectId,
} from "../utils/validator";
import supabase from "../config/supabase";
import TokenService from "./tokenService";
import TokenRepo from "../repo/tokenRepo";
import { StatusCodeError } from "../types/types";
import jwt from "jsonwebtoken";
import UserRepo from "../repo/userRepo";
import {
  refreshTokenMaxAgeSeconds,
  secondInMilliseconds,
} from "../model/constants";

const OauthSignIn = async (supabaseAccessToken: string) => {
  jwt.verify(supabaseAccessToken, process.env.SUPABASE_JWT_SECRET || "");

  const resp = await supabase.auth.getUser(supabaseAccessToken);

  if (resp.error) {
    throw new Error("Failed to exchange supabaseAccessToken for session.");
  }

  const email = isValidEmail.parse(resp.data.user.email);

  let createNewUser = false;
  let user = await UserRepo.GetUserByEmail(email);

  if (!user) {
    const userName = getEmailPrefix(email);
    user = await UserService.CreateUser(userName, email);
    createNewUser = true;
  }

  const accessToken = TokenService.GenerateAccessToken(
    user._id.toString(),
    user.email
  );
  const refreshToken = TokenService.GenerateRefreshToken(
    user._id.toString(),
    user.email
  );
  const now = new Date();
  const newExpiry = new Date(
    now.getTime() + refreshTokenMaxAgeSeconds * secondInMilliseconds
  );

  const tokenModel = await TokenRepo.SaveRefreshToken({
    _id: new mongoose.Types.ObjectId(),
    jwt: refreshToken,
    userID: user._id,
    expiry: newExpiry,
  });

  if (!tokenModel) {
    throw new Error("token not saved");
  }

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    createNewUser: createNewUser,
  };
};

const RefreshToken = async (userID: string) => {
  const mongoUserID = zodGetValidObjectId("Invalid user id").parse(userID);
  const token = await TokenRepo.GetRefreshToken(mongoUserID);

  if (token == null) {
    throw new StatusCodeError(500, "Token not found");
  }

  // verify jwt token, throw error if verify failed
  jwt.verify(token.jwt, process.env.CHALLENGES_JWT_SECRET || "");
  const user = await UserRepo.GetUserByID(mongoUserID);

  if (!user) {
    throw new StatusCodeError(500, "User not found");
  }

  return TokenService.GenerateAccessToken(user._id.toString(), user.email);
};

const AuthService = {
  OauthSignIn,
  RefreshToken,
};

export { AuthService as default };
