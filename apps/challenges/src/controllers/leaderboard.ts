import { Request, Response } from "express";

const GetLeaderboard = async (req: Request, res: Response) => {
    try {
        res.json({
            'message': 'hello'
        });
        throw new Error('test');
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

const StartLeaderboard = async (req: Request, res: Response) => {
    try {
        res.json({});
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

const GetCurrnetLeaderboard = async (req: Request, res: Response) => {
    try {
        res.json({});
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

const LeaderBoardController = {
    GetLeaderboard,
    StartLeaderboard,
    GetCurrnetLeaderboard
};

export { LeaderBoardController as default };
