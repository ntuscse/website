import Express from "express";
import UserController from "../controllers/user";
import SeasonController from "../controllers/season";

const router = Express.Router();

router.post("/", UserController.createUser);
// router.get("/:userID/rankings", SeasonController.getUserAllSeasonRankings);

export { router as default };