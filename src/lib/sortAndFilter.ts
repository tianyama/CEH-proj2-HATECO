import { SortColumn } from "react-data-grid";
import { AdjustColumn, DataType } from "../component/ui/column";
import { dateTime, findLabel, isCase, isSearch } from "./function";
import dayjs, { Dayjs } from "dayjs";

export const filterVal = (type: DataType) => {
  switch (type) {
    case "boolean":
      return null;
    case "number":
      return {
        mode: true,
        eqop: true,
        minop: false,
        maxop: false,
        equal: [],
        min: null,
        max: null,
      };
    case "select":
      return { mode: true, text: [] };
    case "date":
      return {
        mode: true,
        eqop: true,
        minop: false,
        maxop: false,
        equal: [],
        min: null,
        max: null,
        time: false,
      };
    default:
      return { mode: 1, text: [], aA: true };
  }
};

type Comparator = (a: any, b: any) => number;

function getComparator({ key, type, optlist }: AdjustColumn): Comparator {
  switch (type) {
    case "boolean":
    case "number":
      return (a, b) => a[key] - b[key];
    case "date":
      return (a, b) => Number(dayjs(a[key])) - Number(dayjs(b[key]));
    case "select":
      return (a, b) =>
        findLabel(optlist!, a[key])!.localeCompare(
          findLabel(optlist!, b[key])!
        );
    default:
      return (a, b) => a[key].localeCompare(b[key]);
  }
}

export function sortFunc<A>(
  a: A,
  b: A,
  sortColumns: readonly SortColumn[],
  columns: AdjustColumn[]
) {
  for (const { columnKey, direction } of sortColumns) {
    const col = columns.find(({ key }) => key == columnKey);
    const comparator = getComparator(col!);
    const compResult = comparator(a, b);
    if (compResult !== 0) {
      return direction === "ASC" ? compResult : -compResult;
    }
  }
  return 0;
}

type FilterRange = {
  mode: boolean;
  equal: (string | number | Dayjs)[];
  eqop: boolean;
  min: number | Dayjs | null;
  max: number | Dayjs | null;
  minop: boolean;
  maxop: boolean;
};

type FilterString = {
  mode: number;
  text: string[];
  aA: boolean;
};

function compareRange(
  item: number | Dayjs | string,
  { mode, equal, eqop, min, max, minop, maxop }: FilterRange
) {
  const checkMin = min === null ? true : item > min || (item == min && minop);
  const checkMax = max === null ? true : item < max || (item == max && maxop);
  const checkEqual = !equal.length ? true : equal.includes(item) == eqop;
  return mode ? checkEqual : checkMin && checkMax;
}

function compareString(item: string, { mode, text, aA }: FilterString) {
  if (!text.length) return true;
  const isEqual = text.some((t: string) => isCase(item, aA) == isCase(t, aA));
  const isInclude = text.some((t: string) =>
    isCase(item, aA).includes(isCase(t, aA))
  );
  const isStart = text.some((t: string) =>
    isCase(item, aA).startsWith(isCase(t, aA))
  );
  const isEnd = text.some((t: string) =>
    isCase(item, aA).endsWith(isCase(t, aA))
  );
  switch (Math.abs(mode)) {
    case 1:
      return isEqual == mode > 0;
    case 2:
      return isInclude == mode > 0;
    case 3:
      return isStart == mode > 0;
    case 4:
      return isEnd == mode > 0;
    default:
      return true;
  }
}

export function search<A>(r: A, columns: AdjustColumn[], searchText: string) {
  if (!searchText) return true;
  return columns.some(({ key, type, optlist }) => {
    const item = r[key as keyof A] ?? undefined;
    if (item === undefined) return false;
    if (type == "select")
      return isSearch(findLabel(optlist!, item) as string, searchText);
    else if (type != "boolean") return isSearch(item.toString(), searchText);
  });
}

export function filterFunc<A>(r: A, columns: AdjustColumn[], filters: any) {
  return columns.every(({ key, type }) => {
    const item = r[key as keyof A] ?? undefined;
    const filter = filters[key];
    if (item === undefined) return false;
    if (filter === null) return true;
    switch (type) {
      case "select":
        return filter.text.length
          ? filter.mode == filter.text.includes(item)
          : true;
      case "boolean":
        return item == filter;
      case "date":
        return compareRange(
          dateTime(dayjs(item as string), filter.time),
          filter
        );
      case "number":
        return compareRange(Number(item), filter);
      default:
        return compareString(item.toString(), filter);
    }
  });
}
