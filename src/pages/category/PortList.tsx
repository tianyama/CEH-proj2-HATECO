import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Port";

export default function PortList () {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Danh mục ngôn ngữ</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category="ports"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}
