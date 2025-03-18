import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => (
  <AntFooter
    style={{
      height: 60,
      padding: "10px",
      backgroundColor: "rgb(83, 49, 131)",
    }}
  >
    <p className="footer-text">(C) 2024 HATECO . Powered by CEH</p>
    <p className="footer-text">Version 2.0</p>
  </AntFooter>
)

export default Footer;
