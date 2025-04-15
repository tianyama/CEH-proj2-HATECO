import { Modal, Form, Button, Row, FormProps, Checkbox, Col } from "antd";
import { useEffect, useState } from "react";
import { FormElement } from "./ui/InputFormElements";
import { bkEditFormList } from "../lib/bookingFormList";
import { SyncOutlined } from "@ant-design/icons";
import ContainerChooser from "./ContainerChooser";
import VesselChooser from "./VesselChooser";
import Booking from "../types/Booking";
import Vessel from "../types/Vessel";
import Container from "../types/Container";
import { loadDataSelect } from "../lib/loading";
import { fetchData } from "../lib/api";
import { SelectArrType } from "../lib/arrList";
import IMO from "../types/IMO";
import ContainerSize from "../types/ContainerSize";
interface BookingEditFormProps {
  open: boolean;
  row: Booking; // Dữ liệu dòng được chỉnh sửa
  onClose: () => void; // Hàm đóng modal
  onSave: (updatedRow: any) => void; // Hàm lưu dữ liệu
}

export default function BookingEditForm({
  open,
  row,
  onClose,
  onSave,
}: Readonly<BookingEditFormProps>) {
  const [form] = Form.useForm();
  const [openTableSelect, setOpenTableSelect] = useState("");
  const [imos, setImos] = useState<IMO[]>([]);
  const [imdgClasses, setImdgClasses] = useState<SelectArrType[]>([]);
  const [unno, setUnno] = useState<SelectArrType[]>([]);
  const [dangerous, setDangerous] = useState<boolean>(false);
  const bookingAmount = Form.useWatch("bookingAmount", form);
  const containerNo = Form.useWatch("containerNo", form);
  const bookingClass = Form.useWatch("bookingClass", form);
  console.log("b", containerNo);
  const [vessel, setVessel] = useState<Vessel>();
  const [sizeList, setSizeList] = useState<SelectArrType[]>([]);
  const [placards, setPlacards] = useState<SelectArrType[]>([]);
  const operationCode = Form.useWatch("operationCode", form);

  useEffect(() => {
    if (row) {
      if (row.bookingClass) setDangerous(true);
      else setDangerous(false);
      form.setFieldsValue(row);
    }
  }, [row, form]);

  useEffect(() => {
    const load = async () => {
      const companyList = await loadDataSelect("operations");
      const portList = await loadDataSelect("ports");
      bkEditFormList[2].optlist = companyList;
      bkEditFormList.slice(5, 8).forEach((i) => (i.optlist = portList));
    };
    load();
  }, []);

  useEffect(() => {
    fetchData("imos").then((data) => {
      const aaa: SelectArrType[] = [];
      data.map(({ imdgClass }: IMO) => {
        setImos(data);
        if (aaa.every(({ value }) => value != imdgClass))
          aaa.push({ value: imdgClass, label: imdgClass });
      });
      setImdgClasses(aaa);
    });
  }, []);

  useEffect(() => {
    form.resetFields(["unno", "placard"]);
    const aaa: SelectArrType[] = [];
    imos
      .filter(({ imdgClass }) => imdgClass == bookingClass)
      .forEach(({ un }) => {
        aaa.push({ value: un, label: un });
      });
    setUnno(aaa);
    const bbb: SelectArrType[] = [];
    imos
      .filter(({ imdgClass }) => imdgClass == bookingClass)
      .forEach(({ placard }) => {
        if (bbb.every(({ value }) => value != placard))
          bbb.push({ value: placard, label: placard });
      });
    setPlacards(bbb);
    if (bbb.length == 1) form.setFieldValue("placard", bbb[0].value);
    if (aaa.length == 1) form.setFieldValue("unno", aaa[0].value);
  }, [dangerous, bookingClass, imos]);

  // Khi `row` thay đổi, đặt giá trị ban đầu cho for

  useEffect(() => {
    if (operationCode) {
      fetchData("size-types", "&operationCode=" + operationCode).then(
        (data) => {
          const aaa: SelectArrType[] = [];
          data.map(({ isoSizetype, localSizetype }: ContainerSize) => {
            if (aaa.every(({ value }) => value != isoSizetype))
              aaa.push({
                value: isoSizetype,
                label: isoSizetype,
                var1: localSizetype,
              });
          });
          setSizeList(aaa);
        }
      );
    } else {
      setSizeList([]);
    }
  }, [operationCode]);

  const handleShowTable = (category?: string) => {
    setOpenTableSelect(category ?? "");
  };

  const handleSaveVessel = (value: Vessel) => {
    setVessel(value);
    setOpenTableSelect("");
    form.setFieldValue("vesselName", value.vesselName);
  };

  const handleSaveContainer = (value: Set<Container>) => {
    const result = Array.from(value);
    form.setFieldValue(
      "containerNo",
      result.map((item) => item.containerNo).toString()
    );
    setOpenTableSelect("");
  };

  const onFinish: FormProps<Booking>["onFinish"] = (values) => {
    const { placard, ...rest } = values;
    const updatedRow = {
      ...row,
      ...rest,
      vesselKey: vessel ? vessel.vesselCode : row.vesselKey,
    };
    onSave(updatedRow); // Gọi hàm lưu dữ liệu
    onClose(); // Đóng modal
  };

  const chooseList = (category: string) => {
    if (category == "isoSizetype") {
      return sizeList;
    } else if (category == "bookingClass") {
      return imdgClasses;
    } else if (category == "unno") {
      return unno;
    } else if (category == "placard") {
      return placards;
    }
  };

  return (
    <Modal
      width={"80%"}
      title={"Thêm dữ liệu"}
      open={open}
      footer={null}
      onCancel={onClose}
    >
      <p>Điều chỉnh booking:</p>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 0]}>
          {bkEditFormList
            .slice(0, dangerous ? undefined : -3)
            .map(
              ({
                type,
                name,
                label,
                width,
                required,
                disabled,
                optlist,
                optTable,
                col,
              }) =>
                type == "toggle" ? (
                  <Col span={24}>
                    <Checkbox
                      checked={dangerous}
                      onChange={() => setDangerous(!dangerous)}
                    >
                      {label}
                    </Checkbox>
                  </Col>
                ) : (
                  <FormElement
                    name={name}
                    label={label}
                    optlist={chooseList(name) ?? optlist ?? []}
                    type={type}
                    width={width}
                    col={col}
                    required={required}
                    disabled={disabled}
                    handleCheck={() => handleShowTable(optTable)}
                  />
                )
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
        amount={bookingAmount}
        query={
          row
            ? "&operationCode=" +
              row.operationCode +
              "&isoSizetype=" +
              row.isoSizetype
            : ""
        }
        //startList={row?.containerNo ? new Set<Container>(row.containerNo.split(",")) : null}
      />
    </Modal>
  );
}
