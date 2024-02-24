const express = require('express');
const router = express.Router();
import QuestionController from "../controllers/questionaire";
import SubmissionController from "../controllers/submission";

router.route('/').get(QuestionController.getQuestions).post(QuestionController.setQuestion);
router.route('/:id').get(QuestionController.getQuestion).delete(QuestionController.deleteQuestion).put(QuestionController.updateQuestion);

export { router as default };