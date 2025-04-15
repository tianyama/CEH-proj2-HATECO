import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import CustomerTypeTYPE, { columns } from "../../types/CustomerType";
import { useState, useEffect } from "react";
import loadData from "../../lib/LoadTable";

const category = "customer-types";

export default function CustomerType() {
  const [rows, setRows] = useState<CustomerTypeTYPE[]>([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData<CustomerTypeTYPE>(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Hateco - Danh mục loại khách hàng</title>
      </Helmet>
      <DataList<CustomerTypeTYPE>
        tableMode="editrow"
        category={category}
        columns={columns}
        exRows={rows}
        setUpdateStatus={setUpdateStatus}
        updateStatus={updateStatus}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}
