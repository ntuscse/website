import Express from "express";
import AuthController from "../controllers/auth";
import jwtRefreshMiddleware from "../middleware/jwtRefreshMiddleware";

const router = Express.Router();

router.post("/refresh", jwtRefreshMiddleware, AuthController.RefreshToken);

router.post("/oauth/signin", AuthController.OauthSignIn);

export { router as default };
