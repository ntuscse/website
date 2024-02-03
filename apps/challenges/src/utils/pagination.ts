import { z } from 'zod';
import { isNonNegativeInteger, isPositiveInteger } from './validator';

export const generatePaginationMetaData = (baseUrl: string, pageIndex: number, limit: number, maxPageIndex: number) => {
    isPositiveInteger.parse(limit);
    isNonNegativeInteger.parse(pageIndex);
    isNonNegativeInteger.parse(maxPageIndex);

    let self = `${baseUrl}?page=${pageIndex}&limit=${limit}`
    let first = `${baseUrl}?page=0&limit=${limit}`
    let last = `${baseUrl}?page=${maxPageIndex}&limit=${limit}`
    let previous, next;

    if (pageIndex <= 0 || pageIndex > maxPageIndex){
        previous = null;
    }else {
        previous = `${baseUrl}?page=${pageIndex -1}&limit=${limit}`
    }

    if (pageIndex >= maxPageIndex) {
        next = null;
    }else{
        next = `${baseUrl}?page=${pageIndex +1}&limit=${limit}`
    }

    let links = {
        self: self,
        first: first,
        previous: previous,
        next: next,
        last: last
    }

    let metaData = {
        itemCount: (maxPageIndex + 1) * limit,
        limit: limit,
        pageCount: maxPageIndex + 1,
        page: pageIndex,
        links: links
    }

    return metaData;
}

// do note that while page number being negative do work, 
// in Session getSeasonRankingsByPagination, 
// we do not accept negative page number
export const paginateArray = (array: any[], pageSize: number, pageIndex: number) => {
    return array.slice((pageIndex) * pageSize, (pageIndex + 1) * pageSize);
}
