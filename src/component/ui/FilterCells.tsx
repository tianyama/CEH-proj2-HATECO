import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  TimePicker,
} from "antd";
import {
  sign,
  SelectArrType,
  triBoolean,
  stringFilterOpt,
  selectFilterMode,
} from "../../lib/arrList";
import dayjs, { Dayjs } from "dayjs";
import { dateTime } from "../../lib/function";
import { useContext, useState } from "react";
import { FilterContext, FilterContextProp } from "../../lib/context";
import { SearchOutlined } from "@ant-design/icons";
import "../../styles/filterSelect.css";

const Compact = Space.Compact;

const props = {
  style: { width: "100%" },
  onClick: (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
}

const tagInputStyle = {
  ...props,
  mode: "tags",
  allowClear: true,
  open: false
}

const setVal = (
  [filters, setFilters]: FilterContextProp,
  key: string,
  position: string,
  value: string | number | boolean | Date | null | []
) =>
  setFilters({
    ...filters,
    [key]: { ...filters[key], [position]: value },
  });

const ToggleSign = (key: string, position: string) => {
  const filter = useContext(FilterContext);
  const res = filter[0][key][position];
  const pos = sign[position];
  return (
    <Button
      variant={pos.danger == res ? "solid" : "outlined"}
      color={pos.danger == res ? pos.color : "default"}
      style={{ width: "10%" }}
      onClick={(e) => {
        e.stopPropagation();
        setVal(filter, key, position, !res);
      }}
    >
      {pos[res.toString()]}
    </Button>
  );
};

const InputOption = (key: string) => {
  const filter = useContext(FilterContext);
  const { mode } = filter[0][key];
  return (
    <Select
      options={stringFilterOpt}
      defaultValue={mode}
      {...props}
      popupMatchSelectWidth={false}
      onChange={(v) => setVal(filter, key, "mode", v)}
    />
  );
};

const InputComponent = (key: string) => {
  const filter = useContext(FilterContext);
  const { text } = filter[0][key];
  return (
    <Select
      tokenSeparators={[",", ";"]} // Cho phép phân tách giá trị bằng dấu phẩy hoặc chấm phẩy
      value={text} // Giá trị hiện tại
      {...tagInputStyle} // Ngăn chặn sự kiện click lan ra ngoài
      onInputKeyDown={(e) => {
        if (e.key !== "Enter") e.stopPropagation()}} // Ngăn chặn sự kiện keydown lan ra ngoài
      onChange={(v) => setVal(filter, key, "text", v)} // Cập nhật giá trị khi thay đổi
    />
  );
};

export const InputFilter = (key: string) => (
  <Row gutter={[10, 5]}>
    <Col flex="0 0 100px">{InputOption(key)}</Col>
    <Col flex="1 1 200px">
      <Compact block>
        {ToggleSign(key, "aA")}
        {InputComponent(key)}
      </Compact>
    </Col>
  </Row>
);

const ToggleMode = (key: string, type: string) => {
  const filter = useContext(FilterContext);
  const { mode } = filter[0][key];
  return (
    <Radio.Group
      options={selectFilterMode[type]}
      defaultValue={mode}
      onChange={({ target }) => setVal(filter, key, "mode", target.value)}
    />
  );
};

const ToggleEqual = (key: string, position: string) => {
  const filter = useContext(FilterContext);
  const res = filter[0][key];
  return (
    <Checkbox
      defaultChecked={res[position]}
      onChange={({ target }) => setVal(filter, key, position, target.checked)}
    >
      Hiển thị giờ
    </Checkbox>
  );
};

function NumberListInput (key: string, [value, setValue]: any) {
  const filter = useContext(FilterContext);
  const res = filter[0][key];
  ;
  return (
      <Select
        searchValue={value.toString()}
        onSearch={(v)=> {setValue(v);console.log(value)}}
        defaultValue={res.equal}
        onInputKeyDown={(e) => {
          if (e.key !== "Enter") e.stopPropagation()
          console.log(e.key);
          if (e.key === "ArrowUp") {
            e.preventDefault(); // Ngăn chặn sự kiện keydown lan ra ngoài
            setValue((Number(value)+1).toString());
          }
          if (e.key === "ArrowDown") {
            e.preventDefault(); // Ngăn chặn sự kiện keydown lan ra ngoài
            setValue((Number(value)-1).toString());
          }

        }} // Ngăn chặn sự kiện keydown lan ra ngoài
        tokenSeparators={[",", ";", " "]} // Cho phép phân tách giá trị bằng dấu phẩy hoặc chấm phẩy
        onChange={(v) => {
          setVal(filter, key, "equal", v.map((i: string) => Number(i)));
          setValue("");
        }} // Cập nhật giá trị khi thay đổi
        {...tagInputStyle}
      />
  );
};

export const NumberInput = (key: string, position: string) => {
  const filter = useContext(FilterContext)
  const res = filter[0][key][position];
  return (
    <InputNumber
      style={{ width: "100%", textAlign: "center" }}
      defaultValue={res}
      onClick={(e) => e.stopPropagation()}
      onChange={(v) => {
        setVal(filter, key, position, v);
      }}
    />
  );
};

export const NumberFilter = (key: string) => {
  const { mode } = useContext(FilterContext)[0][key];
  const state = useState("")
  return (
    <>
      <div>{ToggleMode(key, "number")}</div>
      {!mode ? <Row gutter={[10, 5]}>
        <Col flex="1 1 100px">
          <Compact block>
            {ToggleSign(key, "minop")}
            {NumberInput(key, "min")}
          </Compact>
        </Col>
        <Col flex="1 1 100px">
          <Compact block>
            {ToggleSign(key, "maxop")}
            {NumberInput(key, "max")}
          </Compact>
        </Col>
      </Row> : 
      <Compact block>
        {ToggleSign(key, "eqop")}
        {NumberListInput(key, state)}
      </Compact>}
    </>
  );
};

export const CheckboxFilter = (key: string) => {
  const [filters, setFilters] = useContext(FilterContext);
  const res = triBoolean.findIndex((i) => i === filters[key]);
  return (
    <Checkbox
      indeterminate={filters[key] === null}
      checked={filters[key]}
      style={{ width: "100%", justifyContent: "center" }}
      onClick={({ shiftKey }) => {
        if (shiftKey)
          setFilters({ ...filters, [key]: triBoolean[(res + 1) % 3] });
        else setFilters({ ...filters, [key]: triBoolean[(res + 2) % 3] });
      }}
    />
  );
};

export const SelectFilter = (key: string, optList: SelectArrType[]) => {
  const filter = useContext(FilterContext);
  const { text } = filter[0][key];
  return (
    <>
      <div>{ToggleMode(key, "select")}</div>
      <Select
        onClick={(e) => e.stopPropagation()}
        options={optList}
        mode="multiple"
        allowClear
        showSearch
        optionFilterProp="label"
        defaultValue={text}
        style={{ width: "100%", height: "60%" }}
        onChange={(v) => setVal(filter, key, "text", v)}
      />
    </>
  );
};

const DateInputComponent = (key: string, position: string) => {
  const filter = useContext(FilterContext);
  const res = filter[0][key][position];
  const { time, mode } = filter[0][key];
  return (
    <DatePicker
      multiple={mode&&!time}
      maxTagCount="responsive"
      defaultValue={res&&res.length ? dayjs(res) : null}
      style={{ width: "100%", textAlign: "center" }}
      needConfirm={true}
      format={"YYYY-MM-DD HH:mm:ss"}
      showTime={time && { format: "HH:mm:ss" }}
      placeholder={mode ? "Ngày" : position == "min" ? "Từ ngày" : "Đến ngày"}
      onClick={(e) => e.stopPropagation()}
      panelRender={(node) => {
        return <>{node}<TimePicker
          format="HH:mm:ss"
        /></>
      }}
      onChange={(date) => {
        const req =(date.length === undefined) ? dateTime(date, time) : date.map((i: Dayjs) => dateTime(i, time));
        setVal(filter, key, position, req);
      }}
    />
  );
};

export const DateFilter = (key: string) => {
  const { mode } = useContext(FilterContext)[0][key];
  return (
    <>
      <Row>
        <Col flex="100px">{ToggleMode(key, "number")}</Col>
        <Col flex="100px">{ToggleEqual(key, "time")}</Col>
      </Row>
      <Row gutter={[10, 5]}>
        <Col flex="1 0 180px">
          <Compact block>
            {ToggleSign(key, mode ? "eqop" : "minop")}
            {DateInputComponent(key, mode ? "equal" : "min")}
          </Compact>
        </Col>
        <Col flex="1 0 180px" hidden={mode}>
          <Compact block>
            {ToggleSign(key, "maxop")}
            {DateInputComponent(key, "max")}
          </Compact>
        </Col>
      </Row>
    </>
  );
};
