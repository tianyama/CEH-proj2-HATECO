import { AdjustColumn } from "../component/ui/column";

export default interface DataListProps {
  category: string;
  columns: AdjustColumn[];
  buttonList: string[];
  Filename?: string;
  additionalVar1?: string;
}