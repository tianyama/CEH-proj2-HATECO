import { AdjustColumn } from "../component/ui/column";
import { SelectArrType } from "../lib/arrList";
import { loadDataSelect } from "../lib/loading";

export default interface Container {
  _id: string;
  rowID: number;
  operationCode: string;
  localSizetype: string;
  isoSizetype: string;
  cargoTypeCode: string;
  emptyCargoTypeCode: string;
}

export const companyList: SelectArrType[] = await loadDataSelect("operations");

export const columns: AdjustColumn[] = [
  {
    key: "operationCode",
    name: "Hãng khai thác",
    type: "select",
    optlist: companyList,
  },
  { key: "localSizetype", name: "Kích cỡ nội bộ", type: "string" },
  { key: "isoSizetype", name: "Kích cỡ ISO", type: "string" },
  { key: "cargoTypeCode", name: "Loại hàng", type: "string" },
  { key: "emptyCargoTypeCode", name: "Loại hàng rỗng", type: "string" },
];
