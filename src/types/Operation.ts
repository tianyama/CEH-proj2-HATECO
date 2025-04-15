import { AdjustColumn } from "../component/ui/column";
import { isForeignList, moneyCreditList } from "../lib/arrList";
import RowTypes from "./RowTypes";

export default interface OperationsTYPE extends RowTypes {
  operationCode: string;
  operationName: string;
  isActive: boolean;
  isEdo: boolean;
  edoNote: boolean;
  isLocalForeign: string;
  moneyCredit: string;
}

export const columns: AdjustColumn[] = [
  { key: "operationCode", name: "Mã hãng tàu", type: "string", primary: true },
  { key: "operationName", name: "Tên hãng tàu", type: "string" },
  { key: "isActive", name: "Trạng thái", type: "boolean" },
  { key: "isEdo", name: "EDO", type: "boolean" },
  { key: "edoNote", name: "EDO NOTE", type: "boolean" },
  { key: "isLocalForeign", name: "Nội/Ngoại", type: "select",
    optlist: isForeignList
  },
  {
    key: "moneyCredit",
    name: "Loại thanh toán",
    value: moneyCreditList[0].value,
    type: "select",
    optlist: moneyCreditList,
  },
];
