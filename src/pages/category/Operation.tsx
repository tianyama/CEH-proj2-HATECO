import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Operation";

export default function Operation () {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Danh mục ngôn ngữ</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category="operations"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}
