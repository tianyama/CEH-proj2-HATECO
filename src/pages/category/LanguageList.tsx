import DataList from "../../component/DataList";
import { columns } from "../../types/Language";

export default function LanguageList() {
  return (
    <DataList
      category="languages"
      columns={columns}
      buttonList={["add", "delete", "save", "template", "upload", "download"]}
    />
  );
}
