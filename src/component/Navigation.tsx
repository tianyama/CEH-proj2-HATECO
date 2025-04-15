import { useContext, useEffect, useState } from "react";
import { Layout, Menu, Row, Col, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { ArrCategories } from "../lib/listcategories.tsx";
import { NavContext } from "../lib/context.ts";

const { Sider, Content } = Layout;

interface SubCategory {
  readonly name: string;
  readonly icon: React.ReactElement;
  readonly link: string;
}

const ListCategory = (
  name: string,
  openCategory: string,
  onCurrentCategory: (name: string) => void
) => (
  <Menu.Item
    key={name}
    onClick={() => onCurrentCategory(name)}
    style={{
      backgroundColor: name === openCategory ? "white" : "#1b1f56",
      color: name === openCategory ? "black" : "white",
      fontWeight: "bold",
    }}
  >
    {name}
  </Menu.Item>
);

const ListSubCategory = (
  { name, icon, link }: SubCategory,
) => {
  const [hidden, setHidden] = useContext(NavContext).open
  const setCurSubCategory = useContext(NavContext).category[1]
  return(
    <Col span={24} sm={12} lg={8}>
      <NavLink
        to={link}
        style={{ color: "white" }}
        onClick={() => {
          setHidden(!hidden);
          setCurSubCategory(name);
        }}
      >
        <Button block icon={icon} className="subcategory-button">
          <span style={{ paddingLeft: "10px", fontSize: "12px" }}>{name}</span>
        </Button>
      </NavLink>
    </Col>
)}

export default function Navigation() {
  const setCurSubCategory = useContext(NavContext).category[1]
  const [openCategory, setOpenCategory] = useState("");
  const location = useLocation().pathname;
  const curLocation =
    location === "/"
      ? "Trang chủ"
      : ArrCategories.find(({ sub }) =>
          sub.some(({ link }) => link === location)
        )?.sub.find(({ link }) => link === location)?.name;
  useEffect(() => {
    setCurSubCategory(curLocation ?? "Trang chủ");
  }, [curLocation, setCurSubCategory]);

  return (
    <Layout className="navigation">
      <Sider width="18%" style={{ background: "#fff" }}>
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          {ArrCategories.map(({ name }) =>
            ListCategory(name, openCategory, setOpenCategory)
          )}
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 20px 20px" }}>
        <Content style={{ padding: 5, margin: 0, minHeight: 280 }}>
          <Row gutter={[24, 14]} style={{ color: "white" }}>
            {ArrCategories.find(({ name }) => name == openCategory)?.sub.map(
              (i) => ListSubCategory(i)
            )}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
