import mongoose from "mongoose";
import UserRepo from "../repo/userRepo";
import { isValidEmail, zodIsValidObjectId } from "../utils/validator";
import { StatusCodeError } from "../types/types";
import { UserModel } from "../model/user";

const getUserByID = async (id: string) => {
  let _id: string;
  let user: UserModel | null;
  try {
    _id = zodIsValidObjectId.parse(id);
  } catch (err) {
    throw new StatusCodeError(400, "Invalid id");
  }

  const mongoUserID = new mongoose.Types.ObjectId(_id);

  try {
    user = await UserRepo.getUserByID(mongoUserID);
  } catch (err) {
    throw new StatusCodeError(500, "Internal Server Error");
  }

  if (!user) {
    throw new StatusCodeError(404, "User not found");
  }

  return user;
};

const getUserByEmail = async (email: string) => {
  const _email = isValidEmail.parse(email);

  const user = await UserRepo.getUserByEmail(_email);

  return user;
};

const createUser = async (name: string, email: string) => {
  const user = await UserRepo.createUser(name, email);
  return user;
};

const UserService = {
  getUserByID,
  getUserByEmail,
  createUser,
};

export { UserService as default };
