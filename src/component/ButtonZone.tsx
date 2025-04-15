import { Button, Divider, Dropdown, MenuProps, message, Space, Upload } from "antd";

import {
  DeleteOutlined,
  SaveOutlined,
  PlusCircleOutlined,
  FileExcelOutlined,
  ExportOutlined,
  ImportOutlined,
  DownOutlined,
} from "@ant-design/icons";

export default function ButtonZone (
  setAddRowDialog: (dialog: boolean) => void,
  handleDelete: () => void,
  handleUpdate: () => void,
  handleRawExcel: () => void,
  handleFileChange: (info: any) => void,
  handleExportExcel: () => void,
  handleExportCSV: () => void,
  buttonList?: string[],
) {
  const [messageApi, contextHolder] = message.useMessage();
  const checkFileType = (file: File) => {
    const isXLSX =
      file.type ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isXLSX) {
      messageApi.error("Chỉ chấp nhận tệp xls/xlsx");
    }
    return isXLSX || Upload.LIST_IGNORE;
  };
  const items: MenuProps['items'] = [
    {
      label: 'Xuất Excel',
      key: 'XLSX',
      icon: <ExportOutlined />,
      onClick: handleExportExcel
    },
    {
      label: 'Xuất CSV',
      key: 'CSV',
      icon: <ExportOutlined />,
      onClick: handleExportCSV
    },
  ];
  const menuProps = {
    items
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
        accept={".xlsx, .xls"}
        onChange={handleFileChange}
        showUploadList={false}
      >
        <Button type="default" icon={<ImportOutlined />}>
          Nhập Excel
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
);}