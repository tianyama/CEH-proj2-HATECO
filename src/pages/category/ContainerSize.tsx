import { useEffect, useState } from "react";
import SelectCompany from "../../component/SelectCompany";
import { Col, Row } from "antd";
import DataList from "../../component/DataList";
import ContainerSizeTYPE, { columns } from "../../types/ContainerSize";
import { Helmet } from "react-helmet";
import { SelectArrType } from "../../lib/arrList";
import { loadDataSelect } from "../../lib/loading";
import loadData from "../../lib/LoadTable";

const category = "size-types";

export default function ContainerSize() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyList, setCompanyList] = useState<SelectArrType[]>([]);
  const [rows, setRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    const loadCompanyList = async () => {
      setCompanyList(await loadDataSelect("operations"));
      columns[0].optlist = await loadDataSelect("operations");
    };
    loadCompanyList();
  }, []);

  useEffect(() => {
    const query = selectedCompany ? "&operationCode=" + selectedCompany : undefined;
    loadData(category, columns, setRows, query);
    setUpdateStatus(false);
  }, [updateStatus, selectedCompany]);

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
        <Col span={24} md={6}>
          <SelectCompany
            companyList={companyList}
            onCompanyChange={setSelectedCompany}
          />
        </Col>
        <Col span={24} md={18}>
          <DataList<ContainerSizeTYPE>
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
            query={selectedCompany ? "&operationCode=" + selectedCompany : ""}
          />
        </Col>
      </Row>
    </div>
  );
}
