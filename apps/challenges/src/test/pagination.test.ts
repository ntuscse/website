import { z } from "zod";
import { generatePaginationMetaData, paginateArray } from "../utils/pagination";

describe('generatePaginationMetaData', () => {
    it('should return error if pageIndex < 0', () => {
        const baseUrl = '/api/seasons/123/rankings';
        const pageIndex = -1;
        const limit = 10;
        const maxPageIndex = 0;

        expect(
            () => {generatePaginationMetaData(baseUrl, pageIndex, limit, maxPageIndex)}
        )
            .toThrow(z.ZodError)
    });

    it('should return error if maxPageIndex < 0', () => {
        const baseUrl = '/api/seasons/123/rankings';
        const pageIndex = 0;
        const limit = 10;
        const maxPageIndex = -1;

        expect(
            () => { generatePaginationMetaData(baseUrl, pageIndex, limit, maxPageIndex) }
        )
            .toThrow(z.ZodError)
    });

    it('should return error if limit < 1', () => {
        const baseUrl = '/api/seasons/123/rankings';
        const pageIndex = 0;
        const limit = 0;
        const maxPageIndex = 0;

        expect(
            () => { generatePaginationMetaData(baseUrl, pageIndex, limit, maxPageIndex) }
        )
            .toThrow(z.ZodError)
    });

    it('should return correct links (boundary value check -> all input is exactly one step away from being invalid input)', () => {
        const baseUrl = '/api/seasons/123/rankings';
        const pageIndex = 0;
        const limit = 1;
        const maxPageIndex = 0;

        const links = {
            self: `${baseUrl}?page=0&limit=${limit}`,
            first: `${baseUrl}?page=0&limit=${limit}`,
            previous: null,
            next: null,
            last: `${baseUrl}?page=0&limit=${limit}`
        }
        expect(generatePaginationMetaData(baseUrl, pageIndex, limit, maxPageIndex)).toEqual(links);
    });

    it('should return correct links when the page is in the middle', () => {
        const baseUrl = '/api/seasons/123/rankings';
        const pageIndex = 1;
        const limit = 1;
        const maxPageIndex = 2;

        const links = {
            self: `${baseUrl}?page=1&limit=${limit}`,
            first: `${baseUrl}?page=0&limit=${limit}`,
            previous: `${baseUrl}?page=0&limit=${limit}`,
            next: `${baseUrl}?page=2&limit=${limit}`,
            last: `${baseUrl}?page=2&limit=${limit}`
        }
        expect(generatePaginationMetaData(baseUrl, pageIndex, limit, maxPageIndex)).toEqual(links);
    });

    it('should all links should be unique when they should be', () => {
        const baseUrl = '/api/seasons/123/rankings';
        const pageIndex = 2;
        const limit = 1;
        const maxPageIndex = 4;

        const links = {
            self: `${baseUrl}?page=2&limit=${limit}`,
            first: `${baseUrl}?page=0&limit=${limit}`,
            previous: `${baseUrl}?page=1&limit=${limit}`,
            next: `${baseUrl}?page=3&limit=${limit}`,
            last: `${baseUrl}?page=4&limit=${limit}`
        }
        expect(generatePaginationMetaData(baseUrl, pageIndex, limit, maxPageIndex)).toEqual(links);
    });

    it('should return correct links even if pageIndex > maxPageIndex', () => {
        const baseUrl = '/api/seasons/123/rankings';
        const pageIndex = 6;
        const limit = 1;
        const maxPageIndex = 5;

        const links = {
            self: `${baseUrl}?page=${pageIndex}&limit=${limit}`,
            first: `${baseUrl}?page=0&limit=${limit}`,
            previous: null,
            next: null,
            last: `${baseUrl}?page=${maxPageIndex}&limit=${limit}`
        }
        expect(generatePaginationMetaData(baseUrl, pageIndex, limit, maxPageIndex)).toEqual(links);
    });
})

describe('paginateArray', () => {
    it('should return empty array if the array is empty', () => {
        const array = [];
        const pageSize = 0
        const pageNumber = 0

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([])
    });

    it('should return empty array if the array is empty with invalid pageSize', () => {
        const array = [];
        const pageSize = -1
        const pageNumber = 0

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([])
    });

    it('should return empty array if the array is empty with invalid pageNumber', () => {
        const array = [];
        const pageSize = 0
        const pageNumber = -123

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([])
    });

    it('should return empty array if the array is empty with invalid pageSize and pageNumber', () => {
        const array = [];
        const pageSize = 132242
        const pageNumber = 123

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([])
    });

    it('should return empty array if the array is empty with invalid pageSize and pageNumber', () => {
        const array = [];
        const pageSize = 132242
        const pageNumber = 123

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([])
    });


    it('should return empty array if the array is exist but filled with invalid pageSize and pageNumber', () => {
        const array = [1, 2, 3];
        const pageSize = 132242
        const pageNumber = 123

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([])
    });

    it('should return empty array if the array is exist but filled with invalid pageSize and pageNumber', () => {
        const array = [1, 2, 3];
        const pageSize = -1
        const pageNumber = 2

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([])
    });

    it('should return empty array if the array is exist but filled with invalid pageSize and pageNumber', () => {
        const array = [1, 2, 3];
        const pageSize = 0
        const pageNumber = 2

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([])
    });

    // do note that while page number being negative do work, 
    // in Session getSeasonRankingsByPagination, 
    // we do not accept negative page number
    it('should return correct paginated data even if pageNumber is negative', () => {
        const array = [1, 2, 3, 4, 5];
        const pageSize = 1
        const pageNumber = -2

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([4])
    });

    it('should return correct paginated data', () => {
        const array = [1, 2, 3];
        const pageSize = 1
        const pageNumber = 2

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([3])
    });

    it('should return correct paginated data', () => {
        const array = [1, 2, 3];
        const pageSize = 2
        const pageNumber = 0   

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([1, 2])
    });

    it('should return correct paginated data', () => {
        const array = [1, 2, 3, 4, 5];
        const pageSize = 2
        const pageNumber = 1

        expect(paginateArray(array, pageSize, pageNumber)).toEqual([3,4])
    });
})