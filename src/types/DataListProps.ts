import { AdjustColumn } from "../component/ui/column";

export default interface DataListProps {
  category: string;
  columns: AdjustColumn[];
  tableMode: string;
  buttonList?: string[];
  Filename?: string;
  query?: string;
  setResult?: (row: any[]|any) => void
  resultList?: Set<any>
}