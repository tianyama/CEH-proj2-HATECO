import { Modal, Input, Form, Button, Row, FormProps } from "antd";
import { useEffect, useState } from "react";
import {
  DateInputForm,
  InputForm,
  NumberForm,
  SelectElement,
  SelectTable,
} from "./ui/InputFormElements";
import { bkEditFormList } from "../lib/bookingFormList";
import { SyncOutlined } from "@ant-design/icons";
import ContainerChooser from "./ContainerChooser";
import VesselChooser from "./VesselChooser";
import Booking from "../types/Booking";
import Vessel from "../types/Vessel";
interface BookingEditFormProps {
  open: boolean;
  row: Booking; // Dữ liệu dòng được chỉnh sửa
  onClose: () => void; // Hàm đóng modal
  onSave: (updatedRow: any) => void; // Hàm lưu dữ liệu
}

export default function BookingEditForm ({ open, row, onClose, onSave }: Readonly<BookingEditFormProps>) {
  const [form] = Form.useForm();

  // Khi `row` thay đổi, đặt giá trị ban đầu cho form
  useEffect(() => {
    if (row) {
      form.setFieldsValue(row);
    }
  }, [row, form]);

  const [openTableSelect, setOpenTableSelect] = useState("");
  const EL_bookingAmount = Form.useWatch('EL_bookingAmount', form)
  const EL_containerNo = Form.useWatch('EL_containerNo', form)
  console.log('b',EL_containerNo)
  const [vessel, setVessel] = useState<Vessel>();
  
  const handleShowTable = (category?: string) => {
    setOpenTableSelect(category ?? "");
  };

  const handleSaveVessel = (value) => {
    setVessel(value);
    setOpenTableSelect("");
    form.setFieldValue("EL_vesselKey", value.vesselName);
  };

  const handleSaveContainer = (value) => {
    const result = Array.from(value);
    form.setFieldValue("EL_containerNo", result.map((item) => item.containerNo))
    setOpenTableSelect("");
  };

  const onFinish = (values: FormProps<any>["onFinish"]) => {
    const updatedRow = {
      ...row,
      ...values, // Cập nhật giá trị mới từ form
      vesselName: vessel?.vesselName,
    };
    onSave(updatedRow); // Gọi hàm lưu dữ liệu
    onClose(); // Đóng modal
  };

  return (
    <Modal
      width={'80%'}
      title={"Thêm dữ liệu"}
      open={open}
      footer={null}
      onCancel={onClose}
    >
      <p>Điều chỉnh booking:</p>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 0]}>
          {bkEditFormList.map((arr) =>
            arr.type === "select" ? (
              <SelectElement
                name={arr.name}
                label={arr.label}
                optlist={arr.optlist ?? []}
                width={arr.width}
                required={arr.required}
                disabled={arr.disabled}
              />
            ) : arr.type === "string" ? (
              <InputForm
                name={arr.name}
                label={arr.label}
                width={arr.width}
                required={arr.required}
                disabled={arr.disabled}
              />
            ) : arr.type === "number" ? (
              <NumberForm
                name={arr.name}
                label={arr.label}
                width={arr.width}
                required={arr.required}
                disabled={arr.disabled}
              />
            ) : arr.type === "date" ? (
              <DateInputForm
                name={arr.name}
                label={arr.label}
                width={arr.width}
                required={arr.required}
                disabled={arr.disabled}
              />
            ) : arr.type === "seltable" ? (
              <SelectTable
                name={arr.name}
                label={arr.label}
                width={arr.width}
                required={arr.required}
                disabled={arr.disabled}
                handleCheck={() => handleShowTable(arr.optTable)}
                value={form.getFieldValue(arr.name)}
              />
            ) : undefined
          )}
        </Row>
        <Form.Item style={{ alignItems: "center", marginTop: 20 }}>
          <Button
            variant="outlined"
            color="orange"
            icon={<SyncOutlined />}
            htmlType="submit"
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
      <VesselChooser
        open={openTableSelect == "VesselTable"}
        onClose={() => setOpenTableSelect("")}
        onSave={handleSaveVessel}
      />
      <ContainerChooser
        open={openTableSelect == "ContainerTable"}
        onClose={() => setOpenTableSelect("")}
        onSave={handleSaveContainer}
        amount={EL_bookingAmount}
        query={
          row?("&operationCode=" + row.operationCode + "&isoSizetype=" + row.isoSizeType):""
        }
      />
    </Modal>
  );
};