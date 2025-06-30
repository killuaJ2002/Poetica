import React, { useState } from "react";
import Hero from "../components/Hero";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans min-h-screen">
      <Hero />
      <Outlet />
    </div>
  );
};

export default MainLayout;
