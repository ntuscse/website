import { useHistory } from 'react-router-dom';
import { useCallback } from "react";
import React from "react";
import * as queryString from "querystring";
import { Button } from "payload/components/elements";
import { Chevron } from "payload/components";
import { RouterChildContext } from 'react-router';

const baseClass = 'sort-column';

interface Props {
  label: string;
  name: string;
  data: never[];
}

const SortedColumn: React.FC<Props> = (prop) => {
  const DESCENDING_SORT_PREFIX = '-';

  const {
    label, name, data
  }: Props = prop;

  // https://v5.reactrouter.com/web/api/Hooks/usehistory
  // this is the official way to use it - not sure how to fix the ESLint complaints

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const history: RouterChildContext['router']['history'] = useHistory() as RouterChildContext['router']['history'];

  const setSort = useCallback((newSort: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push({
      search: queryString.stringify(
        { sort: newSort },
        { addQueryPrefix: true } as unknown as string),
    });

    let IS_DESCENDING = true;
    if (newSort.charAt(0) == DESCENDING_SORT_PREFIX) {
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
          onClick={() => setSort(`${DESCENDING_SORT_PREFIX}${name}`)}
        >
        <Chevron />
        </Button>
      </span>
    </div>
  );
};

export default SortedColumn;
