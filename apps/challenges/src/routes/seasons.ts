import Express from "express";
import SeasonController from "../controllers/season";

const router = Express.Router();

router.get("/", SeasonController.GetSeasons);
router.post("/", SeasonController.CreateSeason);

router.get("/active", SeasonController.GetActiveSeasons);
router.get("/:seasonID", SeasonController.GetSeasonByID);

router.get("/:seasonID/rankings", SeasonController.GetSeasonRankings);
router.get("/:seasonID/questions", SeasonController.GetSeasonQuestions);

export { router as default };
