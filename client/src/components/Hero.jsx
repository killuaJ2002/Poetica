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
    <header className="bg-white border-b border-gray-200 py-6 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* About (Left) */}
        <div className="flex-1">
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors inline-flex items-center gap-1 group"
          >
            <span>About</span>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </Link>
        </div>

        {/* Poetica (Middle) */}
        <div className="flex-1 text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-light text-gray-900 mb-1 tracking-tight hover:text-gray-700 transition-colors">
              Poetica
            </h1>
            <p className="text-xs text-gray-500 font-light tracking-wider italic">
              where words find their rhythm
            </p>
          </Link>
        </div>

        {/* Profile & Login/Logout (Right) */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {/* Profile Section */}
          {user && (
            <div className="flex items-center gap-2.5 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-semibold">
                  {initial}
                </span>
              </div>
              <span className="text-sm text-gray-700 font-medium pr-1">
                {displayName}
              </span>
            </div>
          )}

          {/* Login/Logout Button */}
          <button
            onClick={handleClick}
            className={`text-sm px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow ${
              user
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
