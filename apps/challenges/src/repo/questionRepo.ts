import Question, { CreateQuestionReq, QuestionModel } from "../model/question"
import mongoose from 'mongoose';

const getQuestionByID = async (
    questionID: mongoose.Types.ObjectId,
): Promise<QuestionModel | null> => {
    const question = await Question.findOne({
        _id: questionID
    });
    return question;
}

const createQuestionByReq = async (
    req: CreateQuestionReq
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
        validation_function: req.validation_function
    }

    const question = await Question.create(questionModel);

    await question.save();

    return question;
}

const updateQuestionByID = async (
    questionID: mongoose.Types.ObjectId,
    questionModel: QuestionModel
): Promise<QuestionModel | null> => {
    const question = await Question.findOneAndUpdate({
        _id: questionID
    }, questionModel, { new: true });
    return question;
}

const updateQuestionSubmissions = async (
    questionID: mongoose.Types.ObjectId,
    submissionID: mongoose.Types.ObjectId,
    isCorrect: boolean
): Promise<QuestionModel | null> => {
    const question = await Question.findOneAndUpdate({
        _id: questionID
    }, {
        $push: { submissions: submissionID },
        $inc: { 
            submissions_count: 1,
            correct_submissions_count: isCorrect ? 1 : 0
        }
    }, { new: true });
    return question;
}

const QuestionRepo = {
    getQuestionByID,
    createQuestionByReq,
    updateQuestionByID,
    updateQuestionSubmissions
}

export { QuestionRepo as default }