import mongoose from "mongoose";
import User, { UserModel } from "../model/user";

const GetUserByID = async (
  id: mongoose.Types.ObjectId
): Promise<UserModel | null> => {
  // get user by id from mongo
  const user = await User.findOne({
    _id: id,
  });
  return user;
};

const GetUserByEmail = async (email: string): Promise<UserModel | null> => {
  const user = await User.findOne({
    email: email,
  });
  return user;
};

const CreateUser = async (name: string, email: string): Promise<UserModel> => {
  const user = await User.create({
    name: name,
    email: email,
    active: true,
  });
  return user;
};

const UserRepo = {
  GetUserByID,
  GetUserByEmail,
  CreateUser,
};

export { UserRepo as default };
