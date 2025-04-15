import { useState, useContext } from "react";
import { Layout, Typography, Button, Row, Col } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo-short.png";
import Navigation from "./Navigation";
import { NavContext } from "../lib/context";

const { Header: AntHeader } = Layout;

export default function HeaderZone() {
  const [curSubCategory, setCurSubCategory] = useState("Trang chủ");
  const [hidden, setHidden] = useState(true);
  return (
    <NavContext value={{open: [hidden, setHidden], category: [curSubCategory, setCurSubCategory]}}>
      <div hidden={hidden} className="navigatuion-zone">
        <Navigation />
      </div>
      <Header />
    </NavContext>
  );
}

function Header () {
  const [hidden, setHidden] = useContext(NavContext).open
  const [curSubCategory, setCurSubCategory] = useContext(NavContext).category
  return(
    <AntHeader className="ant-header-bg">
      <div className="white-header-bg" />
      <Row
        justify="space-between"
        align="middle"
        style={{ height: "100%", width: "100%", paddingRight: 0 }}
      >
        <Col span={16} className="center">
          <Link
            to="/"
            className="center"
            onClick={() => {
              setHidden(true);
              setCurSubCategory("Trang chủ");
            }}
          >
            <img src={logo} alt="Logo" style={{ height: 50 }} />
          </Link>
          <Typography.Title level={3} className="title-header">
            CẢNG CONTAINER QUỐC TẾ HATECO HẢI PHÒNG
          </Typography.Title>
        </Col>
        <Col span={8}>
          <Row gutter={16} align="middle" className="white-header-right-bg">
            <Col
              className="button-header-bg"
              style={{
                clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
              }}
            >
              <Link to="/" style={{ display: "flex" }}>
                <Button
                  type="link"
                  icon={<HomeOutlined />}
                  size="large"
                  style={{ color: "white" }}
                  className="button-header"
                  onClick={() => {
                    setHidden(true);
                    setCurSubCategory("Trang chủ");
                  }}
                />
              </Link>
            </Col>
            <Col
              className="button-header-bg"
              style={{
                clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
              }}
            >
              <Button
                type="link"
                icon={<MenuOutlined />}
                size="large"
                style={{ color: "white" }}
                className="button-header"
                onClick={() => {
                  setHidden(!hidden);
                }}
              >
                <Typography.Text className="category-text">
                  {curSubCategory}
                </Typography.Text>
              </Button>
            </Col>
            <Col>
              <Button
                type="link"
                icon={<PhoneOutlined />}
                size="large"
                style={{ color: "inherit" }}
              />
            </Col>
            <Col>
              <Button
                type="link"
                icon={<UserOutlined />}
                size="large"
                style={{ color: "inherit" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </AntHeader>
  )
};
