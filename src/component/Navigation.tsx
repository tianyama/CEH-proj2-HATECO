import { useEffect, useState } from "react";
import { Layout, Menu, Row, Col, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { ArrCategories } from "../lib/listcategories.tsx";

const { Sider, Content } = Layout;

interface OnNavProps {
  readonly setCurSubCategory: (name: string) => void;
  readonly onHiddenNav: (hidden: boolean) => void;
}

const ListCategory = (
  name: string,
  openCategory: string,
  onCurrentCategory: (name: string) => void
) => (
  <Menu.Item
    key={name}
    onClick={() => {
      onCurrentCategory(name);
    }}
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
  name: string,
  icon: React.ReactElement,
  link: string,
  onHiddenNav: (hidden: boolean) => void,
  hidden: boolean,
  onCurSubCategory: (name: string) => void
) => (
  <Col span={8}>
    <NavLink
      to={link}
      style={{ color: "white" }}
      onClick={() => {
        onHiddenNav(!hidden);
        onCurSubCategory(name);
      }}
    >
      <Button block icon={icon} className="subcategory-button">
        <span style={{ paddingLeft: "10px", fontSize: "12px" }}>{name}</span>
      </Button>
    </NavLink>
  </Col>
);

export default function Navigation({
  onHiddenNav,
  setCurSubCategory,
}: OnNavProps) {
  const [hidden] = useState(true);
  const [openCategory, setOpenCategory] = useState("");
  const location = useLocation().pathname;
  const curLocation =
    location === "/"
      ? "Trang chủ"
      : ArrCategories.find((category) =>
          category.sub.some((subCategory) => subCategory.link === location)
        )?.sub.find((subCategory) => subCategory.link === location)?.name;
  useEffect(() => {
    setCurSubCategory(curLocation ?? "Trang chủ");
  }, [curLocation, setCurSubCategory]);

  const handleHidden = () => {
    onHiddenNav(hidden);
  };

  const handleCurrentCategory = (name: string) => {
    setOpenCategory(name);
  };

  const handleCurSubCategory = (name: string) => {
    setCurSubCategory(name);
  };

  return (
    <Layout
      style={{ position: "relative", top: 110, left: 0, right: 0, bottom: 0 }}
    >
      <Sider width={250} style={{ background: "#fff" }}>
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          {ArrCategories.map(({ name }) =>
            ListCategory(name, openCategory, handleCurrentCategory)
          )}
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content style={{ padding: 5, margin: 0, minHeight: 280 }}>
          <Row gutter={[24, 14]} style={{ color: "white" }}>
            {ArrCategories.find((data) => data.name === openCategory)?.sub.map(
              ({ name, icon, link }) =>
                ListSubCategory(
                  name,
                  icon,
                  link,
                  handleHidden,
                  hidden,
                  handleCurSubCategory
                )
            )}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
