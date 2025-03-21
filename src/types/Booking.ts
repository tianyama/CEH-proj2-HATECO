import { extraModeList } from "../lib/arrList";
import { AdjustColumn } from "../component/ui/column";

export default interface Booking {
  _id: string;
  rowID: number;
  bookingStatus: number;
  bookingType: number;
  bookingNo: string
  bookingDate: Date;
  expDate: Date;
  operationCode: string;
  localSizetype: string;
  isoSizetype: string;
  bookingAmount: number;
  stackingAmount: number;
  shipperName:  string;
  note: string;
  containerNo: string;
  vesselKey: string;
  vesselName: string;
  vesselImvoy: string;
  vesselExvoy	: string;
  pol: string;
  pod: string;
  fpod	: string;
  temperature: number;
  vent: number;
  ventUnit: string;
  bookingClass: string;
  unno: string;
  oogTop: string;
  oogLeft: string;
  oogRight: string;
  oogBack: string;
  oogFront: string;
  humidity: number;
  o2: string;
  co2: string;
}

export const columns: AdjustColumn[] = [
  { key: "bookingStatus", name: "Trạng thái", width: "15%", type: "string" },
  { key: "bookingType", name: "Loại Booking", width: "15%", type: "string" },
  { key: "bookingNo", name: "Số booking", width: "15%", type: "string" },
  { key: "bookingDate", name: "Ngày đăng ký", width: "15%", type: "boolean" },
  { key: "expDate", name: "Ngày hết hạn", width: "15%", type: "boolean" },
  { key: "operationCode", name: "Hãng KT", width: "15%", type: "select" },
  { key: "localSizetype", name: "Kích cỡ", width: "15%", type: "string" },
  { key: "isoSizetype", name: "Kích cỡ ISO", type: "string" },
  { key: "bookingAmount", name: "Số lượng", type: "number" },
  { key: "stackingAmount", name: "Đã cấp", type: "number" },
  { key: "shipperName", name: "Chủ hàng", type: "string" },
  { key: "isoSizetype", name: "Ghi chú", type: "string" },

];