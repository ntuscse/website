import Express from "express";
import AuthController from "../controllers/auth";
import jwtRefreshMiddleware from "../middleware/jwtRefreshMiddleware";

const router = Express.Router();

router.post("/refresh", jwtRefreshMiddleware, AuthController.refreshToken);

router.post("/oauth/signin", AuthController.oauthSignIn);
router.get("/oauth/callback", AuthController.authCallback);
// router.get("/:userID/rankings", SeasonController.getUserAllSeasonRankings);

export { router as default };