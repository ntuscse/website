const express = require('express');
const router = express.Router();
import SubmissionController from "../controllers/submission";

router.route('/').get(SubmissionController.getSubmissions);
router.route('/:id').get(SubmissionController.getSubmission).delete(SubmissionController.deleteSubmission).put(SubmissionController.updateSubmission);

export { router as default };