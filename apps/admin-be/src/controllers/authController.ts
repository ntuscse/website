import { Request, Response } from "express";

const Login = async (req: Request, res: Response): Promise<void> => {
  if (!req.body.firstName) {
    res.status(400).json("no first name");
  }
  res.sendStatus(201);
};

const AuthController = {
  Login,
};

export { AuthController };
