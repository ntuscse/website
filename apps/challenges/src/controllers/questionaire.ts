import { Request, Response } from "express";

const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Question = require('../model/question');

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
    const questions = await Question.find({"active": true })

    res.status(200).json(questions)
})

// @desc    Get question
// @route   GET /api/question/:id
// @access  Public
const getQuestion = asyncHandler(async (req: Request, res: Response) => {
    const questionId = req.params.id;

    if (!isValidObjectId(questionId)) {
        return res.status(400).json({ message: 'Invalid question ID' });
    }

    try {
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// @desc    Set question
// @route   POST /api/question
// @access  Private
const setQuestion = asyncHandler(async (req: Request, res: Response) => {
    let question = await Question.create({
        question_no: req.body.question_no,
        question_title: req.body.question_title,
        question_desc: req.body.question_desc,
        question_date: req.body.question_date,
        expiry: req.body.expiry,
        points: req.body.points,
        answer: req.body.answer,
    }).catch((err: any) => {
        console.log(err);
        res.status(400).json(err);
    })

    res.status(200).json(question)
})

// @desc    Update question
// @route   PUT /api/question/:id
// @access  Private
const updateQuestion = asyncHandler(async (req: Request, res: Response) => {
    const questionId = req.params.id;
    if (!isValidObjectId(questionId)) {
        return res.status(400).json({ message: 'Invalid question ID' });
    }
    try {
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
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
        return res.status(400).json({ message: 'Invalid question ID' });
    }

    try {
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        await question.remove()

        res.status(200).json({message: 'Question deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Helper function to validate ObjectId
function isValidObjectId(id: string): boolean {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
}

const QuestionController = {
    getQuestion,
    getQuestions,
    getActiveQuestions,
    setQuestion,
    updateQuestion,
    deleteQuestion,
};

export { QuestionController as default };