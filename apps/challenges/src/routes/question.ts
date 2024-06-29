import Express from "express";
const router = Express.Router();
import QuestionController from "../controllers/question";
import jwtMiddleware from "../middleware/jwtMiddleware";

router
  .route("/")
  .get(QuestionController.GetQuestions)
  .post(QuestionController.CreateQuestion);
router.get(
  "/:id/user",
  jwtMiddleware,
  QuestionController.GetUserSpecificQuestion
);
router
  .route("/:id")
  .get(QuestionController.GetQuestion)
  .put(QuestionController.UpdateQuestion);

export { router as default };
