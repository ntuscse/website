import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";

import { isValidObjectId } from "../utils/db";
import SeasonService from "../service/seasonService";
import {
  isNonNegativeInteger,
  isValidDate,
  zodIsValidObjectId,
} from "../utils/validator";
import { generatePaginationMetaData } from "../utils/pagination";

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
  if (start != null && typeof start !== "string") {
    res.status(400).json({ message: "Invalid request" });
    return;
  }
  if (end != null && typeof end !== "string") {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  const _startDate = start != null ? new Date(parseInt(start)) : null;
  const _endDate = end != null ? new Date(parseInt(end)) : null;

  try {
    const seasons = await SeasonService.getSeasonsByDate(_startDate, _endDate);

    res.status(200).json({
      seasons: seasons,
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Get season
// @route   GET /api/seasons/:seasonID
// @access  Public
const getSeasonByID = asyncHandler(async (req: Request, res: Response) => {
  const { seasonID } = req.params;

  if (!isValidObjectId(seasonID)) {
    res.status(400).json({ message: "Invalid season ID" });
    return;
  }
  try {
    const season = await SeasonService.getSeasonByID(seasonID);
    res.status(200).json(season);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Set season
// @route   POST /api/seasons
// @access  Private
const createSeason = asyncHandler(async (req: Request, res: Response) => {
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
    const season = await SeasonService.createSeason(
      body.title,
      _startDate,
      _endDate
    );
    res.status(201).json(season);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc    Get season rankings
// @route   GET /api/seasons/:seasonID/rankings
// @access  Public
const getSeasonRankings = asyncHandler(async (req: Request, res: Response) => {
  let seasonID = "";
  let page: number | undefined, limit: number | undefined;
  try {
    seasonID = zodIsValidObjectId.parse(req.params.seasonID);
    const queryIsValid = z
      .object({
        page: z.coerce.number().int().min(0).optional(),
        limit: z.coerce.number().int().min(1).optional(),
      })
      .refine(
        // page and limit must either both exist or both not exist
        (data) =>
          ((data.page || data.page === 0) && data.limit) ||
          (!data.page && data.page !== 0 && !data.limit),
        { message: "Invalid request" }
      );
    page = queryIsValid.parse(req.query).page;
    limit = queryIsValid.parse(req.query).limit;
    const season = await SeasonService.getSeasonByID(seasonID);
    if (!season) {
      res.status(404).json({ message: "Season not found" });
      return;
    }

    if (!limit && !page) {
      const rankings = SeasonService.getSeasonRankings(seasonID);
      res.status(200).json({
        seasonID: seasonID,
        rankings: rankings,
      });
      return;
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  try {
    // Limit and page must either both exist or both not exist, since both not exist is checked above, now it must be both exist
    // This is just a redundant check added for eslint
    if (limit === undefined || page === undefined) {
      console.log(limit, page);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    const { rankings, rankingsCount } =
      SeasonService.getSeasonRankingsByPagination(seasonID, page, limit);

    isNonNegativeInteger.parse(rankingsCount);
    const maxPageIndex =
      rankingsCount == 0 ? 0 : Math.ceil(rankingsCount / limit) - 1;

    const metaData = generatePaginationMetaData(
      `/api/seasons/${seasonID}/rankings`,
      page,
      limit,
      maxPageIndex,
      rankingsCount
    );
    res.setHeader("access-control-expose-headers", "pagination");
    res.setHeader("pagination", JSON.stringify(metaData));
    res.status(200).json({
      seasonID: seasonID,
      rankings: rankings,
      _metaData: metaData,
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getSeasonQuestions = asyncHandler(async (req: Request, res: Response) => {
  try {
    const seasonID = zodIsValidObjectId.parse(req.params.seasonID);

    const season = await SeasonService.getSeasonByID(seasonID);
    if (!season) {
      res.status(404).json({ message: "Season not found" });
      return;
    }

    const questions = await SeasonService.getSeasonQuestions(seasonID);

    res.status(200).json(questions);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid request" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

const SeasonController = {
  getSeasons,
  getActiveSeasons,
  getSeasonByID,
  createSeason,
  getSeasonRankings,
  getSeasonQuestions,
};

export { SeasonController as default };
