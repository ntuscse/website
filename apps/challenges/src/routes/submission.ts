import Express from "express";
const router = Express.Router();
import SubmissionController from "../controllers/submission";

router
  .route("/")
  .get(SubmissionController.getSubmissions)
  .post(SubmissionController.setSubmission);
router.route("/:id").get(SubmissionController.getSubmission);

export { router as default };
