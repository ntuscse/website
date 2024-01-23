import { Request, Response } from "express";
const asyncHandler = require('express-async-handler');
const Question = require('../model/question');
const Submission = require('../model/submission');
const Leaderboard = require('../model/leaderboard');
import { isValidObjectId } from "../utils/db";


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
        const question = await Question.findById(questionId);

        // cooldown period of 3 seconds per user per question
        // if (question.submissions.find((submission: any) => submission.user == req.body.user && new Date(submission.createdAt) > new Date(new Date().getTime() - 3 * 1000))) {
        //     return res.status(400).json({ message: 'Cooldown period of 10 seconds per user' });
        // }

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
            question: questionId,
            attempt: question.submissions.find((submission: any) => submission.user == req.body.user) ? question.submissions.find((submission: any) => submission.user == req.body.user).attempt + 1 : 1
        });

        // Update question submissions array using $push and $inc submission counts
        await Question.findByIdAndUpdate(questionId, { 
            $push: { submissions: submission._id },
            $inc: { submissions_count: 1, correct_submissions_count: req.body.answer === question.answer ? 1 : 0 } },
            { new: true });

        // Retrieve user and update points of the entry in the leaderboard
        const leaderboard = await Leaderboard.findOne({ _id: req.body.leaderboard });
        const ranking = leaderboard.rankings.find((ranking: any) => ranking.user == req.body.user);
        if (!ranking) {
            await Leaderboard.findByIdAndUpdate(req.body.leaderboard, { $push: { rankings: { user: req.body.user, points: submission.points_awarded } } }, { new: true });
        } else {
            // if there is previous submission for the same question, remove the points from the previous submission and add the points from the new submission
            const prevSubmission = await Submission.find({ user: req.body.user, question: questionId, _id: { $ne: submission._id } });
            if (prevSubmission.length > 0) {
                // get the highest points awarded for the question
                const highestPoints = Math.max(...prevSubmission.map((submission: any) => submission.points_awarded));
                await Leaderboard.findByIdAndUpdate(req.body.leaderboard, { $set: { 'rankings.$[elem].points': ranking.points - highestPoints + submission.points_awarded } }, { arrayFilters: [{ 'elem.user': req.body.user }], new: true });
            } else {
                await Leaderboard.findByIdAndUpdate(req.body.leaderboard, { $set: { 'rankings.$[elem].points': ranking.points + submission.points_awarded } }, { arrayFilters: [{ 'elem.user': req.body.user }], new: true });
            }
        }

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