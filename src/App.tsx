import { Layout } from "antd";
import HeaderZone from "./component/Header";
import Footer from "./component/Footer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import E404 from "./pages/E404";
import { ArrCategories } from "./lib/listcategories";

const { Header, Content } = Layout;

const AppLayout = () => (
  <>
    <HeaderZone />
    <Outlet />
    <Footer />
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ backgroundColor: "#f4f4f4" }}>
          <Routes>
            <Route path="*" element={<E404 />} />
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              {ArrCategories.map(({ sub }) =>
                sub.filter(({ page }) => page != undefined)
                  .map(({ link, page }) => <Route path={link} element={page} />)
              )}
            </Route>
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
