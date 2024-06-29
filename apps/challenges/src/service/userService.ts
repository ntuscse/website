import UserRepo from "../repo/userRepo";
import { isValidEmail, zodGetValidObjectId } from "../utils/validator";
import { StatusCodeError } from "../types/types";
import { UserModel } from "../model/user";

const GetUserByID = async (id: string): Promise<UserModel> => {
  let user: UserModel | null;

  const mongoUserID = zodGetValidObjectId("Invalid user id").parse(id);

  try {
    user = await UserRepo.GetUserByID(mongoUserID);
  } catch (err) {
    throw new StatusCodeError(500, "Internal Server Error");
  }

  if (!user) {
    throw new StatusCodeError(404, "User not found");
  }

  return user;
};

const GetUserByEmail = async (email: string): Promise<UserModel> => {
  const _email = isValidEmail.parse(email);

  const user = await UserRepo.GetUserByEmail(_email);
  if (!user) {
    throw new StatusCodeError(404, "User not found");
  }
  return user;
};

const CreateUser = async (name: string, email: string): Promise<UserModel> => {
  const user = await UserRepo.CreateUser(name, email);
  return user;
};

const UserService = {
  GetUserByID,
  GetUserByEmail,
  CreateUser,
};

export { UserService as default };
