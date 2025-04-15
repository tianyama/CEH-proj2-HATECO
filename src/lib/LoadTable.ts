import { AdjustColumn } from "../component/ui/column";
import RowTypes from "../types/RowTypes";
import { fetchData } from "./api";

export default function loadData<T extends RowTypes>(
  category: string,
  columns: AdjustColumn[],
  setRows: (row: T[]) => void,
  query?: string
) {
  if (category.includes("/new")) {
    setRows([]);
  } else if ((category == "booking" || category == "size-types") && !query) {
    setRows([]);
  } else {
    fetchData(category, query).then((data) => {
      const raw = data.map(({_id, ...item}: T, index: number) => ({
        _id,
        rowID: index + 1,
        ...columns.reduce(
          (acc, { key }) => ({ ...acc, [key]: item[key as keyof Omit<T, "_id">] }),
          {}
        ),
      }));
      setRows(raw);
    });
  }
}
