import Hero from "../components/Hero";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const MainLayout = () => {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans min-h-screen">
      <Hero />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
