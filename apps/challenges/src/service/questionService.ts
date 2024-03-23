import mongoose from 'mongoose';
import QuestionRepo from '../repo/questionRepo';
import { CreateQuestionReq, GetUserSpecificQuestionResp } from '../model/question';
import ValidationService from './validationService';
import { GeneralResp, StatusCodeError } from '../types/types';

const getQuestionByID = async (
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
    if (!ValidationService.getValidationFunction(req.validation_function)) {
        console.log('Invalid validation function');
        return {
            status: 400,
            message: 'Invalid validation function',
            data: null,
        };
    }

    if (!ValidationService.getGenerateInputFunction(req.generate_input_function)) {
        console.log('Invalid generate input function');
        return {
            status: 400,
            message: 'Invalid generate input function',
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

const updateQuestionSubmissions = async (
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

const getUserSpecificQuestion = async (
    userID: string,
    seasonID: string,
    questionID: string,
): Promise<GetUserSpecificQuestionResp | null> => {
    if (!mongoose.isValidObjectId(userID) || !mongoose.isValidObjectId(seasonID) || !mongoose.isValidObjectId(questionID)) {
        throw new Error('Invalid user, question or season ID');
    }

    const question = await QuestionService.getQuestionByID(questionID);
    if (!question) {
        throw new StatusCodeError(404, 'Question not found');
    }

    const _userID = new mongoose.Types.ObjectId(userID);
    const _seasonID = new mongoose.Types.ObjectId(seasonID);
    const _questionID = new mongoose.Types.ObjectId(questionID);

    const questionInput = await QuestionRepo.getQuestionInput(_userID, _seasonID, _questionID)
    let input = questionInput?.input
    if (!input) {
        input = await ValidationService.generateInput(questionID)
    }
    const resp: GetUserSpecificQuestionResp = {
        ...question,
        ...questionInput,
        id: question._id.toString(),
        seasonID: questionInput!.seasonID.toString(),
        question_input: input
    }
    return resp
}
const QuestionService = {
    getQuestionByID,
    updateQuestionSubmissions,
    createQuestion,
    getUserSpecificQuestion
}

export { QuestionService as default } 