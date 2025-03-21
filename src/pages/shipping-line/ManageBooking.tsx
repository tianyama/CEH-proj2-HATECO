import { useState } from "react";
import { Col, Row } from "antd";
import DataList from "../../component/DataList";
import { columns } from "../../types/Booking";
import { Helmet } from 'react-helmet'
import BookingForm from "../../component/BookingForm";

export default function ManageBooking () {
  return (
    <div style={{ padding: 10 }}>
    <Helmet><title>Hateco - Danh mục kích cỡ</title></Helmet>
    <Row gutter={10}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Col span={8}>
        <BookingForm/>
      </Col>
      <Col span={16}>
        <DataList
          category="booking"
          columns={columns}
          buttonList={[]}
        />
      </Col>
    </Row>
    </div>
  );
}