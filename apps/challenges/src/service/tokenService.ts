import jwt from "jsonwebtoken";
import {
  accessTokenMaxAgeSeconds,
  refreshTokenMaxAgeSeconds,
} from "../model/constants";
import { zodGetValidObjectId } from "../utils/validator";
import TokenRepo from "../repo/tokenRepo";
import { TokenModel } from "../model/token";

const GenerateAccessToken = (id: string, email: string) => {
  const secret = process.env.CHALLENGES_JWT_SECRET || "";
  const token = jwt.sign({ id, email }, secret, {
    expiresIn: accessTokenMaxAgeSeconds,
  });
  return token;
};

const GenerateRefreshToken = (id: string, email: string) => {
  const secret = process.env.CHALLENGES_JWT_SECRET || "";
  const token = jwt.sign({ id, email }, secret, {
    expiresIn: refreshTokenMaxAgeSeconds,
  });
  return token;
};

const ExtendRefreshToken = async (
  userID: string
): Promise<TokenModel | null> => {
  const mongoUserID = zodGetValidObjectId("Invalid user id").parse(userID);
  return await TokenRepo.ExtendRefreshToken(mongoUserID);
};
const TokenService = {
  GenerateAccessToken,
  GenerateRefreshToken,
  ExtendRefreshToken,
};

export { TokenService as default };
