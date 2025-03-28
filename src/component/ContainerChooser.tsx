import { message, Modal } from "antd";
import { columns } from "../types/Container";
import DataList from "./DataList";
import { useEffect, useState } from "react";

interface ContainerChooserProps {
  open: boolean;
  onClose: () => void;
  onSave: (containers: Set<string>) => void;
  amount: number;
  query: string;
}

export default function ContainerChooser({
  open,
  onClose,
  onSave,
  amount,
  query,
}: Readonly<ContainerChooserProps>) {
  const [selectedRows, setSelectedRows] = useState(new Set<string>());
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    setSelectedRows(new Set()); //Reset lại mỗi lần thay đổi hãng hoặc kích cỡ
  },[query])
  const onFinish = () => {
    console.log(selectedRows);
    if (selectedRows.size > amount) {
      messageApi.error("Vượt quá số lượng container đã đăng kí");
    } else {
      onSave(selectedRows)
      onClose();
    }
  };
  return (
    <Modal
      width={"80%"}
      title={"Thêm dữ liệu"}
      open={open}
      onCancel={onClose}
      okText={"Lưu"}
      cancelText={"Hủy"}
      onOk={() => onFinish()}
    >
      {contextHolder}
      <DataList
        category="containers"
        columns={columns}
        buttonList={[]}
        tableMode="multiselect"
        query={query}
        resultList={selectedRows}
      />
    </Modal>
  );
}
