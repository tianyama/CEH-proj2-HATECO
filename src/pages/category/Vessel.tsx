import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Vessel";
import { useEffect, useState } from "react";
import { loadDataSelect } from "../../lib/loading";
import loadData from "../../lib/LoadTable";

const category = "vessels";

export default function Vessel() {
  const [rows, setRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);
  useEffect(() => {
    const loadCompanyList = async () => {
      columns[2].optlist = await loadDataSelect("operations");
    };
    loadCompanyList();
  }, []);
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Hateco - Danh mục tàu</title>
      </Helmet>
      <DataList
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
