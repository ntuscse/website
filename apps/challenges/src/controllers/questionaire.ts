import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Question, { CreateQuestionReq } from '../model/question';
import { isValidObjectId } from "../utils/db";
import QuestionService from "../service/questionService";
import { isValidCreateQuestionRequest } from "../utils/validator";
import { z } from "zod";

// @desc    Get questions
// @route   GET /api/question
// @access  Public
const getQuestions = asyncHandler(async (req: Request, res: Response) => {
    const questions = await Question.find({})

    res.status(200).json(questions)
})


// @desc    Get active questions
// @route   GET /api/activity/active
// @access  Public
const getActiveQuestions = asyncHandler(async (req: Request, res: Response) => {
    const questions = await Question.find({ "active": true })

    res.status(200).json(questions)
})

// @desc    Get question
// @route   GET /api/question/:id
// @access  Public
const getQuestion = asyncHandler(async (req: Request, res: Response) => {
    const questionId = req.params.id;

    if (!isValidObjectId(questionId)) {
        res.status(400).json({ message: 'Invalid question ID' });
        return;
    }

    try {
        const question = await QuestionService.getQuestionByID(questionId);

        if (!question) {
            res.status(404).json({ message: 'Question not found' });
            return;
        }

        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const getUserSpecificQuestion = asyncHandler(async (req: Request, res: Response) => {
    const { userID } = req.params;
    const questionId = req.params.id;

    try {
        const question = await QuestionService.getUserSpecificQuestion(userID, questionId);

        if (!question) {
            res.status(404).json({ message: 'Question not found' });
            return;
        }

        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


// @desc    Set question
// @route   POST /api/question
// @access  Private
const setQuestion = asyncHandler(async (req: Request, res: Response) => {
    try {
        const question = isValidCreateQuestionRequest.parse(req.body);

        const createQuestionReq: CreateQuestionReq = {
            ...question,
            question_date: new Date(question.question_date),
            expiry: new Date(question.expiry),
        }

        const resp = await QuestionService.createQuestion(createQuestionReq);

        res.status(resp.status).json(resp);
    } catch (err) {
        console.error(err);
        if (err instanceof z.ZodError) {
            const message = err.issues.map((issue) => issue.message).join(", ");
            res.status(400).json({ message });
            return;
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Update question
// @route   PUT /api/question/:id
// @access  Private
const updateQuestion = asyncHandler(async (req: Request, res: Response) => {
    const questionId = req.params.id;
    if (!isValidObjectId(questionId)) {
        res.status(400).json({ message: 'Invalid question ID' });
        return;
    }
    try {
        const question = await Question.findById(questionId);

        if (!question) {
            res.status(404).json({ message: 'Question not found' });
            return;
        }

        const updatedQuestion = await Question.findByIdAndUpdate(questionId, req.body, { new: true });

        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Delete question
// @route   DELETE /api/question/:id
// @access  Private
const deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
    const questionId = req.params.id;

    if (!isValidObjectId(questionId)) {
        res.status(400).json({ message: 'Invalid question ID' });
        return;
    }

    try {
        const question = await Question.findById(questionId);

        if (!question) {
            res.status(404).json({ message: 'Question not found' });
            return;
        }

        await question.remove()

        res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const QuestionController = {
    getQuestion,
    getUserSpecificQuestion,
    getQuestions,
    getActiveQuestions,
    setQuestion,
    updateQuestion,
    deleteQuestion
};

export { QuestionController as default };