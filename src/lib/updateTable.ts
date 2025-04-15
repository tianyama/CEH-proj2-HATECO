import { AdjustColumn } from "../component/ui/column";
import { RowsChangeData } from "react-data-grid";
import type RowTypes from "../types/RowTypes";
import {
  batchAddItem,
  batchDeleteItem,
  batchUpdateItem,
  updateItem,
} from "../lib/api";
import { MessageInstance } from "antd/es/message/interface";
import { checkSame, findRow } from "./function";

export function addRow<T extends RowTypes>(
  columns: AdjustColumn[],
  number_rows: number,
  rows: T[],
  setRows: (row: T[]) => void,
  setAddRowDialog: (dialog: boolean) => void
) {
  const newRows = [];
  for (const i of Array(number_rows).keys()) {
    newRows.push({
      _id: "New" + (rows.length + Number(i) + 1).toString(),
      rowID: rows.length + Number(i) + 1,
      ...columns.reduce(
        (acc, { key, value }) => ({ ...acc, [key]: value }),
        {}
      ),
    } as unknown as T);
  }
  setRows([...rows, ...newRows]);
  setAddRowDialog(false);
}

export function editRow<T extends RowTypes>(
  columns: AdjustColumn[],
  updatedRows: T[],
  rows: T[],
  { column, indexes }: RowsChangeData<T>,
  messageApi: MessageInstance
) {
  const primaryCols = columns.filter(({ primary }) => primary);
  const editRows = indexes.map((i) => {
    const rowNEW = updatedRows[i];
    if (
      primaryCols.some(({ key }) => key === column.key) &&
      rows.some((row) => checkSame(primaryCols, rowNEW, row))
    ) {
      messageApi.error("Dữ liệu đã tồn tại trong bảng");
      return rows;
    }
    rowNEW.isEdit = true;
    const { rowID, ...res } = rowNEW;
    return res;
  });
  return rows.map((row) => ({ ...row, ...findRow(editRows, row._id) }));
}

export async function deleteRow<T extends RowTypes>(
  category: string,
  rows: T[],
  selectRows: Set<string>
) {
  const rowlist = [...selectRows];
  const resNewRows = rows.filter(
    ({ _id }) => !rowlist.includes(_id) && _id.includes("New")
  );
  const deleteRows = rows.filter(
    ({ _id }) => rowlist.includes(_id) && !_id.includes("New")
  );
  const deleteRes = await batchDeleteItem(category, deleteRows);
  const errDelete = deleteRes.errors.length
    ? "Không thể xóa các dòng: " +
      deleteRes.errors.map((x) => x.rowID).join(", ")
    : 0;
  return { errDelete, resNewRows };
}

export async function updateData<T extends RowTypes>(
  category: string,
  newRows: T[],
  updateRows: T[]
) {
  const addRes = await batchAddItem(category, newRows);
  const updateRes = await batchUpdateItem(category, updateRows);
  const res = [];
  const errAdd = addRes.errors.length
    ? "Không thể thêm các dòng: " + addRes.errors.map((x) => x.rowID).join(", ")
    : undefined;
  const errUpdate = updateRes.errors.length
    ? "Không thể cập nhật các dòng: " +
      updateRes.errors.map(({rowID}) => rowID).join(", ")
    : undefined;
  if (errAdd) res.push(errAdd);
  if (errUpdate) res.push(errUpdate);
  return res;
}

export async function updateForm<T extends RowTypes>(
  updatedRow: T,
  category: string,
  rows: T[],
  setRows: (x: T[]) => void,
  messageApi: MessageInstance
) {
  const temp = rows.map((item) =>
    item._id == updatedRow._id ? updatedRow : item
  );
  const { _id, rowID, ...rowData } = updatedRow;
  try {
    await updateItem(category, _id, rowData);
    messageApi.success("Đã cập nhật!");
    setRows(temp);
  } catch (error) {
    messageApi.error("Có lỗi xảy ra khi cập nhật dữ liệu");
  }
}
