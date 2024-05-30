import Express from "express";
const router = Express.Router();
import SubmissionController from "../controllers/submission";
import jwtMiddleware from "../middleware/jwtMiddleware";

router
  .route("/")
  .get(SubmissionController.getSubmissions)
  .post(jwtMiddleware, SubmissionController.setSubmission);
router.route("/:id").get(SubmissionController.getSubmission);

export { router as default };
