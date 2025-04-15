import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import PortTYPE, { columns } from "../../types/Port";
import { useState, useEffect } from "react";
import loadData from "../../lib/LoadTable";

const category = "ports";

export default function PortList() {
  const [rows, setRows] = useState([]);
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
      <DataList<PortTYPE>
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
