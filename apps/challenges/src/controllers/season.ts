import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";

import { isValidObjectId } from "../utils/db";
import SeasonService from "../service/seasonService";
import {
  isValidDate,
  isValidPaginationRequest,
} from "../utils/validator";
import { Logger } from "nodelogger";
import RankingService from "../service/rankingService";
import { StatusCodeError } from "../types/types";
import { ErrorHandling } from "../middleware/errorHandler";
interface CreateSeasonRequest {
  title: string;
  startDate: number;
  endDate: number;
}
// @desc    Get season
// @route   GET /api/seasons
// @access  Public
const GetSeasons = asyncHandler(async (req: Request, res: Response) => {
  const { start, end } = req.query;

  try {
    const seasons = await SeasonService.GetSeasons(start, end);

    res.status(200).json({
      seasons: seasons,
    });
  } catch (err) {
    const error = err as Error;
    Logger.error("SeasonController.GetSeasons error", error, error.stack);
    ErrorHandling(err, res);
  }
});

// @desc    Getc active season
// @route   GET /api/seasons/active
// @access  Public
const GetActiveSeasons = asyncHandler(async (req: Request, res: Response) => {
  try {
    const seasons = await SeasonService.GetActiveSeasons();
    res.status(200).json(seasons);
  } catch (err) {
    const error = err as Error;
    Logger.error("SeasonController.GetActiveSeasons error", error, error.stack);
    ErrorHandling(err, res);
  }
});

// @desc    Get season
// @route   GET /api/seasons/:seasonID
// @access  Public
const GetSeasonByID = asyncHandler(async (req: Request, res: Response) => {
  const { seasonID } = req.params;

  if (!isValidObjectId(seasonID)) {
    res.status(400).json({ message: "Invalid season ID" });
    return;
  }
  try {
    const season = await SeasonService.GetSeasonByID(seasonID);
    res.status(200).json(season);
  } catch (err) {
    const error = err as Error;
    Logger.error("SeasonController.GetSeasonByID error", error, error.stack);
    ErrorHandling(err, res);
  }
});

// @desc    Set season
// @route   POST /api/seasons
// @access  Private
const CreateSeason = asyncHandler(async (req: Request, res: Response) => {
  const body: CreateSeasonRequest = req.body as CreateSeasonRequest;
  if (!body.title || !body.startDate || !body.endDate) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }
  let _startDate: Date;
  let _endDate: Date;
  try {
    _startDate = new Date(body.startDate);
    _endDate = new Date(body.endDate);
    if (!isValidDate(_startDate) || !isValidDate(_endDate)) {
      throw new Error("Invalid Date");
    }
  } catch {
    res.status(400).json({ message: "Invalid request: Date invalid" });
    return;
  }

  try {
    const season = await SeasonService.CreateSeason(
      body.title,
      _startDate,
      _endDate
    );
    res.status(201).json(season);
  } catch (err) {
    const error = err as Error;
    Logger.error("SeasonController.CreateSeason error", error, error.stack);
    ErrorHandling(err, res);
  }
});

// @desc    Get season rankings
// @route   GET /api/seasons/:seasonID/rankings
// @access  Public
const GetSeasonRankings = asyncHandler(async (req: Request, res: Response) => {
  try {
    const seasonID = req.params.seasonID;
    const paginationQuery = isValidPaginationRequest.parse(req.query);
    const parsedPage = paginationQuery.page;
    const parsedLimit = paginationQuery.limit;

    const ranking = await RankingService.GetRankingBySeasonID(
      seasonID,
      parsedPage,
      parsedLimit
    );
    if (ranking._metaData) {
      res.setHeader("access-control-expose-headers", "pagination");
      res.setHeader("pagination", JSON.stringify(ranking._metaData));
    }

    res.status(200).json(ranking);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      `SeasonController.getSeasonRankings error`,
      error,
      error.stack
    );
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else if (err instanceof StatusCodeError) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

const GetSeasonQuestions = asyncHandler(async (req: Request, res: Response) => {
  try {
    const seasonID = req.params.seasonID;

    const questions = await SeasonService.GetSeasonQuestions(seasonID);

    res.status(200).json(questions);
  } catch (err) {
    const error = err as Error;
    Logger.error(
      `SeasonController.GetSeasonQuestions error`,
      error,
      error.stack
    );
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

const SeasonController = {
  GetSeasons,
  GetActiveSeasons,
  GetSeasonByID,
  CreateSeason,
  GetSeasonRankings,
  GetSeasonQuestions,
};

export { SeasonController as default };
