import DataList from "../../component/DataList";
import { columns } from "../../types/Refer";

export default function ReferList() {
  return (
    <DataList
      category="refers"
      columns={columns}
      buttonList={["add", "delete", "save", "download"]}
    />
  );
}
