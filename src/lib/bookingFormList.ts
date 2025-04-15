import { bookingStatusList, SelectArrType } from "./arrList";

export interface bkSearchFrmType {
  type: string;
  name: string;
  label: string;
  attribute?: string;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  optlist?: SelectArrType[];
  optTable?: string;
  width?: number;
}

export const bkSearchFrm = [
  {
    type: "date",
    name: "BL_fromDate",
    label: "Từ ngày",
    attribute: "fromDate",
    required: true
  },
  {
    type: "date",
    name: "BL_toDate",
    label: "Đến ngày",
    attribute: "toDate",
    required: true,
  },
  {
    type: "string",
    name: "BL_bookingNo",
    label: "Số booking",
    attribute: "bookingNo",
  },
  {
    type: "select",
    name: "BL_company",
    label: "Hãng khai thác",
    attribute: "operationCode",
    optlist: undefined,
  },
  {
    type: "seltable",
    name: "BL_vesselKey",
    label: "Tàu/Chuyến",
    attribute: "vesselKey",
    optTable: 'VesselTable',
    width: 24,
  },
  {
    type: "select",
    name: "BL_pol",
    label: "POL",
    attribute: "pol",
    width: 8,
  },
  {
    type: "select",
    name: "BL_pod",
    label: "POD",
    attribute: "pod",
    width: 8,
  },
  {
    type: "select",
    name: "BL_fpod",
    label: "FPOD",
    attribute: "fpod",
    width: 8,
  },
  {
    type: "checkbox",
    name: "BL_bookingStatus",
    label: "Trạng thái booking",
    optlist: bookingStatusList??[],
    attribute: "bookingStatus",
    col: 8,
    width: 24,
  },
]

export const bkFormList: bkSearchFrmType[] = [
  {
    type: "date",
    label: "Từ ngày",
    name: "bookingDate",
    disabled: true
  },
  {
    type: "date",
    label: "Đến ngày",
    name: "expDate",
    required: true,
  },
  {
    type: "string",
    label: "Số booking",
    name: "bookingNo",
    required: true
  },
  {
    type: "select",
    name: "operationCode",
    label: "Hãng khai thác",
    required: true
  },
  {
    type: "select",
    label: "Kích cỡ",
    name: "isoSizetype",
    required: true
  },
  {
    type: "number",
    label: "Số lượng",
    name: "bookingAmount",
    required: true
  },
  {
    type: "seltable",
    label: "Số container",
    name: "containerNo",
    width: 24,
    optTable: 'ContainerTable',
    required: true
  },
  {
    type: "seltable",
    label: "Tàu/Chuyến",
    name: "vesselName",
    width: 24,
    optTable: 'VesselTable',
    required: true
  },
  {
    type: "select",
    label: "POL",
    name: "pol",
    width: 8,
    required: true
  },
  {
    type: "select",
    label: "POD",
    name: "pod",
    width: 8,
    required: true
  },
  {
    type: "select",
    label: "FPOD",
    name: "fpod",
    width: 8,
    required: true
  },
  {
    type: "string",
    label: "Chủ hàng",
    name: "shipperName",
    width: 24,
  },
  {
    type: "string",
    label: "Ghi chú",
    name: "note",
    width: 24,
  },
];

export const bkEditFormList: bkSearchFrmType[]= [
  {
    type: "string",
    name: "bookingNo",
    label: "Số booking",
    disabled: true
  },
  {
    type: "date",
    name: "expDate",
    label: "Ngày hết hạn ",
    required: true,
  },
  {
    type: "select",
    name: "operationCode",
    label: "Hãng khai thác",
    disabled: true,
  },
  {
    type: "seltable",
    name: "vesselName",
    label: "Tàu/Chuyến",
    optTable: 'VesselTable',
  },
  {
    type: "seltable",
    name: "containerNo",
    label: "Số container",
    width: 24,
    optTable: 'ContainerTable',
  },
  {
    type: "select",
    name: "pol",
    label: "POL",
    width: 8,
  },
  {
    type: "select",
    name: "pod",
    label: "POD",
    width: 8,
  },
  {
    type: "select",
    name: "fpod",
    label: "FPOD",
    width: 8,
  },
  {
    type: "select",
    name: "isoSizetype",
    label: "Kích cỡ",
  },
  {
    type: "number",
    name: "bookingAmount",
    label: "Số lượng",
  },
  {
    type: "string",
    name: "shipperName",
    label: "Chủ hàng",
  },
  {
    type: "string",
    name: "note",
    label: "Ghi chú",
  },
  {
    type: "toggle",
    name: "dangerous",
    label: "Cont nguy hiểm",
  },
  {
    type: "select",
    name: "bookingClass",
    label: "Class",
    width: 8,
  },
  {
    type: "select",
    name: "unno",
    label: "UNNO",
    width: 8,
  },
  {
    type: "select",
    name: "placard",
    label: "TEM nguy hiểm",
    width: 8,
  },
]
