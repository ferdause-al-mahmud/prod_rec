import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop ";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop></ScrollToTop>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
