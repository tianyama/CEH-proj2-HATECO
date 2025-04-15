import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import CountryTYPE, { columns } from "../../types/Country";
import { useState, useEffect } from "react";
import loadData from "../../lib/LoadTable";

const category = "countries";

export default function Country() {
  const [rows, setRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Hateco - Danh mục quốc gia</title>
      </Helmet>
      <DataList<CountryTYPE>
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
