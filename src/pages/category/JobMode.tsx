import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import JobModeTYPE, { columns } from "../../types/JobMode";
import { useState, useEffect } from "react";
import loadData from "../../lib/LoadTable";

const category = "job-modes";

export default function JobMode() {
  const [rows, setRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Hateco - Danh mục phương án</title>
      </Helmet>
      <DataList<JobModeTYPE>
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
