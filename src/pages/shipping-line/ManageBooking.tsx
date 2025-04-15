import { Col, Row } from "antd";
import DataList from "../../component/DataList";
import { columns } from "../../types/Booking";
import { Helmet } from "react-helmet";
import BookingForm from "../../component/BookingForm";
import { useEffect, useState } from "react";
import type Booking from "../../types/Booking";
import { loadDataSelect } from "../../lib/loading";
import loadData from "../../lib/LoadTable";

const category = "booking";

export default function ManageBooking() {
  const [query, getQuery] = useState("");
  const [segment, setSegment] = useState("Tra cứu");
  const [newRows, setNewRows] = useState<Booking[]>([]);
  const [rows, setRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData(category, columns, setRows, query);
    setUpdateStatus(false);
  }, [updateStatus, query]);
  useEffect(() => {
    const loadCompanyList = async () => {
      columns[5].optlist = await loadDataSelect("operations");
    };
    loadCompanyList();
  }, []);
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Hateco - Danh mục kích cỡ</title>
      </Helmet>
      <Row
        gutter={10}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Col span={8}>
          <BookingForm
            segment={segment}
            setSegment={setSegment}
            getParam={getQuery}
            getNewRow={(row) => setNewRows([...newRows, row])}
          />
        </Col>
        <Col span={16}>
          <DataList
            category={category}
            columns={columns}
            exRows={segment == "Tra cứu" ? rows : newRows}
            setUpdateStatus={setUpdateStatus}
            updateStatus={updateStatus}
            tableMode="editform"
            query={query}
          />
        </Col>
      </Row>
    </div>
  );
}
