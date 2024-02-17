import Express from "express";
import SeasonController from "../controllers/season";

const router = Express.Router();

router.get("/", SeasonController.getSeasons);
router.post("/", SeasonController.createSeason);

router.get("/active", SeasonController.getActiveSeasons);
router.get("/:seasonID", SeasonController.getSeasonByID);

router.get("/:seasonID/rankings", SeasonController.getSeasonRankings);
router.get("/:seasonID/questions", SeasonController.getSeasonQuestions);
// router.get("/:seasonID/rankings/:userID", SeasonController.getUserSeasonRanking);
// router.put("/:seasonID/rankings/:userID", SeasonController.updateSeasonRankings);

export { router as default };