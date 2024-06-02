import { z } from "zod";
import { generatePaginationMetaData, paginateArray } from "../utils/pagination";

describe("generatePaginationMetaData", () => {
  it("should return error if pageIndex < 0", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = -1;
    const limit = 10;
    const maxPageIndex = 0;
    const itemCount = 2;

    expect(() => {
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      );
    }).toThrow(z.ZodError);
  });

  it("should return error if maxPageIndex < 0", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = 0;
    const limit = 10;
    const maxPageIndex = -1;
    const itemCount = 2;

    expect(() => {
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      );
    }).toThrow(z.ZodError);
  });

  it("should return error if limit < 1", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = 0;
    const limit = 0;
    const maxPageIndex = 0;
    const itemCount = 2;

    expect(() => {
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      );
    }).toThrow(z.ZodError);
  });

  it("should return error if itemCount < 0", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = 0;
    const limit = 1;
    const maxPageIndex = 0;
    const itemCount = -1;

    expect(() => {
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      );
    }).toThrow(z.ZodError);
  });

  it("should return correct links even if itemCount is 0", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = 0;
    const limit = 1;
    const maxPageIndex = 0;
    const itemCount = 0;

    const links = {
      self: `${baseUrl}?page=0&limit=${limit}`,
      first: `${baseUrl}?page=0&limit=${limit}`,
      previous: null,
      next: null,
      last: `${baseUrl}?page=0&limit=${limit}`,
    };

    const metaData = {
      itemCount: 0,
      limit: 1,
      pageCount: 0,
      page: 0,
      links: links,
    };
    expect(
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      )
    ).toEqual(metaData);
  });

  it("should return correct links (boundary value check -> all input is exactly one step away from being invalid input)", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = 0;
    const limit = 1;
    const maxPageIndex = 0;
    const itemCount = 1;

    const links = {
      self: `${baseUrl}?page=0&limit=${limit}`,
      first: `${baseUrl}?page=0&limit=${limit}`,
      previous: null,
      next: null,
      last: `${baseUrl}?page=0&limit=${limit}`,
    };

    const metaData = {
      itemCount: 1,
      limit: 1,
      pageCount: 1,
      page: 0,
      links: links,
    };

    expect(
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      )
    ).toEqual(metaData);
  });

  it("should return correct links when the page is in the middle", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = 1;
    const limit = 1;
    const maxPageIndex = 2;
    const itemCount = 3;

    const links = {
      self: `${baseUrl}?page=1&limit=${limit}`,
      first: `${baseUrl}?page=0&limit=${limit}`,
      previous: `${baseUrl}?page=0&limit=${limit}`,
      next: `${baseUrl}?page=2&limit=${limit}`,
      last: `${baseUrl}?page=2&limit=${limit}`,
    };

    const metaData = {
      itemCount: 3,
      limit: 1,
      pageCount: 3,
      page: 1,
      links: links,
    };

    expect(
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      )
    ).toEqual(metaData);
  });

  it("should all links should be unique when they should be", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = 2;
    const limit = 1;
    const maxPageIndex = 4;
    const itemCount = 5;

    const links = {
      self: `${baseUrl}?page=2&limit=${limit}`,
      first: `${baseUrl}?page=0&limit=${limit}`,
      previous: `${baseUrl}?page=1&limit=${limit}`,
      next: `${baseUrl}?page=3&limit=${limit}`,
      last: `${baseUrl}?page=4&limit=${limit}`,
    };

    const metaData = {
      itemCount: 5,
      limit: 1,
      pageCount: 5,
      page: 2,
      links: links,
    };

    expect(
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      )
    ).toEqual(metaData);
  });

  it("should return correct links even if pageIndex > maxPageIndex", () => {
    const baseUrl = "/api/seasons/123/rankings";
    const pageIndex = 6;
    const limit = 1;
    const maxPageIndex = 5;
    const itemCount = 6;

    const links = {
      self: `${baseUrl}?page=${pageIndex}&limit=${limit}`,
      first: `${baseUrl}?page=0&limit=${limit}`,
      previous: null,
      next: null,
      last: `${baseUrl}?page=${maxPageIndex}&limit=${limit}`,
    };

    const metaData = {
      itemCount: 6,
      limit: limit,
      pageCount: 6,
      page: 6,
      links: links,
    };
    expect(
      generatePaginationMetaData(
        baseUrl,
        pageIndex,
        limit,
        maxPageIndex,
        itemCount
      )
    ).toEqual(metaData);
  });
});

describe("paginateArray", () => {
  it("should return empty array if the array is empty", () => {
    const array = [];
    const pageSize = 0;
    const pageNumber = 0;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([]);
  });

  it("should return empty array if the array is empty with invalid pageSize", () => {
    const array = [];
    const pageSize = -1;
    const pageNumber = 0;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([]);
  });

  it("should return empty array if the array is empty with invalid pageNumber", () => {
    const array = [];
    const pageSize = 0;
    const pageNumber = -123;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([]);
  });

  it("should return empty array if the array is empty with invalid pageSize and pageNumber", () => {
    const array = [];
    const pageSize = 132242;
    const pageNumber = 123;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([]);
  });

  it("should return empty array if the array is empty with invalid pageSize and pageNumber", () => {
    const array = [];
    const pageSize = 132242;
    const pageNumber = 123;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([]);
  });

  it("should return empty array if the array is exist but filled with invalid pageSize and pageNumber", () => {
    const array = [1, 2, 3];
    const pageSize = 132242;
    const pageNumber = 123;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([]);
  });

  it("should return empty array if the array is exist but filled with invalid pageSize and pageNumber", () => {
    const array = [1, 2, 3];
    const pageSize = -1;
    const pageNumber = 2;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([]);
  });

  it("should return empty array if the array is exist but filled with invalid pageSize and pageNumber", () => {
    const array = [1, 2, 3];
    const pageSize = 0;
    const pageNumber = 2;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([]);
  });

  // do note that while page number being negative do work,
  // in Session getSeasonRankingsByPagination,
  // we do not accept negative page number
  it("should return correct paginated data even if pageNumber is negative", () => {
    const array = [1, 2, 3, 4, 5];
    const pageSize = 1;
    const pageNumber = -2;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([4]);
  });

  it("should return correct paginated data", () => {
    const array = [1, 2, 3];
    const pageSize = 1;
    const pageNumber = 2;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([3]);
  });

  it("should return correct paginated data", () => {
    const array = [1, 2, 3];
    const pageSize = 2;
    const pageNumber = 0;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([1, 2]);
  });

  it("should return correct paginated data", () => {
    const array = [1, 2, 3, 4, 5];
    const pageSize = 2;
    const pageNumber = 1;

    expect(paginateArray(array, pageSize, pageNumber)).toEqual([3, 4]);
  });
});
