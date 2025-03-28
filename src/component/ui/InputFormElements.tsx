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

interface FormElementProps {
  name: string;
  label?: string;
  width?: number;
  value?: any;
  required?: boolean;
  disabled?: boolean;
}

const { Search } = Input;

interface SelectElementProps extends FormElementProps {
  optlist: SelectArrType[];
}

interface SelTableElementProps extends FormElementProps {
  handleCheck: () => void;
}

export const InputForm = ({
  name,
  label,
  required,
  width,
  disabled,
}: FormElementProps) => (
  <Col span={width ?? 12}>
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: "Vui lòng nhập" }]}
      style={{ marginBottom: 10 }}
    >
      <Input style={{ width: "100%" }} disabled={disabled} />
    </Form.Item>
  </Col>
);

export const NumberForm = ({
  name,
  label,
  required,
  width,
  disabled,
}: FormElementProps) => (
  <Col span={width ?? 12}>
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: "Vui lòng nhập" }]}
      style={{ marginBottom: 10 }}
    >
      <InputNumber min={0} style={{ width: "100%" }} disabled={disabled} />
    </Form.Item>
  </Col>
);

export const DateInputForm = ({
  name,
  label,
  required,
  width,
  disabled,
}: FormElementProps) => (
  <Col span={width ?? 12}>
    <Form.Item
      name={name}
      label={label}
      getValueProps={(value) => ({
        value: value ? dayjs(value) : dayjs(Date()),
      })}
      rules={[{ required: required, message: "Vui lòng nhập" }]}
      style={{ marginBottom: 10 }}
    >
      <DatePicker
        disabled={disabled}
        title="Từ ngày"
        style={{ width: "100%", textAlign: "center" }}
        format={"YYYY-MM-DD HH:mm:ss"}
        showTime={{ format: "HH:mm:ss" }}
      />
    </Form.Item>
  </Col>
);

export const SelectElement = ({
  name,
  label,
  required,
  optlist,
  width,
  value,
  disabled,
}: SelectElementProps) => (
  <Col span={width ?? 12}>
    <Form.Item
      name={name}
      label={label}
      initialValue={value}
      rules={[{ required: required, message: "Vui lòng nhập" }]}
      style={{ marginBottom: 10 }}
    >
      <Select
        disabled={disabled}
        style={{ width: "100%" }}
        options={optlist}
        showSearch
        optionFilterProp="label"
      />
    </Form.Item>
  </Col>
);

export const CheckboxElement = ({
  name,
  label,
  optlist,
  width,
}: SelectElementProps) => (
  <Form.Item name={name} label={label}>
    <Checkbox.Group />
    <Row gutter={[8, 12]}>
      {optlist.map((i) => (
        <Col key={i.value} span={width ?? 12}>
          <Checkbox value={i.value}>{i.label}</Checkbox>
        </Col>
      ))}
    </Row>
  </Form.Item>
);

export const SelectTable = ({
  name,
  label,
  required,
  width,
  handleCheck,
  value,
}: SelTableElementProps) => (
  <Col span={width ?? 12}>
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: required, message: "Vui lòng nhập" }]}
      style={{ marginBottom: 10 }}
    >
      <Space.Compact style={{ width: "100%" }}>
        <Search allowClear onSearch={handleCheck} readOnly value={value} />
      </Space.Compact>
    </Form.Item>
  </Col>
);
