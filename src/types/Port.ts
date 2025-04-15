import { AdjustColumn } from "../component/ui/column";
import RowTypes from "./RowTypes";

export default interface PortTYPE extends RowTypes {
  portCode: string;
  portName: string;
}

export const columns: AdjustColumn[] = [
  { key: "portCode", name: "Mã cảng", type: "string", primary: true },
  { key: "portName", name: "Tên cảng", type: "string" },
];
