import { AdjustColumn } from "../component/ui/column";

export default interface Language {
  _id: string;
  rowID: number;
  languageCode: string;
  languageName: string;
}

export const columns: AdjustColumn[] = [
  { key: "languageCode", name: "Mã ngôn ngữ", type: "string" },
  { key: "languageName", name: "Tên ngôn ngữ", type: "string" },
];
