import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Refer";

export default function Refer() {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Cấu hình sử dụng điện</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category="refers"
        columns={columns}
        buttonList={["add", "delete", "save", "download"]}
        Filename="Cấu hình sử dụng điện"
      />
    </div>
  );
}
