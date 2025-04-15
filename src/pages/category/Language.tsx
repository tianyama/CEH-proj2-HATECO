import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import LanguageTYPE, { columns } from "../../types/Language";
import loadData from "../../lib/LoadTable";
import { useEffect, useState } from "react";

const category = "languages";

export default function Language() {
  const [rows, setRows] = useState<LanguageTYPE[]>([]);
  const [updateStatus, setUpdateStatus] = useState(true);
  useEffect(() => {
    try {
      loadData(category, columns, setRows);
    } finally {
      setUpdateStatus(false);
    }
  }, [updateStatus]);
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Hateco - Danh mục ngôn ngữ</title>
      </Helmet>
      <DataList<LanguageTYPE>
        exRows={rows}
        tableMode="editrow"
        category={category}
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
        setUpdateStatus={setUpdateStatus}
        updateStatus={updateStatus}
      />
    </div>
  );
}
