import dayjs, { Dayjs } from "dayjs";
import { AdjustColumn } from "../component/ui/column";
import { SelectArrType } from "./arrList";

export const findRow = (rows: any[], x: string) =>
  rows.find(({ _id }) => _id === x);

export const findLabel = (optList: SelectArrType[], val: any) =>
  optList.find((i) => i.value == val)?.label;

export const findValueOpt = (optList: SelectArrType[], val: string) =>
  optList.find((i) => i.label == val)?.value;

export const checkSame = (col: AdjustColumn[], row1: object, row2: object) =>
  col.every(
    ({ key }) => row1[key as keyof object] == row2[key as keyof object]
  );

export const dateTime = (date: Dayjs, toggle: boolean) =>
  date.format(toggle ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD")

export const isSearch = (item: string, search: string) =>
  item.toLowerCase().includes(search.toLowerCase());

export const isCase = (t: string, aA: boolean) => aA ? t : t.toLowerCase();


