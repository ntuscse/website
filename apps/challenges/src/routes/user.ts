import Express from "express";
import UserController from "../controllers/user";
import jwtMiddleware from "../middleware/jwtMiddleware";

const router = Express.Router();

router.get("/", jwtMiddleware, UserController.getUser);
router.get("/token", UserController.checkTokens);

export { router as default };