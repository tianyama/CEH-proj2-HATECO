import { Row, Col, Typography } from "antd";

export default function Home() {
  return (
    <Row gutter={14} style={{ padding: 10 }}>
      <Col span={6}>
        <div
          style={{
            borderRadius: 8,
            background: "#fff",
            height: 500,
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <Typography.Title
            level={5}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              width: "100%",
              fontSize: 30,
              margin: 0,
            }}
          >
            Thông tin người dùng
          </Typography.Title>
        </div>
      </Col>
      <Col span={18}>
        <div
          style={{
            borderRadius: 8,
            background: "#fff",
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></div>
      </Col>
    </Row>
  );
}
