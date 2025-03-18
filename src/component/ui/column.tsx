import { Column, SelectColumn, textEditor } from "react-data-grid";
import {
  CheckBoxCell,
  SelectShowCell,
  SelectCell,
  DateShowCell,
  DateEditCell,
} from "./CellsComponents";
import { SelectArrType } from "../../lib/arrList";

export interface AdjustColumn extends Column<any> {
  type: string;
  optlist?: SelectArrType[];
  value?: string | number | boolean | Date | null;
}

export const RowIDColumn: Column<any> = {
  key: "rowID",
  name: "STT",
  width: "5%",
  headerCellClass: "rtd-header-text",
  cellClass: "rtd-text",
};

const adjustColumn = (
  columns: AdjustColumn[],
  column: AdjustColumn,
  changeRows: Set<string>,
  rowOLD: any[]
): Column<any> => {
  const baseColumn: Column<any> = {
    key: column.key,
    name: column.name,
    editable: column.editable,
    width: column.width,
    headerCellClass: "rtd-header-text",
    cellClass: ["boolean", "date"].includes(column.type)
      ? "rtd-text"
      : column.type == "number"
      ? "rtd-number"
      : null,
  };

  switch (column.type) {
    case "string":
    case "number":
      return { ...baseColumn, renderEditCell: textEditor };
    case "boolean":
      return {
        ...baseColumn,
        renderCell: (params) =>
          CheckBoxCell(columns, params, changeRows, rowOLD),
      };
    case "date":
      return {
        ...baseColumn,
        renderCell: (params) => DateShowCell(params),
        renderEditCell: (params) =>
          DateEditCell(columns, params, changeRows, rowOLD),
      };
    case "select":
      return {
        ...baseColumn,
        renderCell: (params) => SelectShowCell(params, column.optlist || []),
        renderEditCell: (params) =>
          SelectCell(columns, params, column.optlist || [], changeRows, rowOLD),
      };
    default:
      break;
  }
  return baseColumn;
};

export const adjustColumns: (
  columns: AdjustColumn[],
  changeRows: Set<string>,
  rowsOLD: any[]
) => Column<any>[] = (columns, changeRows, rowOLD) => [
  SelectColumn,
  RowIDColumn,
  ...columns.map((item) => adjustColumn(columns, item, changeRows, rowOLD)),
];
