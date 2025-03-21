import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Vessel";

export default function Vessel () {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Danh mục ngôn ngữ</title>
      </Helmet>
      <DataList
        category="ports"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}
