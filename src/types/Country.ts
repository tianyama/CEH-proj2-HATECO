import { AdjustColumn } from "../component/ui/column";

export default interface Country {
  _id: string;
  rowID: number;
  countryCode: string;
  countryName: string;
  taxID: string;
}

export const columns: AdjustColumn[] = [
  { key: "languageCode", name: "Mã quốc gia", type: "string" },
  { key: "languageName", name: "Tên quốc gia", type: "string" },
  { key: "taxID", name: "Tax ID", type: "string" },
];
