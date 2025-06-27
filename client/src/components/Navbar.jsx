import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-50 border-b border-gray-200 py-3 px-6 flex gap-6">
        <Link to="/recent" className="text-blue-600 hover:underline">
          Recent
        </Link>
        <Link to="/popular" className="text-blue-600 hover:underline">
          Popular
        </Link>
        <Link to="/following" className="text-blue-600 hover:underline">
          Following
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
