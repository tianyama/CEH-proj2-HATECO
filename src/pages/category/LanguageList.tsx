import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Language";

export default function LanguageList() {
  return (
    <>
      <Helmet>
        <title>Hateco - Danh mục ngôn ngữ</title>
      </Helmet>
      <DataList
        category="languages"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </>
  );
}
