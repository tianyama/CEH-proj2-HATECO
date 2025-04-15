import { extraModeList } from "../lib/arrList";
import { AdjustColumn } from "../component/ui/column";
import RowTypes from "./RowTypes";

export default interface JobModeTYPE extends RowTypes {
  jobModeCode: string;
  jobModeName: string;
  isLoLo: boolean;
  isCfsStuff: boolean;
  isCfsUnstuff: boolean;
  isServiceYard: boolean;
  isServiceNoncont: boolean;
  extraMode: number;
}

export const columns: AdjustColumn[] = [
  { key: "jobModeCode", name: "Mã phương án", width: "15%", type: "string", primary: true },
  { key: "jobModeName", name: "Tên phương án", width: "15%", type: "string" },
  { key: "isLoLo", name: "Nâng hạ", type: "boolean" },
  { key: "isCfsStuff", name: "Đóng hàng", type: "boolean" },
  { key: "isCfsUnstuff", name: "Rút hàng", type: "boolean" },
  { key: "isServiceYard", name: "Dịch vụ bãi", type: "boolean" },
  { key: "isServiceNoncont", name: "Dịch vụ khác", type: "boolean" },
  {
    key: "extraMode",
    name: "Loại phụ phí",
    width: "15%",
    value: 0,
    type: "select",
    optlist: extraModeList,
  },
];

export const JobModeCol_Commodity: AdjustColumn[] = [
  { key: "jobModeCode", name: "Mã phương án", width: "30%", type: "string", primary: true },
  { key: "jobModeName", name: "Tên phương án", width: "35%", type: "string" },
  { key: "quantity", name: "Số lượng", width: "25%", type: "string" },
]
