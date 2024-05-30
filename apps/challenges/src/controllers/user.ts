import UserService from "../service/userService";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { Logger } from "nodelogger";

const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.params;

  try {
    const user = await UserService.getUserByID(userID);
    res.status(200).json(user);
  } catch (err) {
    Logger.error("UserController.GetUser error", err);
    next(err);
  }
});

const UserController = {
  getUser,
};

export { UserController as default };
