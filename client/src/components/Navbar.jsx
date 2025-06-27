import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-50 border-b border-gray-200 py-3 px-6 flex gap-6">
        <a href="/recent" className="text-blue-600 hover:underline">
          Recent
        </a>
        <a href="/popular" className="text-blue-600 hover:underline">
          Popular
        </a>
        <a href="/following" className="text-blue-600 hover:underline">
          Following
        </a>
      </nav>
    </>
  );
};

export default Navbar;
