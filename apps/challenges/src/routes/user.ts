import Express from "express";
import UserController from "../controllers/user";

const router = Express.Router();

router.get("/:userID", UserController.createUser);

export { router as default };