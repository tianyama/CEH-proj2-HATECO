import { useState } from "react";
import { SelectArrType } from "../lib/arrList";
import { Button, Form, Modal, Select } from "antd";
import { SyncOutlined } from "@ant-design/icons";

interface SelectCompanyProps {
  companyList: SelectArrType[];
  onCompanyChange: (company: string) => void;
}

export default function SelectCompany ({
  companyList,
  onCompanyChange,
}: Readonly<SelectCompanyProps>) {
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
        height: 495,
        justifyContent: "center",
      }}
    >
      <p>Chọn hãng khai thác:</p>
      <Form style={{ display: "block", alignItems: "center" }}>
        <Select
          style={{ width: "100%" }}
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