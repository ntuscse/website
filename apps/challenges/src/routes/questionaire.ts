const express = require('express');
const router = express.Router();
import QuestionController from "../controllers/questionaire";


router.route('/').get(QuestionController.getQuestions).post(QuestionController.setQuestion);
router.route('/active').get(QuestionController.getActiveQuestions);
router.route('/:id').get(QuestionController.getQuestion).delete(QuestionController.deleteQuestion).put(QuestionController.updateQuestion);

// router.route('/submit/:id').post(QuestionController.submitAnswer);

export { router as default };