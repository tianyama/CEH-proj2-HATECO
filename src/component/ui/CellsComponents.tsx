import { Checkbox, Select, DatePicker, InputNumber } from "antd";
import { RenderCellProps, RenderEditCellProps } from "react-data-grid";
import { SelectArrType } from "../../lib/arrList";
import dayjs from "dayjs";
import { findLabel } from "../../lib/function";
import { useState } from "react";

export const CheckBoxCell = ({
  row,
  column: { key },
  onRowChange,
}: RenderCellProps<any>) => (
  <Checkbox
    defaultChecked={Boolean(row[key])}
    onChange={({ target }) => {
      onRowChange({ ...row, [key]: target.checked });
    }}
  />
);

export const SelectShowCell = (
  { row, column: { key } }: RenderCellProps<any>,
  optList: SelectArrType[]
) => <span>{findLabel(optList, row[key])}</span>;

export const SelectCell = (
  { row, column: { key }, onRowChange }: RenderEditCellProps<any>,
  optList: SelectArrType[]
) => (
  <Select
    options={optList}
    showSearch
    variant="borderless"
    optionFilterProp="label"
    defaultValue={row[key]}
    style={{ width: "100%" }}
    onChange={(value) => {
      onRowChange({ ...row, [key]: value }, true);
    }}
  />
);

export const DateShowCell = ({
  row,
  column: { key },
}: RenderCellProps<any>) => (
  <span>
    {new Date(row[key])
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

export const DateEditCell = ({
  row,
  column: { key },
  onRowChange,
}: RenderEditCellProps<any>) => (
  <DatePicker
    variant="borderless"
    defaultValue={dayjs(row[key])}
    style={{ width: "100%", textAlign: "center" }}
    format={"YYYY-MM-DD HH:mm:ss"}
    showTime={{ format: "HH:mm:ss" }}
    onChange={(date) => {
      if (key == "expireDate") {
        if (date < dayjs(row.applyDate)) {
          alert("Ngày hết hạn phải lớn hơn ngày hiệu lực");
          return;
        }
      }
      onRowChange({ ...row, [key]: date.toISOString() }, true);
    }}
  />
);

export const NumEditCell = ({
  row,
  column: { key },
  onRowChange,
}: RenderEditCellProps<any>) => (
  <InputNumber
    defaultValue={row[key]}
    style={{ width: "100%", justifyContent: "right", textAlign: "right" }}
    variant="borderless"
    onPressEnter={() => document.activeElement?.blur()}
    onBlur={({ currentTarget: {value}}) => {
      onRowChange({ ...row, [key]: Number(value) }, true);
    }}
  />
);
