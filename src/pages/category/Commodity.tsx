import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import DataList from "../../component/DataList";
import CommodityTYPE, { columns } from "../../types/Commodity";
import JobModeTYPE, { JobModeCol_Commodity } from "../../types/JobMode";
import { Helmet } from "react-helmet";
import loadData from "../../lib/LoadTable";

const category = "commodities";
const category2 = "job-modes";

export default function ContainerSize() {
  const [rows, setRows] = useState([]);
  const [jobModeRows, setJobModeRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateStatus2, setUpdateStatus2] = useState(false)

  useEffect(() => {
    loadData(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);

  useEffect(() => {
    loadData(category2, JobModeCol_Commodity, setJobModeRows);
    setUpdateStatus(false);
  }, [updateStatus2]);

  return (
    <div style={{ padding: 10, height: "100%" }}>
      <Helmet>
        <title>Hateco - Danh mục kích cỡ</title>
      </Helmet>
      <Row
        gutter={10}
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Col span={24} md={7}>
          <DataList<JobModeTYPE>
            tableMode="choose"
            category={category2}
            columns={JobModeCol_Commodity}
            exRows={jobModeRows}
            setUpdateStatus={setUpdateStatus2}
            updateStatus={updateStatus2}
            buttonList={[
              "save"
            ]}
          />
        </Col>
        <Col span={24} md={17}>
          <DataList<CommodityTYPE>
            tableMode="editrow"
            category={category}
            columns={columns}
            exRows={rows}
            setUpdateStatus={setUpdateStatus}
            updateStatus={updateStatus}
            buttonList={[
              "add",
              "delete",
              "save",
              "template",
              "upload",
              "download",
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}
