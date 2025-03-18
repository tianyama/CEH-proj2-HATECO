import * as XLSX from 'xlsx';
import {Column } from "react-data-grid";

export const exportRawExcel = (columns: Column<any>[], filename: string) => {
  const headers = columns.filter(column => column.key!='rdg-select-column').map(col => col.name);
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, filename);
};


export const exportToExcel = (columns: Column<any>[], rows: any[], filename: string) => {
  const worksheetData = rows.map(row => {
    const newRow: any = {};
    columns.filter(column => column.key!='rdg-select-column').forEach(col => {
      newRow[col.name as keyof typeof newRow] = row[col.key];
    });
    return newRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  XLSX.writeFile(workbook, filename);
};

export const importFromExcel = (columns: Column<any>[], rows: object[], file: File, 
                                setRows: (row: object[]) => void, setFile: (file: File | null) => void) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target?.result as ArrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = jsonData[0] as string[];
    const rowsData = jsonData.slice(1);
    const newRows = rowsData.map((row) => {
      const rowData: any = {};
      headers.forEach((header, i) => {
        const column = columns.find(col => col.name === header);
        if (column) {
          rowData[column.key] = (row as string[])[i];
        }
      });
      return rowData;
    });

    const updatedRows = [...rows];
    newRows.forEach((newRow) => {
      const existingRowIndex = updatedRows.findIndex(row => row.languageCode === newRow.languageCode);
      if (existingRowIndex !== -1) {
        // Ghi đè dữ liệu trong Excel lên bảng
        updatedRows[existingRowIndex] = { ...updatedRows[existingRowIndex], ...newRow };
      } else {
        // Thêm vào các hàng cuối
        updatedRows.push({ ...newRow, _id: 'New'+(updatedRows.length + 1).toString(), rowID: updatedRows.length + 1 });
      }
    });
    setRows(updatedRows.map((item, index) => ({ ...item, rowID: index + 1 })));
  };
  reader.readAsArrayBuffer(file);
  setFile(null);
};