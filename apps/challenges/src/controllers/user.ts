import UserService from "../service/userService";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { StatusCodeError } from "../types/types";

const getUser = asyncHandler(async (req: Request, res: Response) => {
    const { userID } = req.params;

    try {
        const user = await UserService.getUserByID(userID);
        res.status(200).json(user);
    } catch (err) {
        if (err instanceof StatusCodeError) {
            res.status(err.status).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Internal Server Error" })
        }

    }
});

const checkTokens = asyncHandler(async (req: Request, res: Response) => {
    const token = req.signedCookies;

    console.log(token);

    res.status(200);
});
const UserController = {
    getUser,
    checkTokens,
}

export { UserController as default };
