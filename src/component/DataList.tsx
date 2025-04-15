import {
  useState,
  useEffect,
  useMemo,
} from "react";
import { DataGrid, RowsChangeData, SortColumn } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { Input, message, Row, Col, Button, Space } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { cancelItem } from "../lib/api";
import { AddRowDialog, Confirm } from "./ui/Popup";
import {
  exportRawExcel,
  exportToCSV,
  exportToExcel,
  importFromCSV,
  importFromExcel,
} from "../lib/exportXLSX";
import {
  addRow,
  deleteRow,
  editRow,
  updateData,
  updateForm,
} from "../lib/updateTable";
import { adjustColumns } from "./ui/column";
import DataListProps from "../types/DataListProps";
import type RowTypes from "../types/RowTypes";
import BookingEditForm from "./BookingEditForm";
import Booking from "../types/Booking";
import ButtonZone from "./ButtonZone";
import { filterFunc, filterVal, search, sortFunc } from "../lib/sortAndFilter";
import { findRow, checkSame } from "../lib/function";
import { FilterContext, MessageContext } from "../lib/context";

export default function DataList<A extends RowTypes>({
  category,
  columns,
  exRows,
  updateStatus,
  setUpdateStatus,
  buttonList,
  Filename,
  tableMode,
  setResult,
  resultList,
}: Readonly<DataListProps>) {
  const [rows, setRows] = useState<A[]>([]);
  const [selectRows, setSelectRows] = useState((): Set<string> => new Set());
  const [searchText, setSearchText] = useState("");
  const [addRowDialog, setAddRowDialog] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [dialog, setDialog] = useState(0);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [editFormRow, setEditForm] = useState<Booking>(); // Dòng được chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Trạng thái mở modal
  const [newRows, setNewRows] = useState<A[]>([]);
  const [updateRows, setUpdateRows] = useState<A[]>([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFilters] = useState((): any => ({
    ...columns.reduce(
      (acc, { key, type }) => ({ ...acc, [key]: filterVal(type) }),
      {}
    ),
  }));

  useEffect(() => setRows(exRows), [category, exRows]);

  const sortFilterRows = useMemo(
    () => [...rows]
      .filter((r) => search(r, columns, searchText) && 
      (isFilter ? filterFunc(r, columns, filters) : true))
      .map((r, i) => ({ ...r, rowID: i + 1 }))
      .sort((a, b) => sortFunc(a, b, sortColumns, columns)),
    [rows, searchText, isFilter, filters, sortColumns, columns]
  );

  const handleAddRow = (number_rows: number) =>
    addRow<A>(
      columns,
      number_rows,
      rows,
      setRows as (row: object[]) => void,
      setAddRowDialog
    );

  const okButton = () => {
    switch (dialog) {
      case 1: {
        setDialog(0);
        const hideLoading = messageApi.loading("Đang xóa dữ liệu...", 0);
        console.log("rows", rows);
        deleteRow(category, rows, selectRows)
          .then(({ errDelete, resNewRows }) => {
            hideLoading();
            if (errDelete != 0) messageApi.error(errDelete);
            else {
              messageApi.success("Đã xóa thành công!");
              setUpdateStatus(true);
            }
            rows.push(
              ...resNewRows.map((row, i) => ({
                ...row,
                rowID: rows.length + i + 1,
              }))
            );
          })
          .catch(() => {
            hideLoading();
            messageApi.error("Có lỗi xảy ra khi xóa dữ liệu");
          });
        break;
      }
      case 2: {
        setDialog(0);
        const hideLoading = messageApi.loading("Đang cập nhật dữ liệu...", 0);
        updateData(category, newRows, updateRows)
          .then((res) => {
            hideLoading();
            if (res.length) {
              for (const i of res) messageApi.error(i);
            } else {
              messageApi.success("Đã cập nhật thành công!");
              setUpdateStatus(true);
              setNewRows([]);
              setUpdateRows([]);
            }
          })
          .catch(() => {
            hideLoading();
            messageApi.error("Có lỗi xảy ra khi cập nhật dữ liệu");
          });
        break;
      }
      case 3:
        setDialog(0);
        importFromExcel(columns, rows, file, setRows, setFile, messageApi);
        break;
      case 4:
        setDialog(0);
        setUpdateStatus(true);
        messageApi.success(`Đã xóa thành công!`);
    }
  };

  const handleCloseEditModal = () => {
    setEditForm(undefined);
    setIsEditModalOpen(false);
  };

  const handleEditModalRow = (row: Booking) => {
    setEditForm(row);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    newRows.push(...rows.filter(({ _id }) => _id.includes("New")));
    if (newRows.length + selectRows.size == 0) {
      messageApi.info("Vui lòng chọn dòng cần xóa!");
    } else if (selectRows.size == 0) setDialog(4);
    else setDialog(1);
  };

  const handleUpdate = () => {
    newRows.push(...rows.filter(({ _id }) => _id.includes("New")));
    rows
      .filter(({ isEdit }) => isEdit)
      .forEach((i) => {
        const rowOLD = findRow(exRows, i._id);
        if (rowOLD && !checkSame(columns, i, rowOLD)) {
          delete i.isEdit;
          updateRows.push(i);
        }
      });
    if (newRows.length + updateRows.length == 0) {
      messageApi.info("Không có dữ liệu cần cập nhật");
    } else setDialog(2);
  };

  const handleUpdateForm = async (updatedRow: any) =>
    updateForm(updatedRow, category, rows, setRows, messageApi);

  const handleRawExcel = () => exportRawExcel(columns, `Mẫu ${Filename}.xlsx`);

  const handleExportExcel = () =>
    exportToExcel(columns, rows, `${Filename}.xlsx`);

  const handleExportCSV = () =>
    exportToCSV(columns, rows, `${Filename}.csv`);

  const handleFileChange = ({ file }: any) => {
    const selectedFile = file?.originFileObj; // Lấy đối tượng File từ `originFileObj`
    const status = file?.status;
    console.log(status);
    if (selectedFile) {
      setFile(selectedFile);
      setDialog(3);
    } else {
      messageApi.error("Tệp không hợp lệ!");
    }
  };

  const handleEdit = (updatedRows: A[], changes: RowsChangeData<A, any>) =>
    setRows(editRow<A>(columns, updatedRows, rows, changes, messageApi));

  const handleEditButton = (row: A) => {
    if (category == "booking") {
      if (row.bookingStatus == 4) return false;
      else return true;
    } else return true;
  };

  const handleDeleteModalRow = async ({ _id }: A) => {
    try {
      if (category == "booking") {
        await cancelItem("booking/cancel-booking", _id);
      }
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi hủy dữ liệu");
    }
  };

  const onCellClick = ({ row }, e) => {
    if (!["editrow", "multiselect"].includes(tableMode)) {
      e.preventDefault();
      if (tableMode == "choose") {
        selectRows.clear();
        selectRows.add(row._id);
      }
    } else if (tableMode == "multiselect") {
      if (resultList?.has(row)) resultList?.delete(row);
      else resultList?.add(row);
    }
  };

  const onCellDoubleClick = ({ row }, e) => {
    if (tableMode != null) {
      e.preventDefault();
      if (tableMode == "choose" && setResult) setResult(row);
    }
  };

  return (
    <div style={{ padding: 24, background: "#fff", height: "100%" }}>
      <FilterContext value={[filters, setFilters]}>
      {contextHolder}
      <Row gutter={[5, 10]} style={{ marginBottom: 16 }}>
        <Col flex="1 0 200px">
          <Space>
            <Input
              allowClear
              style={{ width: "100%" }}
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant={isFilter ? "solid" : "outlined"} 
              color={isFilter ? "primary" : "default"}
              onClick={() => setIsFilter(!isFilter)}>
              <FilterOutlined />
            </Button>
          </Space>
        </Col>
        <Col flex="1 0 600px" style={{ display: "flex", justifyContent: "flex-end" }}>
          {ButtonZone(
            setAddRowDialog,
            handleDelete,
            handleUpdate,
            handleRawExcel,
            handleFileChange,
            handleExportExcel,
            handleExportCSV,
            buttonList
          )}
        </Col>
      </Row>
      <DataGrid
        className="hearder-bg"
        
        style={{ width: "100%" }}
        columns={adjustColumns(
          columns,
          tableMode,
          handleEditModalRow,
          handleDeleteModalRow,
          handleEditButton
        )}
        rows={sortFilterRows}
        rowKeyGetter={({ _id }) => _id}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        onRowsChange={handleEdit}
        selectedRows={selectRows}
        onSelectedRowsChange={setSelectRows}
        defaultColumnOptions={{
          resizable: true,
          sortable: true,
        }}
        onCellClick={onCellClick}
        onCellDoubleClick={onCellDoubleClick}
        //renderers={NoData(updateStatus, exRows, summaryRows)}
        summaryRowHeight={120}
        topSummaryRows={isFilter ? [filters] : null}
      />
      <p>Số dòng: {sortFilterRows.length}</p>
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
        onSave={handleUpdateForm}
      />
      </FilterContext>
    </div>
  );
}
