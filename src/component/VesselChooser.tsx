import { Modal } from "antd";
import { columns } from "../types/Vessel";
import DataList from "./DataList";

interface VesselChooserProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

export default function VesselChooser({ open, onClose, onSave }: Readonly<VesselChooserProps>) {
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
        category="vessels"
        columns={columns}
        buttonList={[]}
        tableMode="choose"
        setResult={onFinish}
      />
    </Modal>
  );
}
