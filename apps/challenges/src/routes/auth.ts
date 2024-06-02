import Express from "express";
import AuthController from "../controllers/auth";
import jwtRefreshMiddleware from "../middleware/jwtRefreshMiddleware";

const router = Express.Router();

router.post("/refresh", jwtRefreshMiddleware, AuthController.refreshToken);

router.post("/oauth/signin", AuthController.oauthSignIn);

export { router as default };
