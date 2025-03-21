import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/JobMode";

export default function JobMode() {
  return (
    <div style={{padding: 10}}>
      <Helmet><title>Hateco - Danh mục phương án</title></Helmet>
      <DataList
        category="job-modes"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}
