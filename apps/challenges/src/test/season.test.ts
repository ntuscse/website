import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import SeasonController from '../controllers/season';
import SeasonService from '../service/seasonService';

describe('getLinks', () => {
    it('should return correct links when rankingsCount is 0', () => {
        const seasonID = '123';
        const page = 0;
        const limit = 10;
        const rankingsCount = 0;
        const links = {
            self: `/api/seasons/${seasonID}/rankings?page=0&limit=${limit}`,
            first: `/api/seasons/${seasonID}/rankings?page=0&limit=${limit}`,
            previous: null,
            next: null,
            last: `/api/seasons/${seasonID}/rankings?page=0&limit=${limit}`
        }
        expect(SeasonController.getLinks(seasonID, page, limit, rankingsCount)).toEqual(links);
    });

    /*
    it('should return correct links when page is 0', () => {
        const seasonID = '123';
        const page = 0;
        const limit = 10;
        const rankingsCount = 100;
        const links = {
            self: `/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`,
            first: `/api/seasons/${seasonID}/rankings?page=0&limit=${limit}`,
            previous: null,
            next: `/api/seasons/${seasonID}/rankings?page=${page + 1}&limit=${limit}`,
            last: `/api/seasons/${seasonID}/rankings?page=${Math.ceil(rankingsCount / limit) - 1}&limit=${limit}`
        }
        expect(SeasonController.getLinks(seasonID, page, limit, rankingsCount)).toEqual(links);
    });
    */
})

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
        const mockRankings = [
            {
                _id: new mongoose.Types.ObjectId('5f8b2a9f9b6f0c2f1c1d8e4c'),
                seasonID: new mongoose.Types.ObjectId(seasonID),
                userID: new mongoose.Types.ObjectId('5f8b2a9f9b6f0c2f1c1d8e4b'),
                points: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        mockGetSeasonByID.mockResolvedValueOnce({
            _id: new mongoose.Types.ObjectId(seasonID),
            title: 'Test Season',
            startDate: new Date(),
            endDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        mockGetSeasonRankings.mockResolvedValueOnce(mockRankings);
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings`);
        expect(mockGetSeasonByID).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonByID.mock.calls[0][0]).toBe(seasonID);
        expect(mockGetSeasonRankings).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonRankings.mock.calls[0][0]).toBe(seasonID);
        expect(mockGetSeasonRankingsByPagination).toHaveBeenCalledTimes(0);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            rankings: mockRankings.map(ranking => {
                return {
                    _id: ranking._id.toString(),
                    seasonID: ranking.seasonID.toString(),
                    userID: ranking.userID.toString(),
                    points: ranking.points,
                    createdAt: ranking.createdAt.toISOString(),
                    updatedAt: ranking.updatedAt.toISOString()
                }
            })
        });
    });

    it('should return 200 OK with correct pagination links', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const mockRankings = [
            {
                _id: new mongoose.Types.ObjectId('5f8b2a9f9b6f0c2f1c1d8e4c'),
                seasonID: new mongoose.Types.ObjectId(seasonID),
                userID: new mongoose.Types.ObjectId('5f8b2a9f9b6f0c2f1c1d8e4b'),
                points: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                _id: new mongoose.Types.ObjectId('5f8b2a9f9b6f0c2f1c1d8e4d'),
                seasonID: new mongoose.Types.ObjectId(seasonID),
                userID: new mongoose.Types.ObjectId('5f8b2a9f9b6f0c2f1c1d8e4e'),
                points: 90,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ];
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
        });
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(mockGetSeasonByID).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonByID.mock.calls[0][0]).toBe(seasonID);
        expect(mockGetSeasonRankingsByPagination).toHaveBeenCalledTimes(1);
        expect(mockGetSeasonRankingsByPagination.mock.calls[0][0]).toBe(seasonID);
        expect(mockGetSeasonRankingsByPagination.mock.calls[0][1]).toBe(page);
        expect(mockGetSeasonRankingsByPagination.mock.calls[0][2]).toBe(limit);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({
            rankings: mockRankings.map(ranking => {
                return {
                    _id: ranking._id.toString(),
                    seasonID: ranking.seasonID.toString(),
                    userID: ranking.userID.toString(),
                    points: ranking.points,
                    createdAt: ranking.createdAt.toISOString(),
                    updatedAt: ranking.updatedAt.toISOString()
                }
            }),
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