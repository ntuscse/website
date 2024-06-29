import mongoose from "mongoose";
import QuestionRepo from "../repo/questionRepo";
import {
  QuestionReq,
  GetUserSpecificQuestionResp,
  QuestionModel,
} from "../model/question";
import ValidationService from "./validationService";
import {
  GeneralResp,
  GetQuestionsFilter,
  StatusCodeError,
} from "../types/types";
import { QuestionInputModel } from "../model/questionInput";
import { Logger } from "nodelogger";
import { isValidQuestionRequest } from "../utils/validator";

const GetQuestions = async (filter: GetQuestionsFilter) => {
  return await QuestionRepo.GetQuestions(filter);
};

const GetQuestionByID = async (questionID: string) => {
  if (!mongoose.isValidObjectId(questionID)) {
    throw new StatusCodeError(400, "Invalid question ID");
  }
  const _id = new mongoose.Types.ObjectId(questionID);
  const question = await QuestionRepo.GetQuestionByID(_id);

  if (!question) {
    throw new StatusCodeError(404, "Question not found");
  }
  return question;
};

const CreateQuestion = async (req: QuestionReq): Promise<GeneralResp> => {
  if (!ValidationService.GetValidationFunction(req.validation_function)) {
    Logger.error(
      "QuestionService.CreateQuestion received invalid validation function",
      req.validation_function
    );
    return {
      status: 400,
      message: "Invalid validation function",
      data: null,
    };
  }

  if (
    !ValidationService.GetGenerateInputFunction(req.generate_input_function)
  ) {
    Logger.error(
      "QuestionService.CreateQuestion received invalid generate input function",
      req.generate_input_function
    );
    return {
      status: 400,
      message: "Invalid generate input function",
      data: null,
    };
  }

  const question = await QuestionRepo.CreateQuestionByReq(req);

  return {
    status: 201,
    message: "Question created",
    data: question,
  };
};

const UpdateQuestion = async (questionID: string, req: QuestionReq) => {
  const question = await GetQuestionByID(questionID);
  const toBeUpdateQuestion = isValidQuestionRequest.parse(req);
  const dbQuestionModel: QuestionModel = {
    ...toBeUpdateQuestion,
    _id: question._id,
    seasonID: new mongoose.Types.ObjectId(toBeUpdateQuestion.season_id),
    question_date: new Date(question.question_date),
    expiry: new Date(question.expiry),
    submissions: question.submissions,
    submissions_count: question.submissions_count,
    correct_submissions_count: question.correct_submissions_count,
  };
  const updatedQuestion = await QuestionRepo.UpdateQuestionByID(
    question._id,
    dbQuestionModel
  );
  return updatedQuestion;
};

const UpdateQuestionSubmissions = async (
  questionID: string,
  submissionID: string,
  isCorrect: boolean
) => {
  if (
    !mongoose.isValidObjectId(questionID) ||
    !mongoose.isValidObjectId(submissionID)
  ) {
    throw new Error("Invalid question or submission ID");
  }
  const _questionID = new mongoose.Types.ObjectId(questionID);
  const _submissionID = new mongoose.Types.ObjectId(submissionID);
  return await QuestionRepo.UpdateQuestionSubmissions(
    _questionID,
    _submissionID,
    isCorrect
  );
};

const SaveQuestionInput = async (
  userID: string,
  seasonID: string,
  questionID: string,
  input: string[]
) => {
  const _userID = new mongoose.Types.ObjectId(userID);
  const _seasonID = new mongoose.Types.ObjectId(seasonID);
  const _questionID = new mongoose.Types.ObjectId(questionID);

  const questionInput = {
    userID: _userID,
    seasonID: _seasonID,
    questionID: _questionID,
    input: input,
  } as QuestionInputModel;
  return await QuestionRepo.SaveQuestionInput(questionInput);
};

const GetUserSpecificQuestion = async (
  userID: string,
  questionID: string
): Promise<GetUserSpecificQuestionResp | null> => {
  if (
    !mongoose.isValidObjectId(userID) ||
    !mongoose.isValidObjectId(questionID)
  ) {
    throw new Error("Invalid user, question or season ID");
  }

  const question = await GetQuestionByID(questionID);

  const seasonID = question.seasonID.toString();
  const _userID = new mongoose.Types.ObjectId(userID);
  const _seasonID = new mongoose.Types.ObjectId(seasonID);
  const _questionID = new mongoose.Types.ObjectId(questionID);
  let input: string[] = [];
  const questionInput = await QuestionRepo.GetQuestionInput(
    _userID,
    _seasonID,
    _questionID
  );

  if (!questionInput) {
    input = await ValidationService.GenerateInput(questionID);
    await SaveQuestionInput(userID, seasonID, questionID, input);
  } else {
    input = questionInput.input;
  }
  const resp: GetUserSpecificQuestionResp = {
    ...question,
    question_input: input,
  };
  return resp;
};

const QuestionService = {
  GetQuestions,
  GetQuestionByID,
  UpdateQuestion,
  UpdateQuestionSubmissions,
  CreateQuestion,
  GetUserSpecificQuestion,
  SaveQuestionInput,
};

export { QuestionService as default };
