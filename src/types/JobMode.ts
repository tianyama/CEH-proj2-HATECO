import { extraModeList } from "../lib/arrList";
import { AdjustColumn } from "../component/ui/column";

export default interface JobMode {
  _id: string;
  rowID: number;
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
  { key: "jobModeCode", name: "Mã phương án", width: "15%", type: "string" },
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
