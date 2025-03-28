import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Vessel";

export default function Vessel () {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Danh mục tàu</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category="vessels"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}
