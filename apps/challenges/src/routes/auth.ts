import Express from "express";
import AuthController from "../controllers/auth";

const router = Express.Router();

router.post("/oauth/signin", AuthController.oauthSignIn);
router.get("/oauth/callback", AuthController.authCallback);
// router.get("/:userID/rankings", SeasonController.getUserAllSeasonRankings);

export { router as default };