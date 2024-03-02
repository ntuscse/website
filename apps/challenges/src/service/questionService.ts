import mongoose from 'mongoose';
import QuestionRepo from '../repo/questionRepo';
import { CreateQuestionReq } from '../model/question';
import ValidationService from './validationService';
import { GeneralResp } from '../types/types';

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

const createQuestion = async (
    req: CreateQuestionReq,
): Promise<GeneralResp> => {
    if (!ValidationService.getValidationFunction(req.validation_function)){
        console.log('Invalid validation function');
        return {
            status: 400,
            message: 'Invalid validation function',
            data: null,
        };
    }
    
    const question = await QuestionRepo.createQuestionByReq(req);

    return {
        status: 201,
        message: 'Question created',
        data: question,
    };
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
    updateQuestionSubmissions,
    createQuestion
}

export { QuestionService as default } 