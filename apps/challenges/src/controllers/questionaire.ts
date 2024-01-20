import { Request, Response } from "express";
const asyncHandler = require('express-async-handler');
const Question = require('../model/question');
const Submission = require('../model/submission');
import Season from "../model/season";
import { isValidObjectId } from "../utils/db";

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
    try {
        const question = await Question.create({
            question_no: req.body.question_no,
            question_title: req.body.question_title,
            question_desc: req.body.question_desc,
            question_date: req.body.question_date,
            expiry: req.body.expiry,
            points: req.body.points,
            answer: req.body.answer,
        });

        res.status(201).json(question);
    } catch (error) {
        if ((error as Error).name === 'ValidationError') {
            return res.status(400).json({ message: (error as Error).message });
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

// @desc    Submit answer
// @route   POST /api/question/submit/:id
// @access  Private

// TODO: fix this
/*
const submitAnswer = asyncHandler(async (req: Request, res: Response) => {
    const questionId = req.params.id;

    if (!isValidObjectId(questionId)) {
        return res.status(400).json({ message: 'Invalid question ID' });
    }

    try {
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (!question.active) {
            return res.status(400).json({ message: 'Question is not active' });
        }

        if (new Date(question.expiry) < new Date()) {
            return res.status(400).json({ message: 'Question has expired' });
        }

        const submission = await Submission.create({
            user: req.body.user,
            leaderboard: req.body.leaderboard,
            answer: req.body.answer,
            correct: req.body.answer === question.answer,
            points_awarded: req.body.answer === question.answer ? question.points : 0,
            question: questionId
        });

        // Update question submissions array using $push
        await Question.findByIdAndUpdate(questionId, { $push: { submissions: submission._id } }, { new: true });

        // Retrieve user and update points of the entry in the leaderboard
        const season = await Season.findOne({ _id: req.body.leaderboard });
        const ranking = season?.rankings.find((ranking: any) => ranking.user == req.body.user);
        if (!ranking) {
            await Season.findByIdAndUpdate(req.body.leaderboard, { $push: { rankings: { user: req.body.user, points: submission.points_awarded } } }, { new: true });
        } else {Season
            // Update points
            await Season.findOneAndUpdate({ _id: req.body.leaderboard, 'rankings.user': req.body.user }, { $set: { 'rankings.$.points': ranking.points + submission.points_awarded } }, { new: true });
        }

        res.status(201).json({ message: 'Answer submitted' });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
*/

async function updateUserPoints() {

}

const QuestionController = {
    getQuestion,
    getQuestions,
    getActiveQuestions,
    setQuestion,
    updateQuestion,
    deleteQuestion,
    // submitAnswer
};

export { QuestionController as default };