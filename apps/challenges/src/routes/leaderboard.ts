import Express from "express";
import LeaderBoardController from "../controllers/leaderboard";

const router = Express.Router();

router.get("", LeaderBoardController.GetLeaderboard);
router.post("", LeaderBoardController.StartLeaderboard);

router.post("/current", LeaderBoardController.GetCurrnetLeaderboard);

export { router as default };
// 