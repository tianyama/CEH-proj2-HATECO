import { useEffect, useState } from "react";
import { companyList2, SelectArrType } from "../lib/arrList";
import { Button, Form, Modal, Select } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { loadDataSelect } from "../lib/loading";

interface SelectCompanyProps {
  companyList: SelectArrType[];
  onCompanyChange: (company: string) => void;
}

const SelectCompany = ({
  companyList,
  onCompanyChange,
}: SelectCompanyProps) => {
  const [company, setCompany] = useState("");
  const [alertCompany, setAlertCompany] = useState(false);

  const handleLoadData = () => {
    onCompanyChange(company);
    if (!company) setAlertCompany(true);
  };

  return (
    <div
      style={{
        padding: 24,
        background: "#fff",
        minHeight: 500,
        justifyContent: "center",
      }}
    >
      <p>Chọn hãng khai thác:</p>
      <Form style={{ display: "block", alignItems: "center" }}>
        <Select
          style={{ width: "90%" }}
          options={companyList}
          defaultValue={companyList}
          showSearch
          optionFilterProp="label"
          onChange={(value) => setCompany(value ? String(value) : "")}
        />
        <Button
          style={{ alignItems: "center", marginTop: 20 }}
          variant="outlined"
          color="orange"
          icon={<SyncOutlined />}
          onClick={handleLoadData}
        >
          Nạp dữ liệu
        </Button>
      </Form>
      <Modal
        title="Vui lòng chọn hãng khai thác!"
        open={alertCompany}
        onCancel={() => setAlertCompany(false)}
        cancelText="OK"
      >
        Vui lòng chọn hãng khai thác!
      </Modal>
    </div>
  );
};

export default SelectCompany;
