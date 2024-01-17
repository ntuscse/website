import { Request, Response } from "express";

const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Question = require('../model/question');

// @desc    Get questions
// @route   GET /api/question
// @access  Public
const getQuestions = asyncHandler(async (req: Request, res: Response) => {
    const questions = await Question.find();

    res.status(200).json(questions)
})


// @desc    Get active questions
// @route   GET /api/activity/active
// @access  Public
const getActiveQuestions = asyncHandler(async (req: Request, res: Response) => {
    const questions = await Question.find({"active": true }).populate("submission").populate("user");

    res.status(200).json(questions)
})


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
    })
    question = await question.populate("user")

    res.status(200).json(question)
})

// @desc    Update question
// @route   PUT /api/question/:id
// @access  Private
const updateQuestion = asyncHandler(async (req: Request, res: Response) => {
    const question = await Question.findById(req.params.id)

    if (!question) {
        res.status(400)
        throw new Error("Activity not found");
    }

    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updatedQuestion)
})

// @desc    Delete question
// @route   DELETE /api/question/:id
// @access  Private
const deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
    const question = await Question.findById(req.params.id)

    if (!question) {
        res.status(400)
    }

    await question.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getQuestions,
    getActiveQuestions,
    setQuestion,
    updateQuestion,
    deleteQuestion,
}