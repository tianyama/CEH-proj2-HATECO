import { AdjustColumn } from "../component/ui/column";
import { RowsChangeData } from "react-data-grid";

export const newRow = (columns: AdjustColumn[], rows: object[], i: number) => ({
  _id: "New" + (rows.length + i + 1).toString(),
  rowID: rows.length + i + 1,
  ...columns.reduce((acc, col) => ({ ...acc, [col.key]: col.value }), {}),
});

export const addRow = (
  columns: AdjustColumn[],
  number_rows: number,
  rows: object[],
  newRow: (columns: AdjustColumn[], rows: object[], i: number) => object,
  setRows: (row: object[]) => void,
  setAddRowDialog: (dialog: boolean) => void
) => {
  const newRows = [];
  for (let i = 0; i < number_rows; i++) {
    newRows.push(newRow(columns, rows, i));
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

export const editRow = (
  columns: AdjustColumn[],
  updatedRows: any[],
  changes: RowsChangeData<any>,
  rowsOLD: any[],
  changeRows: Set<string>,
  setRows: (row: object[]) => void
) => {
  setRows(updatedRows);
  changes.indexes.forEach((index) => {
    unChangedRow(rowsOLD, updatedRows[index], changeRows, columns);
  });
};

/* export const updateTable = async (
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
 */
