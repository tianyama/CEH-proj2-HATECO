import { Checkbox, Select, DatePicker, InputNumber } from "antd";
import { RenderCellProps, RenderEditCellProps } from "react-data-grid";
import { paramData, changeValue } from "../../lib/updateTable";
import { SelectArrType } from "../../lib/arrList";
import { AdjustColumn } from "./column";
import dayjs from "dayjs";

export const CheckBoxCell = (
  columns: AdjustColumn[],
  params: RenderCellProps<any>,
  changeRows: Set<string>,
  rowOLD: any[]
) => (
  <Checkbox
    defaultChecked={Boolean(paramData(params))}
    onChange={(e) => {
      changeValue(e.target.checked, params, columns, changeRows, rowOLD);
    }}
  />
);

export const SelectShowCell = (
  params: RenderCellProps<any>,
  optList: SelectArrType[]
) => <span>{optList.find((i) => i.value == paramData(params))?.label}</span>;

export const SelectCell = (
  columns: AdjustColumn[],
  params: RenderEditCellProps<object>,
  optList: SelectArrType[],
  changeRows: Set<string>,
  rowOLD: any[]
) => (
  <Select
    options={optList}
    showSearch
    optionFilterProp="label"
    defaultValue={paramData(params)}
    style={{ width: "100%" }}
    onChange={(value) =>
      changeValue(value, params, columns, changeRows, rowOLD)
    }
  />
);

export const DateShowCell = (params: RenderCellProps<any>) => (
  <span>
    {new Date(paramData(params))
      .toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replaceAll("/", "-")}
  </span>
);

export const DateEditCell = (
  columns: AdjustColumn[],
  params: RenderEditCellProps<any>,
  changeRows: Set<string>,
  rowOLD: any[]
) => (
  <DatePicker
    defaultValue={dayjs(paramData(params))}
    style={{ width: "100%", textAlign: "center" }}
    format={"YYYY-MM-DD HH:mm:ss"}
    showTime={{ format: "HH:mm:ss" }}
    onChange={(date) => {
      const value = date.toISOString() as unknown as Date;
      changeValue(value, params, columns, changeRows, rowOLD);
    }}
  />
);

export const NumEditCell = (
  columns: AdjustColumn[],
  params: RenderEditCellProps<any>,
  changeRows: Set<string>,
  rowOLD: any[]
) => (
  <InputNumber
    defaultValue={paramData(params)}
    style={{ width: "100%", textAlign: "center" }}
    onChange={(value) => {
      changeValue(value, params, columns, changeRows, rowOLD);
    }}
  />
);
