import jwt from "jsonwebtoken";
import {
  accessTokenMaxAgeSeconds,
  refreshCookieMaxAgeSeconds,
} from "../model/constants";
import { zodGetValidObjectId } from "../utils/validator";
import TokenRepo from "../repo/tokenRepo";
import { TokenModel } from "../model/token";

const generateAccessToken = (id: string, email: string) => {
  const secret = process.env.CHALLENGES_JWT_SECRET || "";
  const token = jwt.sign({ id, email }, secret, {
    expiresIn: accessTokenMaxAgeSeconds,
  });
  return token;
};

const generateRefreshToken = (id: string, email: string) => {
  const secret = process.env.CHALLENGES_JWT_SECRET || "";
  const token = jwt.sign({ id, email }, secret, {
    expiresIn: refreshCookieMaxAgeSeconds,
  });
  return token;
};

const extendRefreshToken = (userID: string): Promise<TokenModel | null> => {
  const mongoUserID = zodGetValidObjectId.parse(userID);
  return TokenRepo.extendRefreshToken(mongoUserID);
};
const TokenService = {
  generateAccessToken,
  generateRefreshToken,
  extendRefreshToken,
};

export { TokenService as default };
