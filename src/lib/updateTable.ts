import { AdjustColumn } from "../component/ui/column";
import { batchAddItem, batchUpdateItem } from "./api";
import {
  RenderCellProps,
  RenderEditCellProps,
  RowsChangeData,
} from "react-data-grid";

export const newRow = (rows: object[], i: number) => ({
  _id: "New" + (rows.length + i + 1).toString(),
  rowID: rows.length + i + 1,
});

export const paramData = (
  params: RenderEditCellProps<any> | RenderCellProps<any>
) => params.row[params.column.key];

export const addRow = (
  number_rows: number,
  rows: object[],
  newRow: (rows: object[], i: number) => object,
  setRows: (row: object[]) => void,
  setAddRowDialog: (dialog: boolean) => void
) => {
  const newRows = [];
  for (let i = 0; i < number_rows; i++) {
    newRows.push(newRow(rows, i));
  }
  setRows([...rows, ...newRows]);
  setAddRowDialog(false);
};

const unChangedRow = (
  rowsOLD: any[],
  rowNEW: any,
  changeRows: Set<string>,
  columns: AdjustColumn[]
) => {
  const rowOLD = rowsOLD.find((i) => i._id == rowNEW._id);
  if (rowOLD) {
    for (const x in columns) {
      if (rowNEW[columns[x].key] != rowOLD[columns[x].key]) {
        changeRows.add(rowNEW._id);
        return;
      }
    }
    changeRows.delete(rowNEW._id);
  }
};

export const changeValue = (
  value: string | number | boolean | Date | null,
  params: RenderEditCellProps<any> | RenderCellProps<any>,
  columns: AdjustColumn[],
  changeRows: Set<string>,
  rowsOLD: any[]
) => {
  params.row[params.column.key] = value;
  unChangedRow(rowsOLD, params.row, changeRows, columns);
};

export const editRow = (
  columns: AdjustColumn[],
  updatedRows: any[],
  changes: RowsChangeData<any>,
  rows: any[],
  rowsOLD: any[],
  changeRows: Set<string>,
  setRows: (row: object[]) => void
) => {
  const newData = [...rows];
  changes.indexes.forEach((index) => {
    newData[index] = updatedRows[index];
    unChangedRow(rowsOLD, updatedRows[index], changeRows, columns);
  });
  setRows(newData);
};

export const updateTable = async (
  category: string,
  rows: any[],
  changeRows: Set<string>
) => {
  const addData = rows
    .filter((item) => item._id.includes("New"))
    .map((row) => {
      const { _id, ...rowData } = row;
      return { id: _id, data: rowData };
    });
  await batchAddItem(category, addData);
  const updateData = rows
    .filter((item) => changeRows.has(item._id))
    .map((row) => {
      const { _id, ...rowData } = row;
      return { id: _id, data: rowData };
    });
  await batchUpdateItem(category, updateData);
};
