import { Column, SelectColumn, textEditor } from "react-data-grid";
import {
  CheckBoxCell,
  SelectShowCell,
  SelectCell,
  DateShowCell,
  DateEditCell,
  NumEditCell,
} from "./CellsComponents";
import { SelectArrType } from "../../lib/arrList";
import { CloseOutlined, EditTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import {
  CheckboxFilter,
  DateFilter,
  InputFilter,
  NumberFilter,
  SelectFilter,
} from "./FilterCells";

export type DataType = ["string", "number", "boolean", "date", "select"]

export interface AdjustColumn extends Column<any> {
  type: DataType[number];
  primary?: boolean;
  optlist?: SelectArrType[];
  value?: string | number | boolean | Date | null;
}

const RowIDColumn: Column<any> = {
  key: "rowID",
  name: "STT",
  width: "50px",
  headerCellClass: "rtd-header-text",
  cellClass: "rtd-text",
};

const EditButtonColumn: (
  func1: (x: any) => void,
  func2: (x: any) => void,
  show: (x: any) => boolean
) => Column<any> = (takeEditRow, takeDeleteRow, show) => ({
  key: "editButton",
  name: "Điều chỉnh",
  width: "100px",
  headerCellClass: "rtd-header-text",
  cellClass: "rtd-text",
  renderCell: (params) => {
    if (show(params.row))
      return (
        <>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => takeEditRow(params.row)}
          >
            <EditTwoTone />
          </Button>
          <Button
            size="small"
            color="danger"
            variant="outlined"
            onClick={() => takeDeleteRow(params.row)}
          >
            <CloseOutlined />
          </Button>
        </>
      );
  },
});

const adjustColumn = (column: AdjustColumn, mode: string): Column<any, any> => {
  const { key, name, type, width, optlist, editable } = column;
  const baseColumn: Column<any, any> = {
    key,
    name,
    editable: mode == "editrow" ? editable : false,
    width,
    headerCellClass: "rtd-header-text",
    cellClass: ["boolean", "date"].includes(type)
      ? "rtd-text"
      : type == "number"
      ? "rtd-number"
      : null,
  };

  switch (type) {
    case "string":
      return {
        ...baseColumn,
        renderEditCell: textEditor,
        renderSummaryCell: () => InputFilter(key),
      };
    case "number":
      return {
        ...baseColumn,
        renderEditCell: (p) => NumEditCell(p),
        renderSummaryCell: () => NumberFilter(key),
      };
    case "boolean":
      return {
        ...baseColumn,
        renderCell: (p) => CheckBoxCell(p),
        renderSummaryCell: () => CheckboxFilter(key),
      };
    case "date":
      return {
        ...baseColumn,
        renderCell: (p) => DateShowCell(p),
        renderEditCell: (p) => DateEditCell(p),
        renderSummaryCell: () => DateFilter(key),
      };
    case "select":
      return {
        ...baseColumn,
        renderCell: (p) => SelectShowCell(p, optlist || []),
        renderEditCell: (p) => SelectCell(p, optlist || []),
        renderSummaryCell: () => SelectFilter(key, optlist || []),
      };
  }
};

const cols = (columns: AdjustColumn[], mode: string) =>
  columns.filter((i) => i.name).map((i) => adjustColumn(i, mode));

export const adjustColumns: (
  columns: AdjustColumn[],
  mode: string,
  takeEditRow?: any,
  takeDeleteRow?: any,
  show?: any
) => Column<any, any>[] = (
  columns,
  mode,
  takeEditRow?,
  takeDeleteRow?,
  show?
) =>
  mode == "editrow"
    ? [SelectColumn, RowIDColumn, ...cols(columns, mode)]
    : mode == "editform"
    ? [
        EditButtonColumn(takeEditRow, takeDeleteRow, show),
        ...cols(columns, mode),
      ]
    : mode == "choose"
    ? [RowIDColumn, ...cols(columns, mode)]
    : mode == "multiselect"
    ? [SelectColumn, RowIDColumn, ...cols(columns, mode)]
    : [];
