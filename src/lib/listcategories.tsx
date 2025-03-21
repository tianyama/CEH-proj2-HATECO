import { PlusSquareOutlined } from "@ant-design/icons";
import LanguageList from "../pages/category/Language";
import Country from "../pages/category/Country";
import Vessel from "../pages/category/Vessel";
import PortList from "../pages/category/PortList";
import ContainerSize from "../pages/category/ContainerSize";
import CustomerType from "../pages/category/CustomerType";
import Refer from "../pages/config/Refer";
import ManageBooking from "../pages/shipping-line/ManageBooking";
import Operation from "../pages/category/Operation";
import JobMode from "../pages/category/JobMode";
import IMO from "../pages/category/IMO";

export const ArrCategories = [
  {
    name: "Danh mục",
    sub: [
      {
        name: "Danh mục loại khách hàng",
        icon: <PlusSquareOutlined />,
        link: "/category/customer-type",
        page: <CustomerType />,
      },
      {
        name: "Danh mục khách hàng",
        icon: <PlusSquareOutlined />,
        link: "/category/customer",
      },
      {
        name: "Danh mục hãng khai thác",
        icon: <PlusSquareOutlined />,
        link: "/category/operation",
        page: <Operation />,
      },
      {
        name: "Danh mục kích cỡ",
        icon: <PlusSquareOutlined />,
        link: "/category/size-container",
        page: <ContainerSize />,
      },
      {
        name: "Danh mục công việc",
        icon: <PlusSquareOutlined />,
        link: "/category/works",
      },
      {
        name: "Danh mục phương án công việc",
        icon: <PlusSquareOutlined />,
        link: "/category/job-mode",
        page: <JobMode />,
      },
      {
        name: "Danh mục loại hàng hóa",
        icon: <PlusSquareOutlined />,
        link: "/category/cargo-type",
        page: undefined,
      },
      {
        name: "Danh mục cảng",
        icon: <PlusSquareOutlined />,
        link: "/category/ports-list",
        page: <PortList />,
      },
      {
        name: "Danh mục tàu",
        icon: <PlusSquareOutlined />,
        link: "/category/vessel",
        page: <Vessel />,
      },
      {
        name: "Danh mục IMO",
        icon: <PlusSquareOutlined />,
        link: "/category/imo",
        page: <IMO />
      },
      {
        name: "Danh mục cấu hình hàng hoá",
        icon: <PlusSquareOutlined />,
        link: "/category/commodity",
        page: undefined,
      },
      {
        name: "Danh mục quốc gia",
        icon: <PlusSquareOutlined />,
        link: "/category/country",
        page: <Country />,
      },
      {
        name: "Danh mục ngôn ngữ",
        icon: <PlusSquareOutlined />,
        link: "/category/language",
        page: <LanguageList />,
      },
    ],
  },
  {
    name: "Biểu cước",
    sub: [
      { name: "Biểu cước chuẩn", icon: <PlusSquareOutlined />, link: "/" },
      { name: "Hợp đồng giảm giá", icon: <PlusSquareOutlined />, link: "/" },
      { name: "Biểu cước bậc thang", icon: <PlusSquareOutlined />, link: "/" },
    ],
  },
  {
    name: "Cấu hình",
    sub: [
      { name: "Cấu hình duyệt lệnh", icon: <PlusSquareOutlined />, link: "" },
      {
        name: "Cấu hình miễn lưu bãi ngày lễ",
        icon: <PlusSquareOutlined />,
        link: "",
      },
      { name: "Cấu hình lưu bãi", icon: <PlusSquareOutlined />, link: "" },
      {
        name: "Cấu hình sử dụng điện",
        icon: <PlusSquareOutlined />,
        link: "/config/refer",
        page: <Refer />,
      },
      {
        name: "Cấu hình dịch vụ đính kèm",
        icon: <PlusSquareOutlined />,
        link: "",
      },
      {
        name: "Cấu hình phương thức thanh toán",
        icon: <PlusSquareOutlined />,
        link: "",
      },
      { name: "Cấu hình timeslot", icon: <PlusSquareOutlined />, link: "" },
      { name: "Cấu hình mail", icon: <PlusSquareOutlined />, link: "" },
      { name: "Cấu hình cảng", icon: <PlusSquareOutlined />, link: "" },
      { name: "Quản lý SFTP", icon: <PlusSquareOutlined />, link: "" },
    ],
  },
  {
    name: "Tác nghiệp",
    sub: [
      {
        name: "Lệnh giao container hàng",
        icon: <PlusSquareOutlined />,
        link: "",
      },
      {
        name: "Lệnh giao container rỗng",
        icon: <PlusSquareOutlined />,
        link: "",
      },
      {
        name: "Lệnh hạ container hàng",
        icon: <PlusSquareOutlined />,
        link: "",
      },
      {
        name: "Lệnh hạ container rỗng",
        icon: <PlusSquareOutlined />,
        link: "",
      },
      { name: "Lệnh đóng hàng", icon: <PlusSquareOutlined />, link: "" },
      { name: "Lệnh rút hàng", icon: <PlusSquareOutlined />, link: "" },
      { name: "Lệnh dịch vụ", icon: <PlusSquareOutlined />, link: "" },
      {
        name: "Đăng ký tách lô từ Master Bill",
        icon: <PlusSquareOutlined />,
        link: "",
      },
      { name: "Phân bổ nhà xe", icon: <PlusSquareOutlined />, link: "" },
    ],
  },
  { name: "Quản lý lệnh", sub: [] },
  {
    name: "Hãng tàu",
    sub: [
      { name: "Quản lý EDO", icon: <PlusSquareOutlined />, link: "" },
      { name: "Cập nhật EDO", icon: <PlusSquareOutlined />, link: "" },
      {
        name: "Quản lí booking",
        icon: <PlusSquareOutlined />,
        link: "/shipping-line/manager-booking",
        page: <ManageBooking />,
      },
    ],
  },
  { name: "Hải quan", sub: [] },
  { name: "Công cụ", sub: [] },
  { name: "Tra cứu", sub: [] },
  { name: "Thống kê - báo cáo", sub: [] },
  { name: "Quản trị hệ thống", sub: [] },
];
