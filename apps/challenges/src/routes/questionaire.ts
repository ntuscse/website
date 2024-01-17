const express = require('express');
const router = express.Router();

const {
    getQuestions,
    getActiveQuestions,
    setQuestion,
    updateQuestion,
    deleteQuestion,
} = require('../controllers/questionaire');


router.route('/').get(getQuestions).post(setQuestion);
router.route('/active').get(getActiveQuestions);
router.route('/:id').delete(deleteQuestion).put(updateQuestion);

export { router as default };