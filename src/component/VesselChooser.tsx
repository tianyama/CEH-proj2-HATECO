import { Modal } from "antd";
import { columns } from "../types/Vessel";
import DataList from "./DataList";
import { useState, useEffect } from "react";
import loadData from "../lib/LoadTable";

const category = "vessels";

interface VesselChooserProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

export default function VesselChooser({
  open,
  onClose,
  onSave,
}: Readonly<VesselChooserProps>) {
  const [rows, setRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);
  const onFinish = (values: any) => {
    onSave(values); // Gọi hàm lưu dữ liệu
    onClose(); // Đóng modal
  };
  return (
    <Modal
      width={"80%"}
      title={"Thêm dữ liệu"}
      open={open}
      footer={null}
      onCancel={onClose}
    >
      <DataList
        category={category}
        columns={columns}
        exRows={rows}
        setUpdateStatus={setUpdateStatus}
        updateStatus={updateStatus}
        tableMode="choose"
        setResult={onFinish}
      />
    </Modal>
  );
}
