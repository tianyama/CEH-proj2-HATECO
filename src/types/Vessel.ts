import { AdjustColumn } from "../component/ui/column";
import { SelectArrType } from "../lib/arrList";
import { loadDataSelect } from "../lib/loading";

export default interface Vessel {
  vesselCode: string,
  vesselName: string,
  operationCode: string,
  callSign: string,
  imo: string
}

export const companyList: SelectArrType[] = await loadDataSelect("operations");

export const columns: AdjustColumn[] = [
  { key: "vesselCode", name: "Mã tàu", type: "string" },
  { key: "vesselName", name: "Tên tàu", type: "string" },
  { key: "operationCode", name: "Hãng khai thác", type: "select", optlist: companyList },
  { key: "callSign", name: "Callsign", type: "string" },
  { key: "imo", name: "IMO", type: "string" },
];