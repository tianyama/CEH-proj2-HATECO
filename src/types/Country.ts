import { AdjustColumn } from "../component/ui/column";
import RowTypes from "./RowTypes";

export default interface CountryTYPE extends RowTypes {
  countryCode: string;
  countryName: string;
  taxID: string;
}

export const columns: AdjustColumn[] = [
  { key: "countryCode", name: "Mã quốc gia", type: "string", primary: true },
  { key: "countryName", name: "Tên quốc gia", type: "string" },
  { key: "taxID", name: "Tax ID", type: "string" },
];
