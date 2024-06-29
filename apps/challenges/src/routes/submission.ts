import Express from "express";
const router = Express.Router();
import SubmissionController from "../controllers/submission";
import jwtMiddleware from "../middleware/jwtMiddleware";

router
  .route("/")
  .get(SubmissionController.GetSubmissions)
  .post(jwtMiddleware, SubmissionController.CreateSubmission);
router.route("/:id").get(SubmissionController.GetSubmission);

export { router as default };
