const express = require('express');
const router = express.Router();
import QuestionController from "../controllers/questionaire";
import jwtMiddleware from "../middleware/jwtMiddleware";

router.route('/').get(QuestionController.getQuestions).post(QuestionController.setQuestion);
router.get('/:id/user', jwtMiddleware, QuestionController.getUserSpecificQuestion)
router.route('/:id').get(QuestionController.getQuestion).delete(QuestionController.deleteQuestion).put(QuestionController.updateQuestion);

export { router as default };