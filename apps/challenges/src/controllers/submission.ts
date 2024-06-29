import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
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
const GetSubmissions = asyncHandler(async (req: Request, res: Response) => {
  try {
    const submissions = await SubmissionService.GetSubmissions();
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
const GetSubmission = asyncHandler(async (req: Request, res: Response) => {
  const submissionId = req.params.id;

  try {
    const submission = await SubmissionService.GetSubmission(submissionId);

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
const CreateSubmission = asyncHandler(async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    const submission = isValidCreateSubmissionRequestBody.parse(req.body);
    const mongoUserID = zodGetValidObjectId("Invalid user id").parse(userID);
    const createSubmissionReq = {
      user: new mongoose.Types.ObjectId(mongoUserID),
      question: new mongoose.Types.ObjectId(submission.question),
      answer: submission.answer,
    };

    const resp = await SubmissionService.CreateSubmission(createSubmissionReq);

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
  GetSubmissions,
  GetSubmission,
  CreateSubmission,
};

export { SubmissionController as default };
