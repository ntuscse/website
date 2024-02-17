import Question, { QuestionModel } from "../model/question"
import mongoose from 'mongoose';

const getQuestionByID = async (
    questionID: mongoose.Types.ObjectId,
): Promise<QuestionModel | null> => {
    const question = await Question.findOne({
        _id: questionID
    });
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
    updateQuestionByID,
    updateQuestionSubmissions
}

export { QuestionRepo as default }