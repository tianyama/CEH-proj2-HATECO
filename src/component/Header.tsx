import React from "react";
import { Layout, Typography, Button, Row, Col } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo-short.png";
import headerBg from "../assets/header_bg.jpg";
import Navigation from "./Navigation";

const { Header: AntHeader } = Layout;

interface HiddenNavProps {
  sethiddenNav: (hidden: boolean) => void;
  hidden: boolean;
  curSubCategory: string;
  setCurSubCategory: (name: string) => void;
}

const Header = ({
  sethiddenNav,
  hidden,
  curSubCategory,
  setCurSubCategory,
}: HiddenNavProps) => {
  return (
    <AntHeader
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#1b1f56",
        height: 100,
        position: "relative",
        zIndex: 1,
        width: "100%",
        paddingRight: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundColor: "rgba(192, 192, 192, 0.81)",
          zIndex: -1,
        }}
      />
      <Row
        justify="space-between"
        align="middle"
        style={{ height: "100%", width: "100%", paddingRight: 0 }}
      >
        <Col span={16} style={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              sethiddenNav(true);
              setCurSubCategory("Trang chủ");
            }}
          >
            <img src={logo} alt="Logo" style={{ height: 50 }} />
          </Link>
          <Typography.Title
            level={3}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              width: "90%",
              fontSize: 30,
              margin: 0,
            }}
          >
            CẢNG CONTAINER QUỐC TẾ HATECO HẢI PHÒNG
          </Typography.Title>
        </Col>
        <Col span={8}>
          <Row
            gutter={16}
            align="middle"
            style={{
              height: 100,
              backgroundColor: "rgba(255, 255, 255, 0.58)",
              paddingLeft: 20,
              paddingRight: 20,
              clipPath: `polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)`,
            }}
          >
            <Col
              style={{
                height: "50%",
                alignContent: "center",
                backgroundColor: "#1b1f56",
                clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
              }}
            >
              <Link to="/" style={{ display: "flex"}}>
                <Button
                  type="link"
                  icon={<HomeOutlined />}
                  size="large"
                  style={{ color: "white", paddingLeft: 20, paddingRight: 20 }}
                  onClick={() => {
                    sethiddenNav(true);
                    setCurSubCategory("Trang chủ");
                  }}
                />
              </Link>
            </Col>
            <Col
              style={{
                height: "50%",
                alignContent: "center",
                backgroundColor: "#1b1f56",
                clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
              }}
            >
              <Button
                type="link"
                icon={<MenuOutlined />}
                size="large"
                style={{ color: "white", paddingLeft: 20, paddingRight: 20 , display: "flex"}}
                onClick={() => {
                  sethiddenNav(!hidden);
                }}
              >
                <Typography.Text
                  style={{ paddingLeft: 8, color: "white", width: 200 }}
                >
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
  );
};

export default function HeaderZone() {
  const [curSubCategory, setCurSubCategory] = React.useState("Trang chủ");
  const [hidden, setHidden] = React.useState(true);
  return (
    <>
      <div
        hidden={hidden}
        style={{
          height: 800,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgb(255, 255, 255)",
          zIndex: 1,
        }}
      >
        <Navigation
          onHiddenNav={setHidden}
          setCurSubCategory={setCurSubCategory}
        />
      </div>
      <Header
        sethiddenNav={setHidden}
        hidden={hidden}
        curSubCategory={curSubCategory}
        setCurSubCategory={setCurSubCategory}
      ></Header>
    </>
  );
}
