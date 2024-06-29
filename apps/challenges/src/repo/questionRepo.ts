import Question, { QuestionReq, QuestionModel } from "../model/question";
import mongoose from "mongoose";
import QuestionInput, { QuestionInputModel } from "../model/questionInput";
import { GetQuestionsFilter } from "../types/types";

const GetQuestions = async (
  filter: GetQuestionsFilter
): Promise<QuestionModel[] | null> => {
  const queryFilter: mongoose.FilterQuery<QuestionModel> = {};
  if (filter.isActive) {
    queryFilter.active = filter.isActive;
  }
  return await Question.find(queryFilter);
};

const GetQuestionByID = async (
  questionID: mongoose.Types.ObjectId
): Promise<QuestionModel | null> => {
  // We use .lean() to only return the javascript object instead of the documents.
  // This is to allow spread operator in GetUserSpecificQuestion to be done properly
  // refer to https://stackoverflow.com/questions/48014504/es6-spread-operator-mongoose-result-copy#comment121079929_48014589
  // more reading on https://mongoosejs.com/docs/tutorials/lean.html
  const question = await Question.findOne({
    _id: questionID,
  }).lean();
  return question;
};

const CreateQuestionByReq = async (
  req: QuestionReq
): Promise<QuestionModel | null> => {
  const questionModel = {
    _id: new mongoose.Types.ObjectId(),
    question_no: req.question_no,
    question_title: req.question_title,
    question_desc: req.question_desc,
    question_date: req.question_date,
    seasonID: new mongoose.Types.ObjectId(req.season_id),
    expiry: req.expiry,
    points: req.points,
    submissions: [],
    submissions_count: 0,
    correct_submissions_count: 0,
    active: true,
    validation_function: req.validation_function,
    generate_input_function: req.generate_input_function,
  };

  const question = await Question.create(questionModel);

  await question.save();

  return question;
};

const UpdateQuestionByID = async (
  questionID: mongoose.Types.ObjectId,
  questionModel: QuestionModel
): Promise<QuestionModel | null> => {
  const question = await Question.findOneAndUpdate(
    {
      _id: questionID,
    },
    questionModel,
    { new: true }
  );
  return question;
};

const UpdateQuestionSubmissions = async (
  questionID: mongoose.Types.ObjectId,
  submissionID: mongoose.Types.ObjectId,
  isCorrect: boolean
): Promise<QuestionModel | null> => {
  const question = await Question.findOneAndUpdate(
    {
      _id: questionID,
    },
    {
      $push: { submissions: submissionID },
      $inc: {
        submissions_count: 1,
        correct_submissions_count: isCorrect ? 1 : 0,
      },
    },
    { new: true }
  );
  return question;
};

const GetQuestionInput = async (
  userID: mongoose.Types.ObjectId,
  seasonID: mongoose.Types.ObjectId,
  questionID: mongoose.Types.ObjectId
): Promise<QuestionInputModel | null> => {
  const question = await QuestionInput.findOne({
    userID: userID,
    seasonID: seasonID,
    questionID: questionID,
  });
  return question;
};

const SaveQuestionInput = async (
  questionInput: QuestionInputModel
): Promise<QuestionInputModel | null> => {
  const dbQuestionInput = new QuestionInput(questionInput);
  await dbQuestionInput.save();
  return dbQuestionInput;
};

const QuestionRepo = {
  GetQuestions,
  GetQuestionByID,
  CreateQuestionByReq,
  UpdateQuestionByID,
  UpdateQuestionSubmissions,
  GetQuestionInput,
  SaveQuestionInput,
};

export { QuestionRepo as default };
