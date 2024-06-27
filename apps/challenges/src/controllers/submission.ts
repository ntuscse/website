import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Submission from "../model/submission";
import { isValidObjectId } from "../utils/db";
import SubmissionService from "../service/submissionService";
import {
  isValidCreateSubmissionRequestBody,
  zodGetValidObjectId,
} from "../utils/validator";
import mongoose from "mongoose";
import { Logger } from "nodelogger";
import { ErrorHandling } from "../middleware/errorHandler";

// @desc    Get submissions
// @route   GET /api/submission
// @access  Public
const getSubmissions = asyncHandler(async (req: Request, res: Response) => {
  try {
    const submissions = await Submission.find({});
    res.status(200).json(submissions);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "SubmissionController.GetSubmissions error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

// @desc    Get submission
// @route   GET /api/submission/:id
// @access  Public
const getSubmission = asyncHandler(async (req: Request, res: Response) => {
  const submissionId = req.params.id;

  if (!isValidObjectId(submissionId)) {
    Logger.error(`received invalid submission id ${submissionId}`);
    res.status(400).json({ message: "Invalid submission ID" });
    return;
  }

  try {
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    res.status(200).json(submission);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "SubmissionController.GetSubmission error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

// @desc    Set submission
// @route   POST /api/submission/
// @access  Private
const setSubmission = asyncHandler(async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    const submission = isValidCreateSubmissionRequestBody.parse(req.body);
    const mongoUserID = zodGetValidObjectId.parse(userID);
    const createSubmissionReq = {
      user: new mongoose.Types.ObjectId(mongoUserID),
      question: new mongoose.Types.ObjectId(submission.question),
      answer: submission.answer,
    };

    const resp = await SubmissionService.createSubmission(createSubmissionReq);

    res.status(resp.status).json(resp);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "SubmissionController.SetSubmission error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

const SubmissionController = {
  getSubmissions,
  getSubmission,
  setSubmission,
};

export { SubmissionController as default };
