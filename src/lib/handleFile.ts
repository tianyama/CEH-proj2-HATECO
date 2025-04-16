import ExcelJS from "exceljs";
import { AdjustColumn } from "../component/ui/column";
import { MessageInstance } from "antd/es/message/interface";
import RowTypes from "../types/RowTypes";
import { checkSame, csvType, findLabel, findValueOpt, xlsType, xlsxType } from "./function";

import * as XLSX from "xlsx";

export function exportRawExcel(
  columns: AdjustColumn[],
  filename: string
) {
  // Tạo dữ liệu tiêu đề cột
  const headers = columns
    .filter(({ key }) => key !== "rdg-select-column")
    .map(({ name }) => name);

  // Tạo worksheet và workbook
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  // Xuất file Excel
  XLSX.writeFile(workbook, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`);
}

export async function exportFile<T>(
  typefile: string,
  columns: AdjustColumn[],
  rows: T[],
  filename: string
) {
  // Tạo tiêu đề cột
  const headers = columns
    .filter(({ key }) => key !== "rdg-select-column")
    .map(({ name }) => name);

  // Tạo dữ liệu từ các hàng
  const data = rows.map((row) => {
    return columns
      .filter(({ key }) => key !== "rdg-select-column")
      .map(({ key, type, optlist }) => {
        const val = row[key as keyof T];
        if (type === "select" && optlist) {
          return findLabel(optlist, val);
        } else if (type === "date") {
          return val ? new Date(val as string).toISOString() : "";
        } else if (type === "boolean") {
          return val ? "TRUE" : "FALSE";
        } else {
          return val ?? "";
        }
      });
  });

  // Tạo worksheet và workbook
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, filename, { bookType: typefile as XLSX.BookType });
}

export async function importFile<T extends RowTypes>(
  columns: AdjustColumn[],
  rows: T[],
  file: File | null,
  setRows: (row: T[]) => void,
  setFile: (file: File | null) => void,
  messageApi: MessageInstance
) {
  if (!file) return
  try {
    const reader = new FileReader();
    const typefile = file.type
    if (typefile == csvType) reader.readAsText(file, "utf-8");
    else reader.readAsArrayBuffer(file);
    reader.onload = () => {
      let workbook: XLSX.WorkBook;
      if (typefile == csvType) {
        const csvData = reader.result as string;
        workbook = XLSX.read(csvData, { type: "string" });
      } else {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        workbook = XLSX.read(data, { type: "array" });
      }  
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      if (!worksheet) {
        messageApi.error("Không tìm thấy sheet trong file Excel!");
        return;
      }
      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });
      const headers = jsonData[0] as string[];
      const newRows: T[] = jsonData.slice(1).map((row) => {
        const rowData: any = {};
        headers.forEach((header, index) => {
          const column = columns.find(({ name }) => name === header);
          if (column) {
            const { key, type, optlist } = column;
            const cellValue = row[index];
            if (type === "select" && optlist) {
              rowData[key] = findValueOpt(optlist, cellValue);
            } else if (type === "date") {
              rowData[key] = cellValue ? new Date(cellValue) : null;
            } else if (type === "boolean") {
              rowData[key] = ["TRUE", "true", "X"].includes(cellValue);
            } else {
              rowData[key] = cellValue ?? "";
            }
          }
        });
        return rowData;
      });

      // Cập nhật dữ liệu
      const updatedRows = [...rows];
      const primaryCols = columns.filter(({ primary }) => primary);
      newRows.forEach((newRow) => {
        const existingRowIndex = updatedRows.findIndex((row) =>
          checkSame(primaryCols, row, newRow)
        );
        if (existingRowIndex !== -1) {
          updatedRows[existingRowIndex] = {
            ...updatedRows[existingRowIndex],
            ...newRow,
            isEdit: true,
          };
        } else {
          updatedRows.push({
            ...newRow,
            _id: "New" + (updatedRows.length + 1).toString(),
            rowID: updatedRows.length + 1,
          });
        }
      });

      setRows(
        updatedRows.map((item, index) => ({ ...item, rowID: index + 1 }))
      );
      messageApi.success("Nhập dữ liệu từ Excel thành công!");
    };

    reader.onerror = () => {
      messageApi.error("Có lỗi xảy ra khi đọc file Excel!");
    };
  } catch (error) {
    console.error(error);
    messageApi.error("Có lỗi xảy ra khi xử lý tệp Excel!");
  }

  setFile(null);
}


