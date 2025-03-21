import { companyList2, roundingList, moneyCreditList } from "../lib/arrList";
import { AdjustColumn } from "../component/ui/column";

export interface Refer {
  _id: string;
  rowID: number;
  operationCode: string;
  applyDate: Date;
  expireDate: Date;
  rounding: string;
  hourAdding: number;
  moneyCredit: string;
}

export const columns: AdjustColumn[] = [
  {
    key: "operationCode",
    name: "Hãng khai thác",
    width: "18%",
    type: "select",
    optlist: companyList2,
  },
  { key: "applyDate", name: "Ngày hiệu lực", value: new Date(), type: "date" },
  { key: "expireDate", name: "Ngày hết hạn", value: new Date(), type: "date" },
  {
    key: "rounding",
    name: "Làm tròn giờ",
    value: roundingList[0].value,
    type: "select",
    optlist: roundingList,
  },
  { key: "hourAdding", name: "Giờ cộng thêm", value: 0, type: "number" },
  {
    key: "moneyCredit",
    name: "Loại thanh toán",
    value: moneyCreditList[0].value,
    type: "select",
    optlist: moneyCreditList,
  },
];

/* export const newRowRefer = (rows: object[], i: number) => {
  return {
    _id: "New" + (rows.length + i + 1).toString(),
    rowID: rows.length + i + 1,
    ...columns.reduce((acc, col) => ({ ...acc, [col.key]: col.value }), {})
  };
}; */
