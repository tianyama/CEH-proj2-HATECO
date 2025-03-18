import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/Refer";

export default function ReferList() {
  return (
    <>
      <Helmet>
        <title>Hateco - Cấu hình sử dụng điện</title>
      </Helmet>
      <DataList
        category="refers"
        columns={columns}
        buttonList={["add", "delete", "save", "download"]}
      />
    </>
  );
}
