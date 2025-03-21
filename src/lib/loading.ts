import { fetchData } from "./api";
import { SelectArrType } from "./arrList";

export const loadDataSelect = async (category: string) => {
  let list: SelectArrType[] = [];
  const data = await fetchData(category);
  list = data.map((item: any) => ({
    value: item.operationCode ?? item.portCode ?? item.localSizetype,
    label: item.operationName ?? item.portName ?? item.localSizetype,
  }));
  list.flat();
  list;
  return list;
};
