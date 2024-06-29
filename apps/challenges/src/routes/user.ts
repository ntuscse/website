import Express from "express";
import UserController from "../controllers/user";
import jwtMiddleware from "../middleware/jwtMiddleware";

const router = Express.Router();

router.get("/", jwtMiddleware, UserController.GetUser);

export { router as default };
