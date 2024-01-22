import Express from "express";
import LeaderBoardController from "../controllers/leaderboard";

const router = Express.Router();

router.route('/').get(LeaderBoardController.getLeaderBoards).post(LeaderBoardController.setLeaderBoard);
router.route('/active').get(LeaderBoardController.getActiveLeaderBoards);
router.route('/:id').get(LeaderBoardController.getLeaderBoard).delete(LeaderBoardController.deleteLeaderBoard).put(LeaderBoardController.updateLeaderBoard);

// Get leaderboard rankings
router.route('/rankings/:id/:top').get(LeaderBoardController.getLeaderBoardRankings);

export { router as default };