import { Helmet } from "react-helmet";
import DataList from "../../component/DataList";
import { columns } from "../../types/CustomerType";

export default function CustomerType() {
  return (
    <div style={{padding: 10}}>
      <Helmet>
        <title>Hateco - Danh mục loại khách hàng</title>
      </Helmet>
      <DataList
        tableMode="editrow"
        category="customer-types"
        columns={columns}
        buttonList={["add", "delete", "save", "template", "upload", "download"]}
      />
    </div>
  );
}