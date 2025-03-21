import { Checkbox, Select, DatePicker, InputNumber } from "antd";
import { RenderCellProps, RenderEditCellProps } from "react-data-grid";
import { paramData, changeValue } from "../../lib/updateTable";
import { SelectArrType } from "../../lib/arrList";
import dayjs from "dayjs";

export const CheckBoxCell = (
  params: RenderCellProps<any>,
) => (
  <Checkbox
    defaultChecked={Boolean(paramData(params))}
    onChange={(e) => {
      params.onRowChange({ ...params.row, [params.column.key]: e.target.checked })
    }}
  />
);

export const SelectShowCell = (
  params: RenderCellProps<any>,
  optList: SelectArrType[]
) => <span>{optList.find((i) => i.value == paramData(params))?.label}</span>;

export const SelectCell = (
  params: RenderEditCellProps<object>,
  optList: SelectArrType[],
) => (
  <Select
    options={optList}
    showSearch
    optionFilterProp="label"
    defaultValue={paramData(params)}
    style={{ width: "100%" }}
    onChange={(value) =>{
      params.onRowChange({ ...params.row, [params.column.key]: value }, true)
    }}
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
  params: RenderEditCellProps<any>,
) => (
  <DatePicker
    defaultValue={dayjs(paramData(params))}
    style={{ width: "100%", textAlign: "center" }}
    format={"YYYY-MM-DD HH:mm:ss"}
    showTime={{ format: "HH:mm:ss" }}
    onChange={(date) => {
      if (params.column.key == "expireDate") {
        if (date < dayjs(params.row.applyDate)) {
          alert('Ngày hết hạn phải lớn hơn ngày hiệu lực')
          return
        }
      }
      const value = date.toISOString() as unknown as Date;
      params.onRowChange({ ...params.row, [params.column.key]: value }, true);
    }}
  />
);

export const NumEditCell = (
  params: RenderEditCellProps<any>,
) => (
  <InputNumber
    defaultValue={paramData(params)}
    style={{ width: "100%", textAlign: "center" }}
    onChange={(value) => {
      changeValue(value, params, columns, changeRows, rowOLD);
    }}
  />
);

