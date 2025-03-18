import DataList from "../../component/DataList";
import { columns } from "../../types/JobMode";

export default function JobModeList() {
  return (
    <DataList
      category="job-modes"
      columns={columns}
      buttonList={["add", "delete", "save", "template", "upload", "download"]}
    />
  );
}
