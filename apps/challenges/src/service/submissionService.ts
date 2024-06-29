import { QuestionModel } from "../model/question";
import { CreateSubmissionReq, SubmissionModel } from "../model/submission";
import SubmissionRepo from "../repo/submissionRepo";
import { GeneralResp, StatusCodeError } from "../types/types";
import { zodGetValidObjectId } from "../utils/validator";
import QuestionService from "./questionService";
import ValidationService from "./validationService";
import { Logger } from "nodelogger";

const CreateSubmission = async (
  submission: CreateSubmissionReq
): Promise<GeneralResp> => {
  let question: QuestionModel | null;
  try {
    question = await QuestionService.GetQuestionByID(
      submission.question.toString()
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (!question.active) {
      throw new Error("Question is not active");
    }

    if (new Date(question.expiry) < new Date()) {
      throw new Error("Question has expired");
    }
  } catch (err) {
    Logger.error("SubmissionService.CreateSubmission validation error", err);
    return {
      status: 400,
      message: (err as Error).message,
    };
  }

  let isCorrect = false;
  try {
    isCorrect = await ValidationService.ValidateAnswer(
      submission.user.toString(),
      submission.question.toString(),
      submission.answer
    );
  } catch (err) {
    Logger.error(
      "SubmissionService.CreateSubmission validate answer error",
      err
    );
  }

  try {
    const dbSubmission = {
      user: submission.user,
      seasonID: question.seasonID,
      question: submission.question,
      answer: submission.answer,
      correct: isCorrect,
      points_awarded: isCorrect ? question.points : 0,
    };
    const result = await SubmissionRepo.CreateSubmission(dbSubmission);

    // Update question submissions array using $push and $inc submission counts
    question = await QuestionService.UpdateQuestionSubmissions(
      submission.question.toString(),
      result._id.toString(),
      isCorrect
    );

    if (!question) {
      throw new Error("Failed to update question submissions");
    }
    Logger.info(
      `SubmissionService.CreateSubmission user ${submission.user.toString()} successfully created submission at season ${question.seasonID.toString()} and question ${submission.question.toString()}`
    );
    return {
      status: 201,
      message: "Answer submitted",
      data: result,
    };
  } catch (err) {
    Logger.error(
      "SubmissionService.CreateSubmission create submission error",
      err
    );
    return {
      status: 500,
      message: (err as Error).message,
    };
  }
};

const GetSubmission = async (submissionId: string) => {
  const mongoSubmissionID = zodGetValidObjectId("Invalid submission ID").parse(
    submissionId
  );
  const submission = await SubmissionRepo.GetSubmission(mongoSubmissionID);
  if (!submission) {
    throw new StatusCodeError(404, "Submission not found");
  }
};

const GetSubmissions = async () => {
  return await SubmissionRepo.GetSubmissions();
};

const GetToBeCalculatedSubmissions = async () => {
  return await SubmissionRepo.GetToBeCalculatedSubmissions();
};

const SetSubmissionsToCalculated = async (submissions: SubmissionModel[]) => {
  return await SubmissionRepo.SetSubmissionsToCalculated(submissions);
};

const SubmissionService = {
  CreateSubmission,
  GetSubmission,
  GetSubmissions,
  GetToBeCalculatedSubmissions,
  SetSubmissionsToCalculated,
};

export default SubmissionService;
