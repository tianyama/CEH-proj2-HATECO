import { Checkbox, Select, DatePicker, InputNumber } from "antd";
import { RenderCellProps, RenderEditCellProps } from "react-data-grid";
import { SelectArrType } from "../../lib/arrList";
import dayjs from "dayjs";

export const CheckBoxCell = (
  { row, column, onRowChange }: RenderCellProps<any>,
) => (
  <Checkbox
    defaultChecked={Boolean(row[column.key])}
    onChange={(e) => {
      onRowChange({ ...row, [column.key]: e.target.checked })
    }}
  />
);

export const SelectShowCell = (
  { row, column }: RenderCellProps<any>,
  optList: SelectArrType[]
) => <span>{optList.find((i) => i.value == row[column.key])?.label}</span>;

export const SelectCell = (
  { row, column, onRowChange }: RenderEditCellProps<any>,
  optList: SelectArrType[],
) => (
  <Select
    options={optList}
    showSearch
    optionFilterProp="label"
    defaultValue={row[column.key]}
    style={{ width: "100%" }}
    onChange={(value) =>{
      onRowChange({ ...row, [column.key]: value }, true)
    }}
  />
);

export const DateShowCell = ({ row, column }: RenderCellProps<any>) => (
  <span>
    {new Date(row[column.key])
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
  { row, column, onRowChange }: RenderEditCellProps<any>,
) => (
  <DatePicker
    defaultValue={dayjs(row[column.key])}
    style={{ width: "100%", textAlign: "center" }}
    format={"YYYY-MM-DD HH:mm:ss"}
    showTime={{ format: "HH:mm:ss" }}
    onChange={(date) => {
      if (column.key == "expireDate") {
        if (date < dayjs(row.applyDate)) {
          alert('Ngày hết hạn phải lớn hơn ngày hiệu lực')
          return
        }
      }
      onRowChange({ ...row, [column.key]: date.toISOString() }, true);
    }}
  />
);

export const NumEditCell = (
  { row, column, onRowChange }: RenderEditCellProps<any>,
) => (
  <InputNumber
    defaultValue={row[column.key]}
    style={{ width: "100%", textAlign: "center" }}
    onChange={(value) => {
      onRowChange({ ...row, [column.key]: value }, true);
    }}
  />
);

