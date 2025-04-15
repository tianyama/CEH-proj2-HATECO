import { AdjustColumn } from "../component/ui/column";
import RowTypes from "./RowTypes";

export default interface CommodityTYPE extends RowTypes {
  commodityCode: string;
  commodityName: string;
}

export const columns: AdjustColumn[] = [
  { key: "commodityCode", name: "Mã hàng hóa", type: "string", primary: true },
  { key: "commodityName", name: "Tên hàng hóa", type: "string" },
];
