import { useState, useEffect, useCallback, useMemo } from "react";
import { DataGrid, RowsChangeData, SortColumn } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { Button, Input, Space, Upload, message, Divider, Row, Col } from "antd";
import {
  DeleteOutlined,
  SaveOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FileExcelOutlined,
  ExportOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import {
  fetchData,
  batchDeleteItem,
  batchAddItem,
  batchUpdateItem,
} from "../lib/api";
import { AddRowDialog, Confirm } from "./ui/Popup";
import { exportRawExcel, exportToExcel } from "../lib/exportXLSX";
import { addRow, editRow, newRow } from "../lib/updateTable";
import { NoData } from "./ui/NoData";
import * as XLSX from "xlsx";
import { adjustColumns } from "./ui/column";
import DataListProps from "../types/DataListProps";
import BookingEditForm from "./BookingEditForm";

export default function DataList({
  category,
  columns,
  buttonList,
  Filename,
  query,
  tableMode,
  setResult,
  resultList
}: Readonly<DataListProps>) {
  const [rows, setRows] = useState<any[]>([]);
  const [selectRows, setSelectRows] = useState(
    (): Set<string> => new Set()
  );
  const [rowsOLD, setRowsOLD] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [addRowDialog, setAddRowDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [changeRows, setChangeRows] = useState((): Set<string> => new Set());
  const [messageApi, contextHolder] = message.useMessage();
  const [dialog, setDialog] = useState(0);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  
  //Dành cho table có form chỉnh sửa riêng
  const [editFormRow, setEditForm] = useState(); // Dòng được chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Trạng thái mở modal

  // Hàm mở modal và truyền dữ liệu dòng
  const loadData = () => {
    if ((category==="booking"||category === "size-types") && !query ) {
        setRowsOLD([]);
        setRows([]);
    } else {
    fetchData(category, query).then((data) => {
      setRowsOLD(
        data.map((item: object, index: number) => ({
          ...item,
          rowID: index + 1,
        }))
      );
      setRows(
        data.map((item: object, index: number) => ({
          ...item,
          rowID: index + 1,
        }))
      );  
    });}
  };

  useEffect(() => {
    loadData();
  }, [query]);

  const filterRows = useMemo(() => {
    if (searchText === "") {
      return rows;
    } else {
      const filteredRows = rows.filter((row) => {
        for (const x in columns) {
          if (columns[x].optlist != undefined) {
            if (
              columns[x].optlist
                .find((i) => i.value == row[columns[x].key])
                ?.label.toLowerCase()
                .includes(searchText.toLowerCase())
            )
              return true;
          } else if (columns[x].type != "boolean") {
            if (
              row[columns[x].key]
                .toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
              return true;
          }
        }
      });
      return (
        filteredRows.map((item, index) => ({ ...item, rowID: index + 1 }))
      );
    }
  },
  [rows, searchText])

  const handleAddRow = (number_rows: number) => {
    addRow(
      columns,
      number_rows,
      rows,
      newRow,
      setRows as (row: object[]) => void,
      setAddRowDialog
    );
  };

  const okButton = () => {
    switch (dialog){
      case 1:
        setDialog(0);
        deleteRow();
        break;
      case 2:
        setDialog(0);
        updateData();
        break;
      case 3:
        setDialog(0);
        importFromExcel();
        break;
      case 4:
        setDialog(0);
        loadData();
        messageApi.success(`Đã xóa thành công!`);
    }
  };

  const handleDelete = () => {
    console.log(selectRows)
    const newRows = rows.filter((item) => item._id.includes("New"))
    if (newRows.length+selectRows.size==0) {
      messageApi.info('Vui lòng chọn dòng cần xóa!')
    } else if (selectRows.size == 0) setDialog(4)
      else setDialog(1)
  }

  const deleteRow = async () => {
    const rowlist = [...selectRows];
    const remaingNewRows = rows.filter(
      (row) => !rowlist.includes(row._id) && row._id.includes("New")
    );
    const deleteRows = rows
      .filter((row) => rowlist.includes(row._id) && !row._id.includes("New"))
      .map((row) => ({ id: row._id, rowID: row.rowID }));
    const deleteResult = await batchDeleteItem(category, deleteRows);
    if (deleteResult.errors.length > 0) {
      messageApi.error(
        `Không thể xóa các dòng:${deleteResult.errors.map(
          (x) => x.error + ", "
        )}`,
        20
      );
    } else {
      messageApi.success(`Đã xóa thành công!`);
      loadData();
      setRows([
        ...rows,
        ...remaingNewRows.map((item, index) => ({
          ...item,
          rowID: rows.length + index + 1,
        })),
      ]);
    }
  };

  const handleUpdate = () => {
    const addRows = rows.filter((item) => item._id.includes("New"))
    if (addRows.length+changeRows.size==0) {
      messageApi.info('Không có dữ liệu cần cập nhật')
    }
    else setDialog(2)
  }

  const updateData = async () => {
    const addData = rows
      .filter((item) => item._id.includes("New"))
      .map((row) => {
        const { _id, rowID, ...rowData } = row;
        return { rowID: rowID, data: rowData };
      });
    const updateData = rows
      .filter((item) => changeRows.has(item._id))
      .map((row) => {
        const {
          _id,
          rowID,
          __v,
          createdAt,
          updatedAt,
          created_time,
          updated_time,
          ...rowData
        } = row;
        return { id: _id, rowID: rowID, data: rowData };
      });
    
    const addResult = await batchAddItem(category, addData);
    const updateResult = await batchUpdateItem(category, updateData);
    if (addResult.errors.length + updateResult.errors.length > 0) {
      if (addResult.errors.length > 0) {
        messageApi.error(
          `Không thể thêm các dòng:${addResult.errors.map((x) => x.rowID)}`,
          20
        );
      }
      if (updateResult.errors.length > 0) {
        messageApi.error(
          `Không thể cập nhật các dòng:${updateResult.errors.map(
            (x) => x.rowID
          )}`,
          20
        );
      }
    } else {
      messageApi.success(`Đã cập nhật thành công!`);
      setChangeRows(new Set());
      loadData();
    }
  };

  const handleRawExcel = () => exportRawExcel(columns, `Mẫu ${Filename}.xlsx`);

  const handleExportExcel = () =>
    exportToExcel(columns, rows, `${Filename}.xlsx`);

  const importFromExcel = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = jsonData[0] as string[];
      const rowsData = jsonData.slice(1);
      const newRows = rowsData.map((row) => {
        const rowData: any = {};
        headers.forEach((header, i) => {
          const column = adjustColumns(columns).find(
            (col) => col.name === header
          );
          if (column) {
            rowData[column.key] = (row as string[])[i];
          }
        });
        return rowData;
      });
      const updatedRows = [...rows];
      newRows.forEach((newRow) => {
        const existingRowIndex = updatedRows.findIndex(
          (row) => row.languageCode === newRow.languageCode
        );
        if (existingRowIndex !== -1) {
          // Ghi đè dữ liệu trong Excel lên bảng
          updatedRows[existingRowIndex] = {
            ...updatedRows[existingRowIndex],
            ...newRow,
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
    };
    reader.readAsArrayBuffer(file);
    setFile(null);
  };

  const checkFileType = (file: File) => {
    const isXLSX =
      file.type ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isXLSX) {
      messageApi.error("Chỉ chấp nhận tệp xls/xlsx");
    }
    return isXLSX || Upload.LIST_IGNORE;
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.file;
    if (selectedFile) {
      setFile(selectedFile);
      setDialog(3);
    }
  };

  const handleEdit = (updatedRows: any[], changes: RowsChangeData<any>) => {
    editRow(
      columns,
      updatedRows,
      changes,
      rowsOLD,
      changeRows,
      setRows as (row: object[]) => void
    );
  };

  const onSortColumnsChange = useCallback((sortColumns: SortColumn[]) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return filterRows;
    const { columnKey, direction } = sortColumns[0];
    let sortedRows = [...filterRows];
    switch (columns.find((x) => x.key == columnKey)?.type) {
      case "boolean":
      case "number":
        sortedRows = sortedRows.sort((a, b) => a[columnKey] - b[columnKey]);
        break;
      case "date":
        sortedRows = sortedRows.sort(
          (a, b) =>
            new Date(a[columnKey]).getTime() - new Date(b[columnKey]).getTime()
        );
        break;
      case "select": {
        const ss = columns.find((x) => x.key == columnKey)?.optlist;
        if (ss) {
          sortedRows = sortedRows.sort((a, b) =>
            (ss.find((x) => x.value == a[columnKey])?.label || "")
            .localeCompare(ss.find((x) => x.value == b[columnKey])?.label || "")
          );
        }
        break;
      }
      default:
        sortedRows = sortedRows.sort((a, b) =>
          a[columnKey].localeCompare(b[columnKey])
        );
    }
    return direction === "DESC" ? sortedRows.reverse() : sortedRows;
  }, [filterRows, sortColumns, columns]);

  const handleEditModalRow = (row) => {
    setEditForm(row);
    setIsEditModalOpen(true);
  };

  // Hàm đóng modal
  const handleCloseEditModal = () => {
    setEditForm(null);
    setIsEditModalOpen(false);
  };
  
  const ButtonZone = (buttonList: string[]) => (
    <Space
        size={1}
      split={<Divider type="vertical" />}
    >
      {buttonList.includes("add") ? (
        <Button
          variant="outlined"
          color="blue"
          icon={<PlusCircleOutlined />}
          onClick={() => setAddRowDialog(true)}
        >
          Thêm dòng
        </Button>
      ) : null}
      {buttonList.includes("delete") ? (
        <Button
          variant="outlined"
          color="red"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        >
          Xóa
        </Button>
      ) : null}
      {buttonList.includes("save") ? (
        <Button
          variant="outlined"
          color="green"
          icon={<SaveOutlined />}
          onClick={handleUpdate}
        >
          Lưu
        </Button>
      ) : null}
      {buttonList.includes("template") ? (
        <Button
          type="default"
          icon={<FileExcelOutlined />}
          onClick={handleRawExcel}
        >
          Excel mẫu
        </Button>
      ) : null}
      {buttonList.includes("upload") ? (
        <Upload
          beforeUpload={checkFileType}
          accept={".xlsx, .xls"}
          onChange={handleFileChange}
          showUploadList={false}
        >
          <Button type="default" icon={<ImportOutlined />}>
            Nhập Excel
          </Button>
        </Upload>
      ) : null}
      {buttonList.includes("download") ? (
        <Button
          type="default"
          icon={<ExportOutlined />}
          onClick={handleExportExcel}
        >
          Xuất Excel
        </Button>
      ) : null}
    </Space>
  );

  return (
    <div style={{ padding: 24, background: "#fff", height: "100%" }}>
      {contextHolder}
      <Row style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            style={{ width: "300px"}}
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col span={16} style={{ display: "flex", justifyContent: "flex-end" }}>
          {ButtonZone(buttonList)}
        </Col>
      </Row>
      <DataGrid
        className="hearder-bg"
        style={{ width: "100%" }}
        columns={adjustColumns(columns, tableMode, handleEditModalRow)}
        rows={sortedRows}
        rowKeyGetter={(row) => row._id}
        sortColumns={sortColumns}
        onSortColumnsChange={onSortColumnsChange}
        onRowsChange={handleEdit}
        selectedRows={selectRows}
        onSelectedRowsChange={setSelectRows}
        defaultColumnOptions={{
          resizable: true,
          sortable: true,
        }}
        onCellClick={(a,e)=>{
          if (tableMode!=null&&tableMode!="multiselect"){
            e.preventDefault()
            if (tableMode=="choose"){
              selectRows.clear()
              selectRows.add(a.row._id)
            }
          }
          else if (tableMode=="multiselect"){
            if (resultList?.has(a.row)) resultList?.delete(a.row); 
            else resultList?.add(a.row)
          }
        }}
        onCellDoubleClick={(a,e)=>{
          if (tableMode!=null){
            e.preventDefault()
            if (tableMode=="choose") setResult(a.row)
          }
        }}
        renderers={NoData(rowsOLD)}
      />
      <p>Số dòng: {filterRows.length}</p>
      <Confirm
        type={dialog}
        onConfirm={okButton}
        onCancel={() => setDialog(0)}
      />
      <AddRowDialog
        open={addRowDialog}
        onConfirm={handleAddRow}
        onCancel={() => setAddRowDialog(false)}
      />
      <BookingEditForm
        open={isEditModalOpen}
        row={editFormRow}
        onClose={handleCloseEditModal}
        onSave={(updatedRow: any) => {
          // Cập nhật dữ liệu dòng
          const updatedRows = rows.map((r) =>
            r._id === updatedRow._id ? updatedRow : r
          );
          setRows(updatedRows);
        }}
      />
    </div>
  );
}
