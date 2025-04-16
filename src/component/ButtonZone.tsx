import {
  Button,
  Divider,
  Dropdown,
  MenuProps,
  message,
  Space,
  Upload,
} from "antd";

import {
  DeleteOutlined,
  SaveOutlined,
  PlusCircleOutlined,
  FileExcelOutlined,
  ImportOutlined,
  DownOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { csvType, xlsType, xlsxType } from "../lib/function";

export default function ButtonZone(
  setAddRowDialog: (dialog: boolean) => void,
  handleDelete: () => void,
  handleUpdate: () => void,
  handleRawExcel: () => void,
  handleFileChange: (info: any) => void,
  handleExport: (type: string) => void,
  buttonList?: string[]
) {
  const [messageApi, contextHolder] = message.useMessage();
  const checkFileType = (file: File) => {
    const isValidFileType = [xlsxType, xlsType, csvType].includes(file.type)
    if (!isValidFileType) {
      messageApi.error("Chỉ chấp nhận tệp xls, xlsx hoặc csv");
    }
    return isValidFileType || Upload.LIST_IGNORE;
  };
  const handleDownloadClick: MenuProps["onClick"] = (e) => {
    handleExport(e.key);
  };
  const items: MenuProps["items"] = [
    {
      label: "Xuất Excel 2007+ (XLSX)",
      key: "xlsx",
      icon: <FileExcelOutlined />,
    },
    {
      label: "Xuất Excel 97-2003 (XLS)",
      key: "xls",
      icon: <FileExcelOutlined />,
    },
    {
      label: "Xuất CSV",
      key: "csv",
      icon: <FileTextOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleDownloadClick,
  };
  return (
    <Space size={1} split={<Divider type="vertical" />}>
      {contextHolder}
      {buttonList?.includes("add") && (
        <Button
          variant="outlined"
          color="blue"
          icon={<PlusCircleOutlined />}
          onClick={() => setAddRowDialog(true)}
        >
          Thêm dòng
        </Button>
      )}
      {buttonList?.includes("delete") && (
        <Button
          variant="outlined"
          color="red"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        >
          Xóa
        </Button>
      )}
      {buttonList?.includes("save") && (
        <Button
          variant="outlined"
          color="green"
          icon={<SaveOutlined />}
          onClick={handleUpdate}
        >
          Lưu
        </Button>
      )}
      {buttonList?.includes("template") && (
        <Button
          type="default"
          icon={<FileExcelOutlined />}
          onClick={handleRawExcel}
        >
          Excel mẫu
        </Button>
      )}
      {buttonList?.includes("upload") && (
        <Upload
          beforeUpload={checkFileType}
          accept={".xlsx, .xls, .csv"}
          maxCount={1}
          onChange={handleFileChange}
          showUploadList={false}
        >
          <Button type="default" icon={<ImportOutlined />}>
            Nhập file
          </Button>
        </Upload>
      )}
      {buttonList?.includes("download") && (
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              Xuất file
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      )}
    </Space>
  );
}
