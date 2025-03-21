import { useState } from "react";
import { bookingStatusList, SelectArrType } from "../lib/arrList";
import { Button, Col, Form, Input, Row, Segmented } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import {
  CheckboxElement,
  DateInputForm,
  InputForm,
  NumberForm,
  SelectElement,
} from "./ui/InputFormElements";
import { loadDataSelect } from "../lib/loading";

interface SelectCompanyProps {
  onCompanyChange: (company: string) => void;
}

export const companyList: SelectArrType[] = await loadDataSelect("operations");
export const portList: SelectArrType[] = await loadDataSelect("ports");
export const sizeList: SelectArrType[] = await loadDataSelect("size-types");

const BookingIOLoad = () => (
  <>
    <Row gutter={[10, 0]}>
      <DateInputForm name="BL_fromDate" label="Từ ngày" required />
      <DateInputForm name="BL_toDate" label="Đến ngày" required />
      <InputForm name="BL_bookingNo" label="Số booking" />
      <SelectElement
        name="BL_company"
        label="Hãng khai thác"
        optlist={companyList}
      />
      <InputForm name="BL_vesselKey" label="Tàu/Chuyến" width={24}/>      
      <SelectElement name="BL_pol" label="POL" optlist={portList} width={8} />
      <SelectElement name="BL_pod" label="POD" optlist={portList} width={8} />
      <SelectElement name="BL_fpod" label="FPOD" optlist={portList} width={8} />
    </Row>
    <CheckboxElement
      name="BL_bookingStatus"
      optlist={bookingStatusList}
      width={8}
    />
    <Form.Item style={{ alignItems: "center", marginTop: 20 }}>
      <Button variant="outlined" color="orange" icon={<SyncOutlined />}>
        Nạp dữ liệu
      </Button>
    </Form.Item>
  </>
);

const EmptyLoadForm = () => (
  <Row gutter={[10, 0]}>
    <DateInputForm name="EL_fromDate" label="Từ ngày" required />
    <DateInputForm name="EL_toDate" label="Đến ngày" required />
    <InputForm name="EL_bookingNo" label="Số booking" />
    <SelectElement
      name="EL_company"
      label="Hãng khai thác"
      optlist={companyList}
    />
    <SelectElement name="EL_containersize" label="Kích cỡ" optlist={sizeList} />
    <NumberForm name="EL_bookingAmount" label="Số lượng" />
    <InputForm name="EL_ookingNo" label="Số container" width={24} />
    <SelectElement name="EL_pol" label="POL" optlist={portList} width={8} />
    <SelectElement name="EL_pod" label="POD" optlist={portList} width={8} />
    <SelectElement name="EL_fpod" label="FPOD" optlist={portList} width={8} />
    <InputForm name="EL_owner" label="Chủ hàng" width={24} />
    <InputForm name="EL_note" label="Ghi chú" width={24} />
  </Row>
);

const StuffingForm = () => (
  <Row gutter={[10, 0]}>
    <DateInputForm name="S_fromDate" label="Từ ngày" required />
    <DateInputForm name="S_toDate" label="Đến ngày" required />
    <InputForm name="S_bookingNo" label="Số booking" />
    <SelectElement
      name="S_company"
      label="Hãng khai thác"
      optlist={companyList}
    />
    <SelectElement name="S_containersize" label="Kích cỡ" optlist={sizeList} />
    <NumberForm name="S_bookingAmount" label="Số lượng" />
    <InputForm name="S_bookingNo" label="Số container" width={24} />
    <SelectElement name="S_pol" label="POL" optlist={companyList} width={8} />
    <SelectElement name="S_pod" label="POD" optlist={companyList} width={8} />
    <SelectElement name="S_fpod" label="FPOD" optlist={companyList} width={8} />
    <Col span={24}>
      <Form.Item name="S_owner" label="Chủ hàng">
        <Input style={{ width: "100%" }} />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item name="S_note" label="Ghi chú">
        <Input style={{ width: "100%" }} />
      </Form.Item>
    </Col>
  </Row>
);

export default function BookingForm() {
  const [segment, setSegment] = useState("Tra cứu");
  return (
    <div
      style={{
        padding: 12,
        background: "#fff",
        minHeight: 500,
        justifyContent: "center",
      }}
      className="custom-table"
    >
      <Segmented<string>
        block
        options={["Tra cứu", "Cấp rỗng", "Đóng hàng"]}
        onChange={(value) => {
          setSegment(value); // string
        }}
      />
      <Form layout="vertical">
        {segment == "Tra cứu" ? (
          <BookingIOLoad />
        ) : segment == "Cấp rỗng" ? (
          <EmptyLoadForm />
        ) : (
          <StuffingForm />
        )}
      </Form>
    </div>
  );
}
