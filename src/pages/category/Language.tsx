import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Language";

export default function Language() {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Danh mục ngôn ngữ</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category="languages"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}
