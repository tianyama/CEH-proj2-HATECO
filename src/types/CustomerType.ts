import { AdjustColumn } from "../component/ui/column";

export default interface Country {
  _id: string;
  rowID: number;
  customerTypeCode: string;
  customerTypeName: string;
  userGroupRank: number;
}

export const columns: AdjustColumn[] = [
  { key: "customerTypeCode", name: "Mã loại khách hàng", type: "string" },
  { key: "customerTypeName", name: "Tên loại khách hàng", type: "string" },
  { key: "userGroupRank", name: "Hạng ưu tiên", type: "number" },
];
