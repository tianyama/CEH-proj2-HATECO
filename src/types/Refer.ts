import { roundingList, moneyCreditList } from "../lib/arrList";
import { AdjustColumn } from "../component/ui/column";
import RowTypes from "./RowTypes";

export interface ReferTYPE extends RowTypes {
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
  },
  { key: "applyDate", name: "Ngày hiệu lực", value: new Date(), type: "date", width: "15%" },
  { key: "expireDate", name: "Ngày hết hạn", value: new Date(), type: "date", width: "15%" },
  {
    key: "rounding",
    name: "Làm tròn giờ",
    value: roundingList[0].value,
    type: "select",
    optlist: roundingList,
  },
  { key: "hourAdding", name: "Giờ cộng thêm", value: 0, type: "number", width: "15%" },
  {
    key: "moneyCredit",
    name: "Loại thanh toán",
    value: moneyCreditList[0].value,
    type: "select",
    optlist: moneyCreditList,
  },
];