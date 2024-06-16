import { isNonNegativeInteger, isPositiveInteger } from "./validator";

export interface PaginateData {
  itemCount: number;
  limit: number;
  pageCount: number;
  page: number;
  links: {
    self: string;
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  };
}

export const generatePaginationMetaData = (
  baseUrl: string,
  pageIndex: number,
  limit: number,
  itemCount: number
): PaginateData => {
  const maxPageIndex = itemCount == 0 ? 0 : Math.ceil(itemCount / limit) - 1;

  isPositiveInteger.parse(limit);
  isNonNegativeInteger.parse(pageIndex);
  isNonNegativeInteger.parse(maxPageIndex);
  isNonNegativeInteger.parse(itemCount);

  const self = `${baseUrl}?page=${pageIndex}&limit=${limit}`;
  const first = `${baseUrl}?page=0&limit=${limit}`;
  const last = `${baseUrl}?page=${maxPageIndex}&limit=${limit}`;
  let previous: string | null, next: string | null;

  if (pageIndex <= 0 || pageIndex > maxPageIndex) {
    previous = null;
  } else {
    previous = `${baseUrl}?page=${pageIndex - 1}&limit=${limit}`;
  }

  if (pageIndex >= maxPageIndex) {
    next = null;
  } else {
    next = `${baseUrl}?page=${pageIndex + 1}&limit=${limit}`;
  }

  const links = {
    self: self,
    first: first,
    previous: previous,
    next: next,
    last: last,
  };

  const metaData = {
    itemCount: itemCount,
    limit: limit,
    pageCount: Math.ceil(itemCount / limit),
    page: pageIndex,
    links: links,
  };

  return metaData;
};

// do note that while page number being negative do work,
// in Session getSeasonRankingsByPagination,
// we do not accept negative page number
export const paginateArray = (
  array: unknown[],
  pageSize: number,
  pageIndex: number
) => {
  return array.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
};
