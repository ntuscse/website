import express from "express";
import { AuthController } from "../controllers/authController";

const AuthRouter = express.Router();

AuthRouter.post("/login", AuthController.Login);

export { AuthRouter };
