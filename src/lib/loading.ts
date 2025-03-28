import Operations from "../types/Operation";
import { Port } from "../types/Port";
import { fetchData } from "./api";
import { SelectArrType } from "./arrList";

export const loadDataSelect = async (category: string) => {
  let list: SelectArrType[] = [];
  const data = await fetchData(category);
  list = data.map((item: Operations & Port) => ({
    value: item.operationCode ?? item.portCode,
    label: item.operationName ?? item.portName
  }));
  return list;
};
