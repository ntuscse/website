import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Question, { QuestionReq } from "../model/question";
import { isValidObjectId } from "../utils/db";
import QuestionService from "../service/questionService";
import { isValidQuestionRequest } from "../utils/validator";
import { Logger } from "nodelogger";
import { ErrorHandling } from "../middleware/errorHandler";

// @desc    Get questions
// @route   GET /api/question
// @access  Public
const getQuestions = asyncHandler(async (req: Request, res: Response) => {
  // We pass in empty object, meaning that we GetQuestions without setting any filters.
  // This means we will return all questions in our db.
  try {
    const questions = await QuestionService.GetQuestions({});

    res.status(200).json(questions);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "QuestionnaireController.GetQuestions error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

// @desc    Get active questions
// @route   GET /api/activity/active
// @access  Public
const getActiveQuestions = asyncHandler(async (req: Request, res: Response) => {
  try {
    const questions = await QuestionService.GetQuestions({ isActive: true });

    res.status(200).json(questions);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "QuestionnaireController.GetActiveQuestions error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

// @desc    Get question
// @route   GET /api/question/:id
// @access  Public
const getQuestion = asyncHandler(async (req: Request, res: Response) => {
  const questionId = req.params.id;

  try {
    const question = await QuestionService.getQuestionByID(questionId);

    res.status(200).json(question);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "QuestionnaireController.GetQuestion error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

const getUserSpecificQuestion = asyncHandler(
  async (req: Request, res: Response) => {
    const { userID } = req.params;
    const questionId = req.params.id;

    try {
      const question = await QuestionService.getUserSpecificQuestion(
        userID,
        questionId
      );

      if (!question) {
        res.status(404).json({ message: "Question not found" });
        return;
      }

      res.status(200).json(question);
    } catch (err) {
      const error = err as Error;
      Logger.error(
        "QuestionnaireController.GetUserSpecificQuestion error",
        error,
        error.stack
      );
      ErrorHandling(err, res);
    }
  }
);

// @desc    Set question
// @route   POST /api/question
// @access  Private
const setQuestion = asyncHandler(async (req: Request, res: Response) => {
  try {
    const question = isValidQuestionRequest.parse(req.body);

    const createQuestionReq: QuestionReq = {
      ...question,
      question_date: new Date(question.question_date),
      expiry: new Date(question.expiry),
    };

    const resp = await QuestionService.createQuestion(createQuestionReq);

    res.status(resp.status).json(resp);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "QuestionnaireController.SetQuestion error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

// @desc    Update question
// @route   PUT /api/question/:id
// @access  Private
const updateQuestion = asyncHandler(async (req: Request, res: Response) => {
  try {
    const questionId = req.params.id;

    const updatedQuestion = await QuestionService.UpdateQuestion(
      questionId,
      req.body as QuestionReq
    );

    res.status(200).json(updatedQuestion);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "QuestionnaireController.UpdateQuestion error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

// @desc    Delete question
// @route   DELETE /api/question/:id
// @access  Private
const deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
  const questionId = req.params.id;

  if (!isValidObjectId(questionId)) {
    res.status(400).json({ message: "Invalid question ID" });
    return;
  }

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    await question.remove();

    res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    const error = err as Error;
    Logger.error(
      "QuestionnaireController.DeleteQuestion error",
      error,
      error.stack
    );
    ErrorHandling(err, res);
  }
});

const QuestionController = {
  getQuestion,
  getUserSpecificQuestion,
  getQuestions,
  getActiveQuestions,
  setQuestion,
  updateQuestion,
  deleteQuestion,
};

export { QuestionController as default };
