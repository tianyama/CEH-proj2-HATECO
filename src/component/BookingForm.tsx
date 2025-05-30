import { useEffect, useState } from "react";
import { bookingStatusList, SelectArrType } from "../lib/arrList";
import { Button, Form, FormProps, message, Row, Segmented } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import {
  CheckboxElement,
  FormElement,
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
import { loadDataSelect } from "../lib/loading";

interface BookingFormProps {
  segment: string;
  setSegment: (value: string) => void;
  getParam: (value: string) => void;
  getNewRow: (value: any) => void;
}

interface BookingIOLoadProps {
  getParam: (value: string) => void;
}

interface BookingNewFormProps {
  type: string;
  getNewRow: (value: any) => void;
}

const BookingIOLoad = ({ getParam }: BookingIOLoadProps) => {
  const [openTableSelect, setOpenTableSelect] = useState("");
  const [form] = Form.useForm();
  if (!Form.useWatch("BL_fromDate", form))
    form.setFieldValue("BL_fromDate", dayjs(new Date()));
  if (!Form.useWatch("BL_toDate", form))
    form.setFieldValue("BL_toDate", dayjs(new Date()));
  const [companyList, setCompanyList] = useState<SelectArrType[]>([]);
  const [portList, setPortList] = useState<SelectArrType[]>([]);

  useEffect(() => {
    const load = async () => {
      setCompanyList(await loadDataSelect("operations"));
      setPortList(await loadDataSelect("ports"));
    };
    load();
  }, []);
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
        .map(({name, attribute, type}) => {
          const res = v[name as keyof BookingSearch];
          return res
            ? `&${attribute}=${
                type === "date" ? (res as Date).toISOString() : res
              }`
            : "";
        })
        .join("")
    );
  };

  const chooseList = (category: string) => {
    if (category == "BL_company") {
      return companyList;
    } else if (["BL_pod", "BL_pol", "BL_fpod"].includes(category)) {
      return portList;
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={[10, 0]}>
        {bkSearchFrm.map(
          ({type, name, label, width, required, disabled, optlist, optTable, col}) =>
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
    </Form>
  );
};

const BookingNewForm = ({ type, getNewRow }: BookingNewFormProps) => {
  const [openTableSelect, setOpenTableSelect] = useState("");
  const [form] = Form.useForm();
  const EL_bookingAmount = Form.useWatch("bookingAmount", form);
  const operationCode = Form.useWatch("operationCode", form);
  const isoSizetype = Form.useWatch("isoSizetype", form);
  form.setFieldValue("bookingDate", dayjs(new Date()));
  const [messageApi, contextHolder] = message.useMessage();
  const [vessel, setVessel] = useState<Vessel>();
  const [sizeList, setSizeList] = useState<SelectArrType[]>([]);
  const [companyList, setCompanyList] = useState<SelectArrType[]>([]);
  const [portList, setPortList] = useState<SelectArrType[]>([]);

  useEffect(() => {
    const load = async () => {
      setCompanyList(await loadDataSelect("operations"));
      setPortList(await loadDataSelect("ports"));
    };
    load();
  }, []);

  useEffect(() => {
    form.resetFields(["containerNo", "pod", "pol"]);
  }, [type, form]);

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
  }, [operationCode, form]);

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
      result.map((i) => i.containerNo).toString()
    );
    setOpenTableSelect("");
  };

  const onFinish: FormProps<Booking>["onFinish"] = (v) => {
    const newR = {
      bookingStatus: 0,
      bookingType: type == "Đóng hàng" ? 1 : 0,
      stackingAmount: 0,
      ...bkFormList.reduce(
        (acc, { name }) => ({ ...acc, [name]: v[name as keyof Booking] }),
        {}
      ),
      localSizetype: sizeList.find((x) => x.value == v.isoSizetype)?.var1,
      vesselKey: vessel?.vesselCode,
    };
    console.log("newR", newR);
    addItem("booking", newR).then((res) => getNewRow(res));
  };

  const chooseList = (category: string) => {
    if (category == "isoSizetype") {
      return sizeList;
    } else if (category == "operationCode") {
      return companyList;
    } else if (["pod", "pol", "fpod"].includes(category)) {
      return portList;
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {contextHolder}
      <Row gutter={[10, 0]}>
        {bkFormList.map(
          ({type, name, label, width, required, disabled, optlist, optTable, col}) =>
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
  getNewRow,
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
        <BookingNewForm type={segment} getNewRow={getNewRow} />
      )}
    </div>
  );
}
