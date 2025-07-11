import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.displayName || "Guest";
  const initial = displayName.charAt(0).toUpperCase();

  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="bg-gray-50 border-b border-gray-100 py-8 px-6 flex justify-between items-center">
      {/* About (Left) */}
      <div className="w-1/4">
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
          About
        </p>
        <Link
          to="/about"
          className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
        >
          Learn more about Poetica
        </Link>
      </div>

      {/* Poetica (Middle) */}
      <div className="w-1/2 text-center">
        <h1 className="text-5xl font-light text-gray-900 mb-2">Poetica</h1>
        <p className="text-sm text-gray-600 font-light tracking-wide">
          where words find their rhythm
        </p>
      </div>

      {/* Profile & Login/Logout (Right) */}
      <div className="w-1/4 text-right flex items-center justify-end space-x-4">
        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm font-medium">{initial}</span>
          </div>
          <span className="text-sm text-gray-700 font-light">
            {displayName}
          </span>
        </div>

        {/* Login/Logout Button */}
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
};

export default Hero;
