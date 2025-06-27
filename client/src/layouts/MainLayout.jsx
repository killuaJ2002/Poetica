import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans min-h-screen">
      <Hero />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
