import { AdjustColumn } from "../component/ui/column";

export default interface IMO {
  _id: string;
  rowID: number;
  imdgClass: string;
  un: string;
  placard: string;
  description: string;
}

export const columns: AdjustColumn[] = [
  { key: "imdgClass", name: "IMDG", type: "string" },
  { key: "un", name: "UN", type: "string" },
  { key: "placard", name: "TEM", type: "string" },
  { key: "description", name: "Diễn giải", type: "string" },
];
