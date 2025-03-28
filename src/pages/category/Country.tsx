import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Country";

export default function Country() {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Danh mục quốc gia</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category="countries"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}
