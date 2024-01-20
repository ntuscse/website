import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { isValidObjectId } from "../utils/db";
import SeasonService from "../service/seasonService";
import isValidDate from "../utils/checkObjectProperties";

interface CreateSeasonRequest {
    title: string;
    startDate: number;
    endDate: number;
}
// @desc    Get season
// @route   GET /api/seasons
// @access  Public
const getSeasons = asyncHandler(async (req: Request, res: Response) => {
    const { start, end } = req.query;
    var _startDate;
    var _endDate;
    if (start != null && typeof start !== "string"){
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    if (end != null && typeof end !== "string") {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }

    _startDate = start != null ? new Date(parseInt((start) as string)) : null;
    _endDate = end != null ? new Date(parseInt((end) as string)) : null;

    try {
        const seasons = await SeasonService.getSeasonsByDate(_startDate, _endDate);
        res.status(200).json({
            seasons: seasons,
        });
    } catch {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Getc active season
// @route   GET /api/seasons/active
// @access  Public
const getActiveSeasons = asyncHandler(async (req: Request, res: Response) => {
    try {
        const seasons = await SeasonService.getActiveSeasons();
        res.status(200).json(seasons);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Get season
// @route   GET /api/seasons/:seasonID
// @access  Public
const getSeasonByID = asyncHandler(async (req: Request, res: Response) => {
    const { seasonID } = req.params;

    if (!isValidObjectId(seasonID)) {
        res.status(400).json({ message: 'Invalid season ID' });
        return;
    }
    try {
        const season = await SeasonService.getSeasonByID(seasonID);
        res.status(200).json(season);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// @desc    Set season
// @route   POST /api/seasons
// @access  Private
const createSeason = asyncHandler(async (req: Request, res: Response) => {
    const body: CreateSeasonRequest = req.body;
    if(!body.title || !body.startDate || !body.endDate) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    var _startDate;
    var _endDate;
    try{
        _startDate = new Date(body.startDate);
        _endDate = new Date(body.endDate);
        if(!isValidDate(_startDate) || !isValidDate(_endDate)){
            throw new Error("Invalid Date");
        }
    }catch{
        res.status(400).json({ message: 'Invalid request: Date invalid' });
        return;
    }

    try {
        const season = await SeasonService.createSeason(
            body.title,
            _startDate,
            _endDate
        );
        res.status(201).json(season);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const getUserSeasonRanking = asyncHandler(async (req: Request, res: Response) => {
    const { seasonID, userID } = req.params;

    if (!isValidObjectId(seasonID) || !isValidObjectId(userID)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    try {
        const { rank, rankingDocument } = await SeasonService.getUserSeasonRanking(seasonID, userID);
        res.status(200).json({
            ranking: rankingDocument,
            rank: rank
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

const getUserAllSeasonRankings = asyncHandler(async (req: Request, res: Response) => {
    const { userID } = req.params;

    if (!isValidObjectId(userID)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    try {
        const rankings = await SeasonService.getUserAllSeasonRankings(userID);
        res.status(200).json(rankings);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get season rankings
// @route   GET /api/seasons/:seasonID/rankings
// @access  Public
const getSeasonRankings = asyncHandler(async (req: Request, res: Response) => {
    const { seasonID } = req.params;
    const { page, limit } = req.query;

    if (!isValidObjectId(seasonID)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    if((page != null && limit == null) || (page == null && limit != null)){
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    if (page != null && typeof page !== "string") {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    if (limit != null && typeof limit !== "string") {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }

    const _page = parseInt((page) as string);
    const _limit = parseInt((limit) as string);
    try {
        const {rankings , rankingsCount} = await SeasonService.getSeasonRankingsByPagination(seasonID, _page, _limit);
        const metaData = {
            page: _page,
            limit: _limit,
            pageCount: Math.ceil(rankingsCount / _limit) || 0,
            itemCount: rankingsCount || 0,
            links: getLinks(seasonID, _page, _limit, rankingsCount)
        }
        res.setHeader("access-control-expose-headers", "pagination");
        res.setHeader("pagination", JSON.stringify(metaData));
        res.status(200).json({
            rankings: rankings,
            _metaData: metaData
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const getLinks = (seasonID: string, page: number, limit: number, rankingsCount: number) => {
    var links;
    if(page < 0 || page > Math.ceil(rankingsCount / limit) - 1){
        links = {
            self: `/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`,
            first: `/api/seasons/${seasonID}/rankings?page=0&limit=${limit}`,
            previous: null,
            next: null,
            last: `/api/seasons/${seasonID}/rankings?page=${Math.ceil(rankingsCount / limit) - 1}&limit=${limit}`
        } 
    }else if(page == 0){
        links = {
            self: `/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`,
            first: `/api/seasons/${seasonID}/rankings?page=0&limit=${limit}`,
            previous: null,
            next: `/api/seasons/${seasonID}/rankings?page=${page + 1}&limit=${limit}`,
            last: `/api/seasons/${seasonID}/rankings?page=${Math.ceil(rankingsCount / limit) - 1}&limit=${limit}`
        }
    }else if (page == Math.ceil(rankingsCount / limit) - 1){
        links = {
            self: `/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`,
            first: `/api/seasons/${seasonID}/rankings?page=0&limit=${limit}`,
            previous: `/api/seasons/${seasonID}/rankings?page=${page - 1}&limit=${limit}`,
            next: null,
            last: `/api/seasons/${seasonID}/rankings?page=${Math.ceil(rankingsCount / limit) - 1}&limit=${limit}`
        }
    }else{
        links = {
            self: `/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`,
            first: `/api/seasons/${seasonID}/rankings?page=0&limit=${limit}`,
            previous: `/api/seasons/${seasonID}/rankings?page=${page - 1}&limit=${limit}`,
            next: `/api/seasons/${seasonID}/rankings?page=${page + 1}&limit=${limit}`,
            last: `/api/seasons/${seasonID}/rankings?page=${Math.ceil(rankingsCount / limit) - 1}&limit=${limit}`
        }
    }
    
    return links;
}

const updateSeasonRankings = asyncHandler(async (req: Request, res: Response) => {
    const { seasonID, userID } = req.params;
    const { points } = req.body;

    if (!isValidObjectId(seasonID) || !isValidObjectId(userID)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    if(points == null || typeof points !== "number"){
        res.status(400).json({ message: 'Invalid request' });
        return;
    }
    try {
        const season = await SeasonService.updateSeasonRankings(seasonID, userID, points);
        res.status(200).json(season);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

const SeasonController = {
    getSeasons,
    getActiveSeasons,
    getSeasonByID,
    createSeason,
    getSeasonRankings,
    getUserSeasonRanking,
    getUserAllSeasonRankings,
    updateSeasonRankings
};

export { SeasonController as default };
