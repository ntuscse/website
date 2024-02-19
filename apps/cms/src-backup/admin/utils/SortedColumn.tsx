import { useHistory } from 'react-router-dom';
import { useCallback } from "react";
import React from "react";
import * as queryString from "querystring";
import { Button } from "payload/components/elements";
import { Chevron } from "payload/components";

const baseClass = 'sort-column';

interface Props {
  label: string;
  name: string;
  data: never[];
}

const SortedColumn: React.FC<Props> = (prop) => {
  const DESCENDING_SORT = '-';

  const {
    label, name, data
  }: Props = prop;

  // https://v5.reactrouter.com/web/api/Hooks/usehistory
  // this is the official way to use it - not sure how to fix the ESLint complaints

  const history = useHistory();

  const setSort = useCallback((newSort: string) => {
    let IS_DESCENDING = false;

    history.push({
      search: queryString.stringify(
        { sort: newSort },
        { addQueryPrefix: true } as unknown as string),
    });

    if (newSort.charAt(0) == DESCENDING_SORT) {
      newSort = newSort.substring(1);
      IS_DESCENDING = true;
    } else {
      IS_DESCENDING = false;
    }

    const sortFn = (a: never[], b: never[]): number => {
      if (typeof a[newSort] === 'string') {
        return IS_DESCENDING ? (b[newSort] as string).localeCompare(a[newSort] as string) : (a[newSort] as string).localeCompare(b[newSort] as string);
      }
      if (typeof a[newSort] === 'number') {
        return IS_DESCENDING ? b[newSort] - a[newSort] : a[newSort] - b[newSort]
      }
      return IS_DESCENDING ? b[newSort] - a[newSort] : a[newSort] - b[newSort]
    }
    data.sort(sortFn);
  }, [data, history]);

  return (
    <div className={baseClass}>
      <span className={`${baseClass}__label`}>{label}</span>
      <span className={`${baseClass}__buttons`}>
        <Button
          round
          buttonStyle="none"
          className={`${baseClass}__asc`}
          onClick={() => setSort(`${name}`)}
        >
        <Chevron />
        </Button>
        <Button
          round
          buttonStyle="none"
          className={`${baseClass}__desc`}
          onClick={() => setSort(`${DESCENDING_SORT}${name}`)}
        >
        <Chevron />
        </Button>
      </span>
    </div>
  );
};

export default SortedColumn;
