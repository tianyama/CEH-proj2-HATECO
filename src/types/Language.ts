import { AdjustColumn } from "../component/ui/column";
import RowTypes from "./RowTypes";

export default interface LanguageTYPE extends RowTypes {
  languageCode: string;
  languageName: string;
}

export const columns: AdjustColumn[] = [
  { key: "languageCode", name: "Mã ngôn ngữ", type: "string", primary: true },
  { key: "languageName", name: "Tên ngôn ngữ", type: "string" },
];
