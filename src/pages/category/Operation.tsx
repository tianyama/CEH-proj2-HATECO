import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import OperationsTYPE, { columns } from "../../types/Operation";
import { useState, useEffect } from "react";
import loadData from "../../lib/LoadTable";

const category = "operations";

export default function Operation() {
  const [rows, setRows] = useState<OperationsTYPE[]>([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Hateco - Danh mục ngôn ngữ</title>
      </Helmet>
      <DataList<OperationsTYPE>
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
