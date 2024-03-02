import mongoose from 'mongoose';
import QuestionRepo from '../repo/questionRepo';

const getQuestionByID = async(
    questionID: string,
) => {
    if (!mongoose.isValidObjectId(questionID)) {
        throw new Error('Invalid question ID');
    }
    const _id = new mongoose.Types.ObjectId(questionID);
    const question = await QuestionRepo.getQuestionByID(_id);
    return question;
}

const updateQuestionSubmissions = async(
    questionID: string,
    submissionID: string,
    isCorrect: boolean
) => {
    if (!mongoose.isValidObjectId(questionID) || !mongoose.isValidObjectId(submissionID)) {
        throw new Error('Invalid question or submission ID');
    }
    const _questionID = new mongoose.Types.ObjectId(questionID);
    const _submissionID = new mongoose.Types.ObjectId(submissionID);
    return await QuestionRepo.updateQuestionSubmissions(_questionID, _submissionID, isCorrect);
}


const QuestionService = {
    getQuestionByID,
    updateQuestionSubmissions
}

export { QuestionService as default } 