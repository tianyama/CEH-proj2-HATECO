import { useState } from "react";
import { Input, InputNumber, Modal } from "antd";

interface ConfirmProps {
  onConfirm: () => void;
  type: number;
  onCancel: () => void;
}

const content = [
  { button: null, title: null, dialog: null },
  {
    button: "Xóa",
    title: "Xác nhận xóa",
    dialog: "Bạn có chắc chắn muốn xóa các mục đã chọn không?",
  },
  {
    button: "Cập nhật",
    title: "Xác nhận cập nhật",
    dialog: "Bạn có chắc chắn muốn cập nhật tất cả các mục?",
  },
  {
    button: "Thay thế",
    title: "Xác nhận cập nhật",
    dialog: "Bạn có chắc chắn muốn thay thế dữ liệu từ file Excel?",
  },
];

export const Confirm = ({ type, onConfirm, onCancel }: ConfirmProps) => (
  <Modal
    title={content[type].title}
    open={type != 0}
    okText={content[type].button}
    cancelText={"Hủy"}
    onOk={onConfirm}
    onCancel={onCancel}
  >
    {content[type].dialog}
  </Modal>
);

interface FormDialogProps {
  open: boolean;
  onConfirm: (value: number) => void;
  onCancel: () => void;
}

export const AddRowDialog = ({
  open,
  onConfirm,
  onCancel,
}: FormDialogProps) => {
  const [value, setValue] = useState<number>(0);
  return (
    <Modal
      width={400}
      title={"Thêm dữ liệu"}
      open={open}
      okText={"Thêm"}
      cancelText={"Hủy"}
      onOk={() => onConfirm(value)}
      onCancel={onCancel}
    >
      <p>Nhập số dòng:</p>
      <InputNumber
        //type="number"
        min={1}
        style={{ width: "96%", alignItems: "center" }}
        value={Math.abs(value)}
        onChange={(e) => {
          if (Number(e) < 0)
            setValue(Math.abs(Number(e)));
          else setValue(Math.floor(Number(e)));
        }}
      />
    </Modal>
  );
};
