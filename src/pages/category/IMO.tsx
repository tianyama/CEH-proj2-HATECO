import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/IMO";

export default function IMO() {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Danh mục IMO</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category="imos"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}