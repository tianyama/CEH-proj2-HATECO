import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Refer";
import { useEffect, useState } from "react";
import { loadDataSelect } from "../../lib/loading";
import loadData from "../../lib/LoadTable";

const category = "refers";

export default function Refer() {
  const [rows, setRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);
  useEffect(() => {
    const loadCompanyList = async () => {
      columns[0].optlist = await loadDataSelect("operations");
    };
    loadCompanyList();
  }, []);
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Hateco - Cấu hình sử dụng điện</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category={category}
        columns={columns}
        exRows={rows}
        setUpdateStatus={setUpdateStatus}
        updateStatus={updateStatus}
        buttonList={["add", "delete", "save", "download"]}
        Filename="Cấu hình sử dụng điện"
      />
    </div>
  );
}
