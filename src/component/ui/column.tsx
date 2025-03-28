import { Column, SelectColumn, textEditor } from "react-data-grid";
import {
  CheckBoxCell,
  SelectShowCell,
  SelectCell,
  DateShowCell,
  DateEditCell,
} from "./CellsComponents";
import { SelectArrType } from "../../lib/arrList";
import { CloseOutlined, EditTwoTone } from "@ant-design/icons";
import { Button } from "antd";

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
};

export const EditButtonColumn: (func: (x: any)=>void)=>Column<any> = (takeEditRow) =>
({
  key: "editButton",
  name: "Điều chỉnh",
  width: "100px",
  headerCellClass: "rtd-header-text",
  cellClass: "rtd-text",
  renderCell: (params) => (
    <>
      <Button
        size="small"
        color="primary"
        variant="outlined"
        onClick={() => takeEditRow(params.row)}
      >
        <EditTwoTone />
      </Button>
      <Button size="small" color="danger" variant="outlined">
        <CloseOutlined />
      </Button>
    </>
  ),
})

const adjustColumn = (column: AdjustColumn, mode?: string): Column<any> => {
  const baseColumn: Column<any> = {
    key: column.key,
    name: column.name,
    editable: (mode!=null) ? false : column.editable,
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

export const adjustColumns: (
  columns: AdjustColumn[],
  mode?: string,
  takeEditRow?: any
) => Column<any>[] = (columns, mode?, takeEditRow?) =>
    mode == "editform" ? [EditButtonColumn(takeEditRow), ...columns.map((item) => adjustColumn(item, mode))]
  : mode == "choose" ? [RowIDColumn, ...columns.map((item) => adjustColumn(item, mode))]
  : mode == "multiselect" ? [SelectColumn, RowIDColumn, ...columns.map((item) => adjustColumn(item, mode))]
  : [SelectColumn, RowIDColumn, ...columns.map((item) => adjustColumn(item))];
