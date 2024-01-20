import UserService from "../service/userService";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const user = await UserService.createUser(name, email);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const UserController = {
    createUser
}

export { UserController as default };
