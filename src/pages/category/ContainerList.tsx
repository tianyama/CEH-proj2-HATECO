import { useState } from "react";
import SelectCompany from "../../component/SelectCompany";
import { Col, Row } from "antd";
import DataList from "../../component/DataList";
import { columns } from "../../types/Container";

export default function ContainerList() {
  const [selectedCompany, setSelectedCompany] = useState("");
  return (
    <Row
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Col span={7}>
        <SelectCompany onCompanyChange={setSelectedCompany} />
      </Col>
      <Col span={17}>
        <DataList
          category="containers"
          columns={columns}
          buttonList={[
            "add",
            "delete",
            "save",
            "template",
            "upload",
            "download",
          ]}
          additionalVar1={selectedCompany}
        />
      </Col>
    </Row>
  );
}
