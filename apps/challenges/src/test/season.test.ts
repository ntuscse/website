import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import SeasonController from '../controllers/season';

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
    it('should return 200 OK with correct request', async () => {
        const seasonID = '5f8b2a9f9b6f0c2f1c1d8e4a';
        const page = 0;
        const limit = 10;
        const res = await request(app).get(`/api/seasons/${seasonID}/rankings?page=${page}&limit=${limit}`);
        expect(res.status).toEqual(200);
    });
})