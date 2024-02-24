import { CreateSubmissionReq, SubmissionModel } from "../model/submission";
import SubmissionRepo from "../repo/submissionRepo";
import QuestionService from "./questionService";
import { GeneralResp } from "../model/response";
import ValidationService from "./validationService";

const createSubmission = async (
    submission: CreateSubmissionReq
): Promise<GeneralResp> => {
    var question;
    try {
        question = await QuestionService.getQuestionByID(submission.question.toString());

        if (!question) {
            throw new Error('Question not found');
        }

        if (!question.active) {
            throw new Error('Question is not active');
        }

        if (new Date(question.expiry) < new Date()) {
            throw new Error('Question has expired');
        }
    } catch (err) {
        return {
            status: 400,
            message: (err as Error).message
        }
    }

    let isCorrect = false;
    try {
        isCorrect = await ValidationService.validateAnswer(submission.question.toString(), submission.answer);
    } catch (err) {
        console.log("submissionService createSubmission fail to validate answer: ", err);
    }

    try {
        const dbSubmission = {
            user: submission.user,
            seasonID: question.seasonID,
            question: submission.question,
            answer: submission.answer,
            correct: isCorrect,
            points_awarded: isCorrect ? question.points : 0
        }
        const result = await SubmissionRepo.createSubmission(dbSubmission);

        // Update question submissions array using $push and $inc submission counts
        question = await QuestionService.updateQuestionSubmissions(
            submission.question.toString(), 
            result._id.toString(),
            isCorrect
        );

        if (!question) {
            throw new Error('Failed to update question submissions');
        }

        return {
            status: 201,
            message: 'Answer submitted',
            data: result
        };
    } catch (err) {
        return {
            status: 500,
            message: (err as Error).message
        }
    }
}



const SubmissionService = {
    createSubmission,
}

export default SubmissionService;