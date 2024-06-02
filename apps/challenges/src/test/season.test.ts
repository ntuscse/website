import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import SeasonService from '../service/seasonService';
import { UserRanking } from '../model/rankingScore';

describe('getSeasonRankings', () => {
    // test getSeasonRankings with correct request
    const mockGetSeasonRankingsByPagination = jest.spyOn(SeasonService, 'getSeasonRankingsByPagination');
    const mockGetSeasonByID = jest.spyOn(SeasonService, 'getSeasonByID');
    const mockGetSeasonRankings = jest.spyOn(SeasonService, 'getSeasonRankings');
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return 400 if seasonID is not valid mongoID', async () => {
        const seasonID = '123';
        const page = 0;
        const limit = 10;
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(res.status).toEqual(400);
    });

    it('should return 400 if page exist but limit does not exist', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const page = 0;
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}`);
        expect(res.status).toEqual(400);
    });

    it('should return 400 if limit exist but page does not exist', async () => {  
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const limit = 10;
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?limit=${limit}`);
        expect(res.status).toEqual(400);
    });

    it('should return 400 if page is not a number', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const page = 'abc';
        const limit = 10;
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(res.status).toEqual(400);
    });

    it('should return 400 if limit is not a number', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const page = 0;
        const limit = 'abc';
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(res.status).toEqual(400);
    });

    it('should return 400 if page is negative', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const page = -1;
        const limit = 10;
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(res.status).toEqual(400);
    });

    it('should return 400 if limit is less or equal 0', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const page = 0;
        const limit = 0;
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(res.status).toEqual(400);
    });

    it('should return 404 if seasonID is not found', async () => {
        mockGetSeasonByID.mockResolvedValueOnce(null);
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const page = 0;
        const limit = 10;
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(mockGetSeasonByID).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonByID.mock.calls[0][0]).toBe(seasonID);
        expect(res.status).toEqual(404);
    });

    it('should return 200 OK even without page and limit', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const userID = new mongoose.Types.ObjectId()
        const mockRankings = [
            {
                user: {
                    userID: userID.toString(),
                    name: 'Test User'
                },
                points: 123
            }
        ] as UserRanking[];
        mockGetSeasonByID.mockResolvedValueOnce({
            _id: new mongoose.Types.ObjectId(seasonID),
            title: 'Test Season',
            startDate: new Date(),
            endDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        mockGetSeasonRankings.mockResolvedValueOnce(mockRankings as never);
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings`);
        expect(mockGetSeasonByID).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonByID.mock.calls[0][0]).toBe(seasonID);
        expect(mockGetSeasonRankings).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonRankings.mock.calls[0][0]).toBe(seasonID);
        expect(mockGetSeasonRankingsByPagination).toHaveBeenCalledTimes(0);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            seasonID: seasonID,
            rankings: mockRankings
        });
    });

    it('should return 200 OK with correct pagination links', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const userID = new mongoose.Types.ObjectId();
        const userID2 = new mongoose.Types.ObjectId()
        const mockRankings = [
            {
                user: {
                    userID: userID.toString(),
                    name: 'Test User'
                },
                points: 123
            },
            {
                user: {
                    userID: userID2.toString(),
                    name: 'Test User 2'
                },
                points: 456
            }
        ] as UserRanking[];
        const page = 0;
        const limit = 2;
        const mockRankingsCount = 4;
        mockGetSeasonByID.mockResolvedValueOnce({
            _id: new mongoose.Types.ObjectId(seasonID),
            title: 'Test Season',
            startDate: new Date(),
            endDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        mockGetSeasonRankingsByPagination.mockResolvedValueOnce({
            rankings: mockRankings,
            rankingsCount: mockRankingsCount
        } as never);
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(mockGetSeasonByID).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonByID.mock.calls[0][0]).toBe(seasonID);
        expect(mockGetSeasonRankingsByPagination).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonRankingsByPagination.mock.calls[0][0]).toBe(seasonID);
        expect(mockGetSeasonRankingsByPagination.mock.calls[0][1]).toBe(page);
        expect(mockGetSeasonRankingsByPagination.mock.calls[0][2]).toBe(limit);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            seasonID: seasonID,
            rankings: mockRankings,
            _metaData: {
                page: 0,
                limit: 2,
                pageCount: 2,
                itemCount: 4,
                links: {
                    self: `/api/seasons/${seasonID}/rankings?page=0&limit=2`,
                    first: `/api/seasons/${seasonID}/rankings?page=0&limit=2`,
                    previous: null,
                    next: `/api/seasons/${seasonID}/rankings?page=1&limit=2`,
                    last: `/api/seasons/${seasonID}/rankings?page=1&limit=2`
                }
            }   
        });
    });
})