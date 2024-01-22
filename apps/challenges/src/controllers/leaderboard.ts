import { Request, Response } from "express";
const asyncHandler = require('express-async-handler');
const Question = require('../model/question');
const Submission = require('../model/submission');
const Leaderboard = require('../model/leaderboard');
import { isValidObjectId } from "../utils/db";

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Public
const getLeaderBoards = asyncHandler(async (req: Request, res: Response) => {
    const leaderboards = await Leaderboard.find({})
    res.status(200).json(leaderboards)
});

// @desc    Get active leaderboard
// @route   GET /api/leaderboard/active
// @access  Public
const getActiveLeaderBoards = asyncHandler(async (req: Request, res: Response) => {
    const leaderboards = await Leaderboard.find({"active": true })
    res.status(200).json(leaderboards)
});

// @desc    Get leaderboard
// @route   GET /api/leaderboard/:id
// @access  Public
const getLeaderBoard = asyncHandler(async (req: Request, res: Response) => {
    const leaderboardId = req.params.id;

    if (!isValidObjectId(leaderboardId)) {
        return res.status(400).json({ message: 'Invalid leaderboard ID' });
    }

    try {
        const leaderboard = await Leaderboard.findById(leaderboardId);

        if (!leaderboard) {
            return res.status(404).json({ message: 'Leaderboard not found' });
        }

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Set leaderboard
// @route   POST /api/leaderboard
// @access  Private
const setLeaderBoard = asyncHandler(async (req: Request, res: Response) => {
    try {
        const leaderboard = await Leaderboard.create({
            title: req.body.title,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            active: req.body.active,
        });

        res.status(201).json(leaderboard);
    } catch (error) {
        if ((error as Error).name === 'ValidationError') {
            return res.status(400).json({ message: (error as Error).message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Update leaderboard
// @route   PUT /api/leaderboard/:id
// @access  Private
const updateLeaderBoard = asyncHandler(async (req: Request, res: Response) => {
    const leaderboardId = req.params.id;
    if (!isValidObjectId(leaderboardId)) {
        return res.status(400).json({ message: 'Invalid leaderboard ID' });
    }

    try {
        const leaderboard = await Leaderboard.findById(leaderboardId);

        if (!leaderboard) {
            return res.status(404).json({ message: 'Leaderboard not found' });
        }

        const updatedLeaderboard = await Leaderboard.findByIdAndUpdate(leaderboardId, req.body, { new: true });

        res.status(200).json(updatedLeaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Delete leaderboard
// @route   DELETE /api/leaderboard/:id
// @access  Private
const deleteLeaderBoard = asyncHandler(async (req: Request, res: Response) => {
    const leaderboardId = req.params.id;
    if (!isValidObjectId(leaderboardId)) {
        return res.status(400).json({ message: 'Invalid leaderboard ID' });
    }

    try {
        const leaderboard = await Leaderboard.findById(leaderboardId);

        if (!leaderboard) {
            return res.status(404).json({ message: 'Leaderboard not found' });
        }

        await leaderboard.remove();

        res.status(200).json({ message: 'Leaderboard deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Get leaderboard rankings
// @route   GET /api/leaderboard/rankings/:id/:top
// @access  Public
const getLeaderBoardRankings = asyncHandler(async (req: Request, res: Response) => {
    const leaderboardId = req.params.id;
    const top = parseInt(req.params.top);

    if (!isValidObjectId(leaderboardId)) {
        return res.status(400).json({ message: 'Invalid leaderboard ID' });
    }

    if (isNaN(top) || top < 1) {
        return res.status(400).json({ message: 'Invalid top' });
    }

    try {
        const leaderboard = await Leaderboard.findById(leaderboardId);

        if (!leaderboard) {
            return res.status(404).json({ message: 'Leaderboard not found' });
        }

        // TODO: Aggregate submissions and sort by points

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const LeaderBoardController = {
    getLeaderBoards,
    getActiveLeaderBoards,
    getLeaderBoard,
    setLeaderBoard,
    updateLeaderBoard,
    deleteLeaderBoard,
    getLeaderBoardRankings
};

export { LeaderBoardController as default };
