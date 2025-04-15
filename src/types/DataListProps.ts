import { AdjustColumn } from "../component/ui/column";

export default interface DataListProps {
  category: string;
  columns: AdjustColumn[];
  exRows: any[];
  tableMode: string;
  updateStatus: boolean;
  setUpdateStatus: (x: boolean) => void;
  buttonList?: string[];
  Filename?: string;
  query?: string;
  setResult?: (row: any[] | any) => void;
  resultList?: Set<any>;
  handleEditModalRow?: (row: any) => void;
}
