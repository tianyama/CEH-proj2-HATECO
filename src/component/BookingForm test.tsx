import { use, useEffect, useState } from "react";
import { bookingStatusList, SelectArrType } from "../lib/arrList";
import { Button, Form, FormProps, message, Row, Segmented, Typography } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import {
  CheckboxElement,
  DateInputForm,
  InputForm,
  NumberForm,
  SelectElement,
  SelectTable,
} from "./ui/InputFormElements";
import dayjs from "dayjs";

import { addItem, fetchData } from "../lib/api";
import { bkFormList, bkSearchFrm } from "../lib/bookingFormList";
import VesselChooser from "./VesselChooser";
import ContainerChooser from "./ContainerChooser";
import Vessel from "../types/Vessel";
import BookingSearch from "../types/BookingSearch";
import Container from "../types/Container";
import ContainerSize from "../types/ContainerSize";
import Booking from "../types/Booking";

interface BookingIOLoadProps {
  getParam: (value: string) => void;
}
interface BookingFormProps {
  segment: string;
  setSegment: (value: string) => void;
  getParam: (value: string) => void;
}

const BookingIOLoad = ({ getParam }: BookingIOLoadProps) => {
  const [openTableSelect, setOpenTableSelect] = useState("");
  const [form] = Form.useForm();
  form.setFieldValue("BL_fromDate", dayjs(new Date()));
  form.setFieldValue("BL_toDate", dayjs(new Date()));
  const handleShowTable = (category?: string) => {
    setOpenTableSelect(category ?? "");
  };

  const handleSaveVessel = (value: Vessel) => {
    setOpenTableSelect("");
    form.setFieldValue("BL_vesselKey", value.vesselName);
  };

  const onFinish: FormProps<BookingSearch>["onFinish"] = (v) => {
    getParam(
      bkSearchFrm
        .map((item) => {
          const res = v[item.name as keyof BookingSearch];
          return res
            ? `&${item.attribute}=${
                (item.type === "date") ? (res as Date).toISOString() : res
              }`
            : "";
        })
        .join("")
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={[10, 0]}>
        {bkSearchFrm.map((arr) =>
          arr.type === "select" ? (
            <SelectElement
              name={arr.name}
              label={arr.label}
              optlist={arr.optlist ?? []}
              width={arr.width}
              required={arr.required}
            />
          ) : arr.type === "string" ? (
            <InputForm
              name={arr.name}
              label={arr.label}
              width={arr.width}
              required={arr.required}
            />
          ) : arr.type === "number" ? (
            <NumberForm
              name={arr.name}
              label={arr.label}
              width={arr.width}
              required={arr.required}
            />
          ) : arr.type === "date" ? (
            <DateInputForm
              name={arr.name}
              label={arr.label}
              width={arr.width}
              required={arr.required}
            />
          ) : arr.type === "seltable" ? (
            <SelectTable
              name={arr.name}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              handleCheck={() => handleShowTable(arr.optTable)}
              value={form.getFieldValue(arr.name)}
            />
          ) : undefined
        )}
      </Row>
      <CheckboxElement
        name="BL_bookingStatus"
        label={<p style={{ textAlign: "center" }}>Trạng thái</p>}
        optlist={bookingStatusList}
        width={8}
      />
      <Form.Item style={{ alignItems: "center", marginTop: 20 }}>
        <Button
          variant="outlined"
          color="orange"
          icon={<SyncOutlined />}
          htmlType="submit"
        >
          Nạp dữ liệu
        </Button>
      </Form.Item>
      <VesselChooser
        open={openTableSelect == "VesselTable"}
        onClose={() => setOpenTableSelect("")}
        onSave={handleSaveVessel}
      />
    </Form>
  );
};

const BookingNewForm = ({ type }: { type: string }) => {
  const [openTableSelect, setOpenTableSelect] = useState("");
  const [form] = Form.useForm();
  const EL_bookingAmount = Form.useWatch("bookingAmount", form);
  const operationCode = Form.useWatch("operationCode", form);
  const isoSizetype = Form.useWatch("isoSizetype", form);
  form.setFieldValue("bookingDate", dayjs(new Date()));
  const [messageApi, contextHolder] = message.useMessage();
  const [vessel, setVessel] = useState<Vessel>();
  const [sizeList, setSizeList] = useState<SelectArrType[]>([]);

  useEffect(() => {
    form.resetFields(["containerNo", "pod", "pol"]);
  }, [type]);

  useEffect(() => {
    if (operationCode) {
      fetchData("size-types", "&operationCode=" + operationCode).then(
        (data) => {
          const aaa: SelectArrType[] = [];
          data.map((item: ContainerSize) => {
            if (aaa.every((x) => x.value != item.isoSizetype))
              aaa.push({
                value: item.isoSizetype,
                label: item.isoSizetype,
                var1: item.localSizetype,
              });
          });
          setSizeList(aaa);
        }
      );
    } else {
      setSizeList([]);
    }
    form.resetFields(["isoSizetype", "containerNo"]); // Reset dữ liệu khi chọn hãng khai thác
  }, [operationCode]);

  const handleShowTable = (category?: string) => {
    if (category == "ContainerTable") {
      if (!operationCode) {
        messageApi.error("Vui lòng chọn hãng khai thác");
        return;
      } else if (!isoSizetype) {
        messageApi.error("Vui lòng chọn kích cỡ");
        return;
      } else if (!EL_bookingAmount) {
        messageApi.error("Vui lòng nhập số lượng");
        return;
      }
    }
    setOpenTableSelect(category ?? "");
  };

  const handleSaveVessel = (value: Vessel) => {
    setOpenTableSelect("");
    setVessel(value);
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

  const onFinish: FormProps<Booking>["onFinish"] = (v) => {
    const newR = {
      bookingStatus: 0,
      bookingType: type == "Đóng hàng" ? 1 : 0,
      stackingAmount: 0,
      ...bkFormList.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: v[cur.name as keyof Booking] }),
        {}
      ),
      localSizetype: sizeList.find((x) => x.value == v.isoSizetype)?.var1,
      vesselKey: vessel?.vesselCode,
    };
    console.log("newR", newR);
    addItem("booking", newR);
  };

  const chooseList = (category?: string) => {
    if (category == "isoSizetype") {
      return sizeList;
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {contextHolder}
      <Row gutter={[10, 0]}>
        {bkFormList.map((arr) =>
          arr.type === "select" ? (
            <SelectElement
              name={arr.name}
              label={arr.label}
              optlist={chooseList(arr.name) ?? arr.optlist ?? []}
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
          Nạp dữ liệu
        </Button>
      </Form.Item>
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
          "&operationCode=" + operationCode + "&isoSizetype=" + isoSizetype
        }
      />
    </Form>
  );
};

export default function BookingForm({
  segment,
  setSegment,
  getParam,
}: Readonly<BookingFormProps>) {
  return (
    <div
      style={{
        padding: 12,
        background: "#fff",
        minHeight: 500,
        justifyContent: "center",
      }}
      className="custom-table"
    >
      <Segmented<string>
        block
        options={["Tra cứu", "Cấp rỗng", "Đóng hàng"]}
        onChange={(value) => {
          setSegment(value); // string
        }}
      />
      {segment == "Tra cứu" ? (
        <BookingIOLoad getParam={getParam} />
      ) : (
        <BookingNewForm type={segment} />
      )}
    </div>
  );
}
