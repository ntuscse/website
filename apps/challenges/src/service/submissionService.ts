import { QuestionModel } from "../model/question";
import { CreateSubmissionReq } from "../model/submission";
import SubmissionRepo from "../repo/submissionRepo";
import { GeneralResp } from "../types/types";
import QuestionService from "./questionService";
import ValidationService from "./validationService";
import { Logger } from "nodelogger";

const createSubmission = async (
  submission: CreateSubmissionReq
): Promise<GeneralResp> => {
  let question: QuestionModel | null;
  try {
    question = await QuestionService.getQuestionByID(
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
    isCorrect = await ValidationService.validateAnswer(
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
    const result = await SubmissionRepo.createSubmission(dbSubmission);

    // Update question submissions array using $push and $inc submission counts
    question = await QuestionService.updateQuestionSubmissions(
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
    Logger.error("SubmissionService.CreateSubmission create submission error", err);
    return {
      status: 500,
      message: (err as Error).message,
    };
  }
};

const SubmissionService = {
  createSubmission,
};

export default SubmissionService;
