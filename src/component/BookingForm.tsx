import { useEffect, useState } from "react";
import { bookingStatusList, SelectArrType } from "../lib/arrList";
import {
  Button,
  Form,
  FormProps,
  message,
  Row,
  Segmented,
} from "antd";
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

interface BookingFormProps {
  getParam: (value: any) => void;
}

const BookingIOLoad = ({ getParam }: BookingFormProps) => {
  const [openTableSelect, setOpenTableSelect] = useState("");
  const [form] = Form.useForm();

  const handleShowTable = (category?: string) => {
    setOpenTableSelect(category ?? "");
  };

  const handleSaveVessel = (value) => {
    setOpenTableSelect("");
    form.setFieldValue("BL_vesselKey", value.vesselName);
  };

  const onFinish = (v: FormProps<BookingSearch>["onFinish"]) => {
    getParam(
      (v?.BL_company ? "&operationCode=" + v.BL_company : "") +
        (v?.BL_fromDate ? "&fromDate=" + v.BL_fromDate.toISOString() : "") +
        (v?.BL_toDate ? "&toDate=" + v.BL_toDate.toISOString() : "")
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

const EmptyLoadForm = () => {
  const [openTableSelect, setOpenTableSelect] = useState("");
  const [form] = Form.useForm();
  const EL_bookingAmount = Form.useWatch("EL_bookingAmount", form);
  const EL_containerNo = Form.useWatch("EL_containerNo", form);
  const EL_company = Form.useWatch("EL_company", form);
  const EL_containersize = Form.useWatch("EL_containersize", form);
  form.setFieldValue("EL_fromDate", dayjs(new Date()));
  const [messageApi, contextHolder] = message.useMessage();
  const [vessel, setVessel] = useState<Vessel>();
  const [sizeList, setSizeList] = useState<SelectArrType[]>([]);

  useEffect(() => {
    if (EL_company) {
      fetchData("size-types", "&operationCode=" + EL_company).then((data) => {
        const aaa: SelectArrType[] = [];
        data.map((item: any) => {
          if (!aaa.find((x) => x.value == item.isoSizetype))
            aaa.push({
              value: item.isoSizetype,
              label: item.isoSizetype,
              var1: item.localSizetype,
            });
        });
        setSizeList(aaa);
      });
    } else {
      setSizeList([]);
    }
    form.resetFields(["EL_containersize", "EL_containerNo"]);// Reset dữ liệu khi chọn hãng khai thác
  }, [EL_company]);

  const handleShowTable = (category?: string) => {
    if (category == "ContainerTable") {
      if (!EL_company) {
        messageApi.error("Vui lòng chọn hãng khai thác");
        return;
      } else if (!EL_containersize) {
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
    form.setFieldValue("EL_vesselKey", value.vesselName);
  };

  const handleSaveContainer = (value) => {
    const result = Array.from(value);
    form.setFieldValue(
      "EL_containerNo",
      result.map((item) => item.containerNo).toString()
    );
    setOpenTableSelect("");
  };

  const onFinish = (v: FormProps<any>["onFinish"]) => {
    const newR = {
      bookingStatus: 0,
      bookingType: 0,
      stackingAmount: 0,
      ...bkFormList.reduce(
        (acc, cur) => ({ ...acc, [cur.attribute]: v[cur.name0] }),
        {}
      ),
      localSizetype: sizeList.find((x) => x.value == v.EL_containersize)?.var1,
      vesselName: vessel?.vesselName,
    };
    console.log('newR',newR);
    addItem("booking", newR);
  };

  const chooseList = (category?: string) => {
    if (category == "EL_containersize") {
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
              name={arr.name0}
              label={arr.label}
              optlist={chooseList(arr.name0) ?? arr.optlist ?? []}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
            />
          ) : arr.type === "string" ? (
            <InputForm
              name={arr.name0}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
            />
          ) : arr.type === "number" ? (
            <NumberForm
              name={arr.name0}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
            />
          ) : arr.type === "date" ? (
            <DateInputForm
              name={arr.name0}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
            />
          ) : arr.type === "seltable" ? (
            <SelectTable
              name={arr.name0}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
              handleCheck={() => handleShowTable(arr.optTable)}
              value={form.getFieldValue(arr.name0)}
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
          "&operationCode=" + EL_company + "&isoSizetype=" + EL_containersize
        }
      />
    </Form>
  );
};

const StuffingForm = () => {
  const [openTableSelect, setOpenTableSelect] = useState("");
  const [form] = Form.useForm();
  const S_bookingAmount = Form.useWatch("S_bookingAmount", form);
  const S_containerNo = Form.useWatch("S_containerNo", form);
  const S_company = Form.useWatch("S_company", form);
  const S_containersize = Form.useWatch("S_containersize", form);
  form.setFieldValue("EL_fromDate", dayjs(new Date()));
  const [messageApi, contextHolder] = message.useMessage();
  const [sizeList, setSizeList] = useState<any[]>([]);

  useEffect(() => {
    if (S_company) {
      fetchData("size-types", "&operationCode=" + S_company).then((data) => {
        const aaa: any[] = [];
        data.map((item: any) => {
          if (!aaa.find((x) => x.value == item.isoSizetype))
            aaa.push({
              value: item.isoSizetype,
              label: item.isoSizetype,
            });
        });
        setSizeList(aaa);
      });
    } else {
      setSizeList([]); // Xóa sizeList nếu EL_company không được chọn
    }
    form.resetFields(["S_containersize", "S_containerNo"]);
  }, [S_company]);

  const handleShowTable = (category?: string) => {
    if (category == "ContainerTable") {
      if (!S_company) {
        messageApi.error("Vui lòng chọn hãng khai thác");
        return;
      } else if (!S_containersize) {
        messageApi.error("Vui lòng chọn kích cỡ");
        return;
      } else if (!S_bookingAmount) {
        messageApi.error("Vuiện nhập số lượng");
        return;
      }
    }
    setOpenTableSelect(category ?? "");
  };
  const handleSaveVessel = (value) => {
    setOpenTableSelect("");
    form.setFieldValue("S_vesselKey", value.vesselName);
  };

  const handleSaveContainer = (value) => {
    const result = Array.from(value);
    form.setFieldValue(
      "S_containerNo",
      result.map((item) => item.containerNo).toString()
    );
    setOpenTableSelect("");
  };

  const onFinish = (v: FormProps<any>["onFinish"]) => {
    const newR = {
      bookingStatus: 0,
      bookingType: 1,
      stackingAmount: 0,
      ...bkFormList.reduce(
        (acc, cur) => ({ ...acc, [cur.attribute]: v[cur.name1] }),
        {}
      ),
      isoSizetype: v.S_containersize,
      vesselName: v.S_vesselKey,
    };
    console.log('newR',newR);
    addItem("booking", newR);
  };

  const chooseList = (category?: string) => {
    if (category == "EL_containersize") {
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
              name={arr.name1}
              label={arr.label}
              optlist={chooseList(arr.name0) ?? arr.optlist ?? []}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
            />
          ) : arr.type === "string" ? (
            <InputForm
              name={arr.name1}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
            />
          ) : arr.type === "number" ? (
            <NumberForm
              name={arr.name1}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
            />
          ) : arr.type === "date" ? (
            <DateInputForm
              name={arr.name1}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
            />
          ) : arr.type === "seltable" ? (
            <SelectTable
              name={arr.name1}
              label={arr.label}
              width={arr.width}
              required={arr.required}
              disabled={arr.disabled}
              handleCheck={() => handleShowTable(arr.optTable)}
              value={form.getFieldValue(arr.name1)}
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
        amount={S_bookingAmount}
        query={
          "&operationCode=" + S_company + "&localSizetype=" + S_containersize
        }
      />
    </Form>
  );
};

export default function BookingForm({ getParam }: BookingFormProps) {
  const [segment, setSegment] = useState("Tra cứu");
  const curForm = Form.useFormInstance()
  const C_company = Form.useWatch("EL_company", curForm);
  console.log('ooo',C_company);
  const C_containersize = Form.useWatch("EL_containersize", curForm);
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
      ) : segment == "Cấp rỗng" ? (
        <EmptyLoadForm />
      ) : (
        <StuffingForm />
      )}
    </div>
  );
}
