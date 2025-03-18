import { Layout } from "antd";
import HeaderZone from "./component/Header";
import Footer from "./component/Footer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LanguageList from "./pages/category/LanguageList";
import JobModeList from "./pages/category/JobModeList";
import ReferList from "./pages/config/ReferList";
import ContainerList from "./pages/category/ContainerList";
import Home from "./pages/Home";
import E404 from "./pages/E404";

const { Header, Content } = Layout;

const HeadFoot = () => (
  <>
    <HeaderZone />
    <Outlet />
    <Footer />
  </>
)

export default function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ backgroundColor: "#f4f4f4" }}>
          <Routes>
            <Route path="*" element={<E404 />} />
            <Route element={<HeadFoot />}>
              <Route index element={<Home />} />
              <Route path="/category/container" element={<ContainerList />} />
              <Route path="/category/language" element={<LanguageList />} />
              <Route path="/category/job-mode" element={<JobModeList />} />
              <Route path="/config/refer" element={<ReferList />} />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
