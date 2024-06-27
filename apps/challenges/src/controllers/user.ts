import UserService from "../service/userService";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Logger } from "nodelogger";
import { ErrorHandling } from "../middleware/errorHandler";

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    const user = await UserService.getUserByID(userID);
    res.status(200).json(user);
  } catch (err) {
    const error = err as Error;
    Logger.error("UserController.GetUser error", error, error.stack);
    ErrorHandling(err, res);
  }
});

const UserController = {
  getUser,
};

export { UserController as default };
