import Express from "express";
import UserController from "../controllers/user";
import jwtMiddleware from "../middleware/jwtMiddleware";

const router = Express.Router();

router.get("/", jwtMiddleware, UserController.getUser);

export { router as default };
