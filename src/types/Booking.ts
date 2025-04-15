import { AdjustColumn } from "../component/ui/column";
import { bookingStatusList, bookingTypeList } from "../lib/arrList";

export default interface BookingTYPE {
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
  { key: "bookingStatus", name: "Trạng thái", width: "15%", type: "select", optlist: bookingStatusList },
  { key: "bookingType", name: "Loại Booking", width: "15%", type: "select", optlist: bookingTypeList },
  { key: "bookingNo", name: "Số booking", width: "15%", type: "string", primary: true },
  { key: "bookingDate", name: "Ngày đăng ký", width: "15%", type: "date" },
  { key: "expDate", name: "Ngày hết hạn", width: "15%", type: "date" },
  { key: "operationCode", name: "Hãng KT", width: "15%", type: "select", optlist: undefined},
  { key: "localSizetype", name: "Kích cỡ", width: "15%", type: "string" },
  { key: "isoSizetype", name: "Kích cỡ ISO", type: "string" },
  { key: "bookingAmount", name: "Số lượng", type: "number" },
  { key: "stackingAmount", name: "Đã cấp", type: "number" },
  { key: "shipperName", name: "Chủ hàng", type: "string" },
  { key: "note", name: "Ghi chú", type: "string" },
];