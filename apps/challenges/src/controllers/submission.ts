import { Request, Response } from "express";
const asyncHandler = require('express-async-handler');
import Question from '../model/question';
import Submission from '../model/submission';
import Season from "../model/season";
import { isValidObjectId } from "../utils/db";
import QuestionService from "../service/questionService";
import SubmissionService from "../service/submissionService";
import { isValidCreateSubmissionRequest } from "../utils/validator";
import mongoose from 'mongoose';


// @desc    Get submissions
// @route   GET /api/submission
// @access  Public
const getSubmissions = asyncHandler(async (req: Request, res: Response) => {
    const submissions = await Submission.find({})
    res.status(200).json(submissions)  
})

// @desc    Get submission
// @route   GET /api/submission/:id
// @access  Public
const getSubmission = asyncHandler(async (req: Request, res: Response) => {
    const submissionId = req.params.id;

    if (!isValidObjectId(submissionId)) {
        return res.status(400).json({ message: 'Invalid submission ID' });
    }

    try {
        const submission = await Submission.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

// @desc    Set submission
// @route   POST /api/submission
// @access  Private

const setSubmission = asyncHandler(async (req: Request, res: Response) => {
    const questionId = req.body.question;

    if (!isValidObjectId(questionId)) {
        return res.status(400).json({ message: 'Invalid question ID' });
    }

    try {
        const submission = isValidCreateSubmissionRequest.parse(req.body);
        const createSubmissionReq = {
            question: new mongoose.Types.ObjectId(submission.question),
            user: new mongoose.Types.ObjectId(submission.user),
            answer: submission.answer
        };

        await SubmissionService.createSubmission(createSubmissionReq);

        res.status(201).json({ message: 'Answer submitted' });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

// @desc    Update submission
// @route   PUT /api/submission/:id
// @access  Private
const updateSubmission = asyncHandler(async (req: Request, res: Response) => {
    const submissionId = req.params.id;

    if (!isValidObjectId(submissionId)) {
        return res.status(400).json({ message: 'Invalid submission ID' });
    }

    try {
        const submission = await Submission.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        const updatedSubmission = await Submission.findByIdAndUpdate(submissionId, req.body, { new: true });

        // Re-evaluate the points awarded
        


        res.status(200).json(updatedSubmission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

// @desc    Delete submission
// @route   DELETE /api/submission/:id
// @access  Private
const deleteSubmission = asyncHandler(async (req: Request, res: Response) => {
    const submissionId = req.params.id;

    if (!isValidObjectId(submissionId)) {
        return res.status(400).json({ message: 'Invalid submission ID' });
    }

    try {
        const submission = await Submission.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        await submission.remove()

        res.status(200).json({message: 'Submission deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


const SubmissionController = {
    getSubmissions,
    getSubmission,
    setSubmission,
    updateSubmission,
    deleteSubmission
};

export { SubmissionController as default };