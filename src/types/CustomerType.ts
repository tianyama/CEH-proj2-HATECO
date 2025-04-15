import { AdjustColumn } from "../component/ui/column";
import RowTypes from "./RowTypes";

export default interface CustomerTypeTYPE extends RowTypes {
  customerTypeCode: string;
  customerTypeName: string;
  userGroupRank: number;
}

export const columns: AdjustColumn[] = [
  { key: "customerTypeCode", name: "Mã loại khách hàng", type: "string", primary: true },
  { key: "customerTypeName", name: "Tên loại khách hàng", type: "string" },
  { key: "userGroupRank", name: "Hạng ưu tiên", type: "number" },
];
