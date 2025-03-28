import { Col, Row } from "antd";
import DataList from "../../component/DataList";
import { columns } from "../../types/Booking";
import { Helmet } from 'react-helmet'
import BookingForm from "../../component/BookingForm";
import { useState } from "react";

export default function ManageBooking () {
    const [query, getQuery] = useState("");
  
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
        <BookingForm getParam={getQuery}/>
      </Col>
      <Col span={16}>
        <DataList
          category="booking"
          columns={columns}
          buttonList={[]}
          tableMode="editform"
          query={query}
        />
      </Col>
    </Row>
    </div>
  );
}