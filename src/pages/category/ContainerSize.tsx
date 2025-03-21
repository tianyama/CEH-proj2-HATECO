import { useEffect, useState } from "react";
import SelectCompany from "../../component/SelectCompany";
import { Col, Row } from "antd";
import DataList from "../../component/DataList";
import { columns } from "../../types/Container";
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
        <Col span={7}>
          <SelectCompany
            companyList={companyList}
            onCompanyChange={(e) => {
              console.log(e);
              setSelectedCompany(e);
            }}
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
            additionalVar1={selectedCompany}
          />
        </Col>
      </Row>
    </div>
  );
}
