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
  width: "50px",
  headerCellClass: "rtd-header-text",
  cellClass: "rtd-text",
  sortable: false,
};

const adjustColumn = (column: AdjustColumn): Column<any> => {
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
        renderCell: (params) => CheckBoxCell(params),
      };
    case "date":
      return {
        ...baseColumn,
        renderCell: (params) => DateShowCell(params),
        renderEditCell: (params) => DateEditCell(params),
      };
    case "select":
      return {
        ...baseColumn,
        renderCell: (params) => SelectShowCell(params, column.optlist || []),
        renderEditCell: (params) => SelectCell(params, column.optlist || []),
      };
  }
  return baseColumn;
};

export const adjustColumns: (columns: AdjustColumn[]) => Column<any>[] = (
  columns
) => [SelectColumn, RowIDColumn, ...columns.map((item) => adjustColumn(item))];
