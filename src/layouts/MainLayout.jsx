import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop ";
import Chatbot from "../components/Chatbot";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop></ScrollToTop>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Chatbot></Chatbot>
    </div>
  );
};

export default MainLayout;
