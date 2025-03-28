import { useEffect, useState } from "react";
import SelectCompany from "../../component/SelectCompany";
import { Col, Row } from "antd";
import DataList from "../../component/DataList";
import { columns } from "../../types/ContainerSize";
import { Helmet } from "react-helmet";
import { SelectArrType } from "../../lib/arrList";
import { loadDataSelect } from "../../lib/loading";

export default function ContainerSize() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyList, setCompanyList] = useState<SelectArrType[]>([]);

  const loadCompanyList = async () => {
    setCompanyList(await loadDataSelect("operations"));
  }

  useEffect(() => {
    loadCompanyList()
  },[loadDataSelect]);

  return (
    <div style={{ padding: 10, height: "100%", }}>
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
        <Col span={7}>
          <SelectCompany
            companyList={companyList}
            onCompanyChange={setSelectedCompany}
          />
        </Col>
        <Col span={17}>
          <DataList
            category="size-types"
            columns={columns}
            buttonList={[
              "add",
              "delete",
              "save",
              "template",
              "upload",
              "download",
            ]}
            query={selectedCompany? "&operationCode=" + selectedCompany : ""}
          />
        </Col>
      </Row>
    </div>
  );
}
