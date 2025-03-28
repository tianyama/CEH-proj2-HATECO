import { AdjustColumn } from "../component/ui/column";
import { SelectArrType } from "../lib/arrList";
import { loadDataSelect } from "../lib/loading";

export default interface Container {
  _id: string;
  containerNo: string;
  vesselKey	: string;
  classCode	: string;
  operationCode	: string;
  fe: string;
  containerStatusCode	: string;
  cargoTypeCode	: string;
  commodity	: string;
  localSizetype	: string;
  isoSizetype	: string;
  isLocalForeign: string;
  jobModeCodeIn	: string;
  methodCodeIn: string;
  dateIn: Date;
  dateOut: Date;
  jobModeCodeOut: string;
  methodCodeOut: string;
  block: string;
  bay: string;
  row: string;
  tier: string;
  vgm: boolean;
  mcWeight: number;
  pol: string;
  pod: string;
  cusHold: boolean;
  terHold: boolean;
  isReturnBack: boolean;
  isSpecialWarning: boolean;
  isTruckBarge: string
}

export const companyList: SelectArrType[] = await loadDataSelect("operations");

export const columns: AdjustColumn[] = [
  { key: "containerNo", name: "Số container", type: "string" },
  { key: "vesselKey", name: "Mã tàu", type: "string" },
  {
    key: "operationCode",
    name: "Hãng khai thác",
    type: "string",
    optlist: companyList,
  },
  { key: "localSizetype", name: "Kích cỡ nội bộ", type: "string" },
];