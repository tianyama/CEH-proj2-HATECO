import ExcelJS from "exceljs";
import { AdjustColumn } from "../component/ui/column";
import { MessageInstance } from "antd/es/message/interface";
import RowTypes from "../types/RowTypes";
import { checkSame, findLabel, findValueOpt } from "./function";

export async function exportRawExcel(
  columns: AdjustColumn[],
  filename: string
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  // Thêm tiêu đề cột
  worksheet.columns = columns
    .filter(({ key }) => key !== "rdg-select-column")
    .map(({ name }) => ({
      header: name,
      key: name,
      width: Math.max(name.length + 2, 15),
    }));

  // Xuất file Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export async function exportFile<T>(typefile: string, columns: AdjustColumn[], rows: T[], filename: string) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  // Thêm tiêu đề cột
  worksheet.columns = columns
    .filter(({ key }) => key !== "rdg-select-column")
    .map(({ name }) => ({
      header: name,
      key: name,
      width: (typefile == "XLSX") ? Math.max(name.length + 2, 15) : undefined,
    }));

  rows.forEach((row) => {
    const newRow: Record<string, unknown> = {};
    columns
      .filter(({ key }) => key !== "rdg-select-column")
      .forEach(({ key, name, type, optlist }) => {
        const val = row[key as keyof T];
        const name0 = name as keyof typeof newRow;
        if (type === "select" && optlist && typefile == "XLSX") {
          newRow[name0] = findLabel(optlist, val);
        } else if (type === "date") {
          newRow[name0] = val ? new Date(val as string) : null;
        } else if (type === "boolean") {
          newRow[name0] = val ? "TRUE" : "FALSE";
        } else {
          newRow[name0] = val ?? "";
        }
      });
    worksheet.addRow(newRow);
  });

  columns
    .filter(({ type }) => type === "boolean")
    .forEach(({ name }) => {
      const columnIndex = columns.findIndex((col) => col.name === name) + 1; // Tìm đúng chỉ số cột
      rows.forEach((_, rowIndex) => {
        const cell = worksheet.getCell(rowIndex + 2, columnIndex); // Bỏ qua tiêu đề (hàng 1)
        const currentValue = cell.value; // Lưu giá trị hiện tại của ô
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ['"TRUE,FALSE"'], // Danh sách giá trị hợp lệ
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        if (currentValue === "TRUE" || currentValue === "FALSE") {
          cell.value = currentValue;
        } else {
          cell.value = "FALSE"; // Giá trị mặc định nếu không có
        }
      });
    });

  let buffer: ArrayBuffer | undefined;
  let blob: Blob | MediaSource;
  if (typefile == "csv") {
    buffer = await workbook.csv.writeBuffer();
    blob = new Blob([buffer], { type: "text/csv;charset=utf-8;" });
  } else {
    buffer = await workbook.xlsx.writeBuffer();
    blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }
  // Xuất file Excel
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href)
}

export async function importFromExcel<T extends RowTypes>(
  columns: AdjustColumn[],
  rows: T[],
  file: File | null,
  setRows: (row: T[]) => void,
  setFile: (file: File | null) => void,
  messageApi: MessageInstance
) {
  if (!file) return;
  try {
    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0]; // Lấy sheet đầu tiên
    if (!worksheet) {
      messageApi.error("Không tìm thấy sheet trong file Excel!");
      return;
    }
    // Lấy tiêu đề cột từ hàng đầu tiên
    const headers: string[] = [];
    worksheet.getRow(1).eachCell((cell) => {
      headers.push(cell.text.toString());
    });

    // Lấy dữ liệu từ các hàng tiếp theo
    const newRows: T[] = [];
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return; // Bỏ qua hàng tiêu đề
      const rowData: any = {};
      row.eachCell((cell, colIndex) => {
        const header = headers[colIndex - 1]; // Lấy tiêu đề cột tương ứng
        const column = columns.find(({ name }) => name === header);
        if (column) {
          const { key, type, optlist } = column;
          if (type === "select" && optlist) {
            rowData[key] = findValueOpt(optlist, cell.text.toString());
          } else if (type === "date") {
            rowData[key] = cell.value ? new Date(cell.value as string) : null;
          } else if (type === "boolean") {
            rowData[key] = (cell.value || ["TRUE","true","X"].includes(cell.text))
          } else {
            rowData[key] = cell.value;
          }
        }
      });
      newRows.push(rowData);
    });
    // Cập nhật dữ liệu
    const updatedRows = [...rows];
    const primaryCols = columns.filter(({ primary }) => primary);
    newRows.forEach((newRow) => {
      const existingRowIndex = updatedRows.findIndex((row) =>
        checkSame(primaryCols, row, newRow)
      );
      if (existingRowIndex !== -1) {
        // Ghi đè dữ liệu trong Excel lên bảng
        updatedRows[existingRowIndex] = {
          ...updatedRows[existingRowIndex],
          ...newRow,
          isEdit: true,
        };
      } else {
        // Thêm vào các hàng cuối
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
  } catch (error) {
    console.error(error);
    messageApi.error("Có lỗi xảy ra khi xử lý tệp Excel!");
  }
  setFile(null); // Xóa file sau khi xử lý
}


