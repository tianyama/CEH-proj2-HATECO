import { bookingStatusList } from "./arrList";
import { loadDataSelect } from "./loading";
export const operationList = (await loadDataSelect("operations"))??[];
export const portList = await loadDataSelect("ports")??[];

export const bkSearchFrm = [
  {
    type: "date",
    name: "BL_fromDate",
    label: "Từ ngày",
    attribute: "bookingDate",
    required: true
  },
  {
    type: "date",
    name: "BL_toDate",
    label: "Đến ngày",
    attribute: "expDate",
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
    optlist: operationList??[],
    attribute: "operationCode",
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
    optlist: portList??[],
    attribute: "pol",
    width: 8,
  },
  {
    type: "select",
    name: "BL_pod",
    label: "POD",
    optlist: portList??[],
    attribute: "pod",
    width: 8,
  },
  {
    type: "select",
    name: "BL_fpod",
    label: "FPOD",
    optlist: portList??[],
    attribute: "fpod",
    width: 8,
  },
  {
    type: "checkbox",
    name: "BL_bookingStatus",
    label: "Trạng thái booking",
    optlist: bookingStatusList??[],
    attribute: "fpod",
    width: 8,
  },
]


export const bkFormList = [
  {
    type: "date",
    name0: "EL_fromDate",
    name1: "S_fromDate",
    label: "Từ ngày",
    attribute: "bookingDate",
    disabled: true
  },
  {
    type: "date",
    name0: "EL_toDate",
    name1: "S_toDate",
    label: "Đến ngày",
    attribute: "expDate",
    required: true,
  },
  {
    type: "string",
    name0: "EL_bookingNo",
    name1: "S_bookingNo",
    label: "Số booking",
    attribute: "bookingNo",
    required: true
  },
  {
    type: "select",
    name0: "EL_company",
    name1: "S_company",
    label: "Hãng khai thác",
    optlist: operationList??[],
    attribute: "operationCode",
    required: true
  },
  {
    type: "select",
    name0: "EL_containersize",
    name1: "S_containersize",
    label: "Kích cỡ",
    attribute: "isoSizetype",
    required: true
  },
  {
    type: "number",
    name0: "EL_bookingAmount",
    name1: "S_bookingAmount",
    label: "Số lượng",
    attribute: "bookingAmount",
    required: true
  },
  {
    type: "seltable",
    name0: "EL_containerNo",
    name1: "S_containerNo",
    label: "Số container",
    attribute: "containerNo",
    width: 24,
    optTable: 'ContainerTable',
    required: true
  },
  {
    type: "seltable",
    name0: "EL_vesselKey",
    name1: "S_vesselKey",
    label: "Tàu/Chuyến",
    attribute: "vesselKey",
    width: 24,
    optTable: 'VesselTable',
    required: true
  },
  {
    type: "select",
    name0: "EL_pol",
    name1: "S_pol",
    label: "POL",
    optlist: portList??[],
    attribute: "pol",
    width: 8,
    required: true
  },
  {
    type: "select",
    name0: "EL_pod",
    name1: "S_pod",
    label: "POD",
    optlist: portList??[],
    attribute: "pod",
    width: 8,
    required: true
  },
  {
    type: "select",
    name0: "EL_fpod",
    name1: "S_fpod",
    label: "FPOD",
    optlist: portList??[],
    attribute: "fpod",
    width: 8,
    required: true
  },
  {
    type: "string",
    name0: "EL_owner",
    name1: "S_owner",
    label: "Chủ hàng",
    attribute: "shipperName",
    width: 24,
  },
  {
    type: "string",
    name0: "EL_note",
    name1: "S_note",
    label: "Ghi chú",
    attribute: "note",
    width: 24,
  },
];

export const bkEditFormList= [
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
    optlist: operationList??[],
  },
  {
    type: "seltable",
    name: "vesselKey",
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
    optlist: portList??[],
    width: 8,
  },
  {
    type: "select",
    name: "pod",
    label: "POD",
    optlist: portList??[],
    width: 8,
  },
  {
    type: "select",
    name: "fpod",
    label: "FPOD",
    optlist: portList??[],
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
]
