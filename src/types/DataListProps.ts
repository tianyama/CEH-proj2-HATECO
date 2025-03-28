import { AdjustColumn } from "../component/ui/column";

export default interface DataListProps {
  category: string;
  columns: AdjustColumn[];
  buttonList: string[];
  Filename?: string;
  query?: string;
  additionalVar1?: string;
  tableMode?: string;
  setResult?: (row: any[]|any) => void
  resultList?: Set<any>
}