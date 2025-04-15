import {
  Col,
  Form,
  DatePicker,
  Select,
  Checkbox,
  Row,
  Input,
  InputNumber,
  Space,
} from "antd";
import dayjs from "dayjs";
import { SelectArrType } from "../../lib/arrList";
import React from "react";

interface FormElementProps {
  type: string;
  name: string;
  label?: string | React.ReactNode;
  width?: number;
  col?: number;
  value?: any;
  required?: boolean;
  disabled?: boolean;
  optlist: SelectArrType[];
  handleCheck: () => void;
}

const { Search } = Input;

interface SelTableElementProps {
  value: any;
  handleCheck: () => void;
}

const formProps = (
  name: string,
  label: string | React.ReactNode,
  type?: string,
  required?: boolean,
  value?: any
) => ({
  name,
  label,
  style: { marginBottom: 10, width: "100%" },
  rules: [{ required, message: "Vui lòng nhập " }],
  initialValue: value,
  getValueProps: (value) =>
    type == "date" ? { value: value ? dayjs(value) : dayjs(Date()) } : value,
});

export const SelectTable = ({ handleCheck, value }: SelTableElementProps) => (
  <Space.Compact style={{ width: "100%" }}>
    <Search allowClear onSearch={handleCheck} readOnly value={value} />
  </Space.Compact>
);

export const FormElement = ({
  type,
  name,
  label,
  value,
  disabled,
  width,
  col,
  optlist,
  required,
  handleCheck,
}: FormElementProps) => (
  <Col span={width ?? 12}>
    <Form.Item {...formProps(name, label, type, required, value)}>
      {type === "date" ? (
        <DatePicker
          disabled={disabled}
          title="Từ ngày"
          style={{ width: "100%", textAlign: "center" }}
          format={"YYYY-MM-DD HH:mm:ss"}
          showTime={{ format: "HH:mm:ss" }}
        />
      ) : type === "select" ? (
        <Select
          disabled={disabled}
          options={optlist}
          showSearch
          optionFilterProp="label"
          allowClear
        />
      ) : type === "checkbox" ? (
        <Checkbox.Group>
          <Row gutter={[8, 12]}>
            {optlist?.map((i) => (
              <Col span={col ?? 12}>
                <Checkbox value={i.value}>{i.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ) : type === "seltable" ? (
        <SelectTable handleCheck={handleCheck} value={value} />
      ) : type === "number" ? (
        <InputNumber style={{ width: "100%" }} min={0} disabled={disabled} />
      ) : (
        <Input disabled={disabled} />
      )}
    </Form.Item>
  </Col>
);
