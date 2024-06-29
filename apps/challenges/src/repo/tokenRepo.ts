import {
  refreshTokenMaxAgeSeconds,
  secondInMilliseconds,
} from "../model/constants";
import Token, { TokenModel } from "../model/token";
import mongoose from "mongoose";

const GetRefreshToken = async (
  userID: mongoose.Types.ObjectId
): Promise<TokenModel | null> => {
  const token = await Token.findOne({
    userID: userID,
    expiry: { $gt: new Date() },
  });
  return token;
};

const SaveRefreshToken = async (
  token: TokenModel
): Promise<TokenModel | null> => {
  const dbToken = new Token(token);
  await dbToken.save();
  return dbToken;
};

const ExtendRefreshToken = async (
  userID: mongoose.Types.ObjectId
): Promise<TokenModel | null> => {
  const now = new Date();
  const newExpiry = new Date(
    now.getTime() + refreshTokenMaxAgeSeconds * secondInMilliseconds
  );

  const token = await Token.findOneAndUpdate(
    {
      userID: userID,
      expiry: { $gt: new Date() },
    },
    {
      $set: { expiry: newExpiry },
    },
    { new: true }
  );
  return token;
};

const TokenRepo = {
  GetRefreshToken,
  SaveRefreshToken,
  ExtendRefreshToken,
};

export { TokenRepo as default };
