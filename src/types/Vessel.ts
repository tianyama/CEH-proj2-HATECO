import { AdjustColumn } from "../component/ui/column";
import RowTypes from "./RowTypes";

export default interface VesselTYPE extends RowTypes{
  vesselCode: string,
  vesselName: string,
  operationCode: string,
  callSign: string,
  imo: string
}

export const columns: AdjustColumn[] = [
  { key: "vesselCode", name: "Mã tàu", type: "string", primary: true },
  { key: "vesselName", name: "Tên tàu", type: "string" },
  { key: "operationCode", name: "Hãng khai thác", type: "select"},
  { key: "callSign", name: "Callsign", type: "string" },
  { key: "imo", name: "IMO", type: "string" },
];