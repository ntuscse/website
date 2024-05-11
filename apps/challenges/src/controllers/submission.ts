import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import Submission from '../model/submission';
import { isValidObjectId } from "../utils/db";
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
        res.status(400).json({ message: 'Invalid submission ID' });
        return;
    }

    try {
        const submission = await Submission.findById(submissionId);

        if (!submission) {
            res.status(404).json({ message: 'Submission not found' });
            return;
        }

        res.status(200).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

interface SetSubmissionReq {
    questionID: string;
}
// @desc    Set submission
// @route   POST /api/submission/
// @access  Private
const setSubmission = asyncHandler(async (req: Request, res: Response) => {
    const { questionID } = req.body as SetSubmissionReq;

    if (!isValidObjectId(questionID)) {
        res.status(400).json({ message: 'Invalid question ID' });
        return;
    }

    try {
        const submission = isValidCreateSubmissionRequest.parse(req.body);
        const createSubmissionReq = {
            user: new mongoose.Types.ObjectId(submission.user),
            question: new mongoose.Types.ObjectId(submission.question),
            answer: submission.answer
        };

        const resp = await SubmissionService.createSubmission(createSubmissionReq);

        res.status(resp.status).json(resp);

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

const SubmissionController = {
    getSubmissions,
    getSubmission,
    setSubmission,
};

export { SubmissionController as default };