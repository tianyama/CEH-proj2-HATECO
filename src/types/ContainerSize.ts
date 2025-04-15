import { AdjustColumn } from "../component/ui/column";
import { SelectArrType } from "../lib/arrList";
import { loadDataSelect } from "../lib/loading";
import RowTypes from "./RowTypes";

export default interface ContainerSizeTYPE extends RowTypes {
  operationCode: string;
  localSizetype: string;
  isoSizetype: string;
  cargoTypeCode: string;
  emptyCargoTypeCode: string;
}


export const columns: AdjustColumn[] = [
  {
    key: "operationCode",
    name: "Hãng khai thác",
    type: "select",
  },
  { key: "localSizetype", name: "Kích cỡ nội bộ", type: "string" },
  { key: "isoSizetype", name: "Kích cỡ ISO", type: "string" },
  { key: "cargoTypeCode", name: "Loại hàng", type: "string" },
  { key: "emptyCargoTypeCode", name: "Loại hàng rỗng", type: "string" },
];
