import { message, Modal } from "antd";
import Container, { columns } from "../types/Container";
import DataList from "./DataList";
import { useEffect, useState } from "react";
import { loadDataSelect } from "../lib/loading";
import loadData from "../lib/LoadTable";

interface ContainerChooserProps {
  open: boolean;
  onClose: () => void;
  onSave: (containers: Set<Container>) => void;
  amount: number;
  query: string;
  startList?: Set<Container>;
}

const category = "containers";

export default function ContainerChooser({
  open,
  onClose,
  onSave,
  amount,
  query,
}: Readonly<ContainerChooserProps>) {
  const [selectedRows, setSelectedRows] = useState(new Set<Container>());
  const [messageApi, contextHolder] = message.useMessage();
  const [rows, setRows] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  useEffect(() => {
    loadData(category, columns, setRows);
    setUpdateStatus(false);
  }, [updateStatus]);

  const onFinish = () => {
    console.log(selectedRows);
    if (selectedRows.size > amount) {
      messageApi.error("Vượt quá số lượng container đã đăng kí");
    } else {
      onSave(selectedRows);
      onClose();
    }
  };

  useEffect(() => {
    const loadCompanyList = async () => {
      columns[0].optlist = await loadDataSelect("operations");
    };
    loadCompanyList();
    setSelectedRows(new Set()); //Reset lại mỗi lần thay đổi hãng hoặc kích cỡ
  }, [query]);

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
        category={category}
        columns={columns}
        exRows={rows}
        setUpdateStatus={setUpdateStatus}
        updateStatus={updateStatus}
        buttonList={[]}
        tableMode="multiselect"
        query={query}
        resultList={selectedRows}
      />
    </Modal>
  );
}
