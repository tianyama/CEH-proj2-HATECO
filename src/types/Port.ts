import { AdjustColumn } from "../component/ui/column";

export interface Port {
  portCode: string;
  portName: string;
}

export const columns: AdjustColumn[] = [
  { key: "portCode", name: "Mã cảng", type: "string" },
  { key: "portName", name: "Tên cảng", type: "string" },
];
