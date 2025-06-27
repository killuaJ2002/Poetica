import React from "react";

const Hero = () => {
  return (
    <>
      <header className="bg-white shadow p-6 flex justify-between items-center">
        {/* About (Left) */}
        <div className="w-1/3">
          <p className="text-sm text-gray-600">About</p>
          <a href="/about" className="text-blue-600 hover:underline">
            Learn more about Poetica
          </a>
        </div>

        {/* Poetica (Middle) */}
        <div className="w-1/3 text-center">
          <h1 className="text-4xl font-bold">Poetica</h1>
          <p className="text-sm italic text-gray-500 mt-1">
            where words find their rhythm
          </p>
        </div>

        {/* Logout Button (Right) */}
        <div className="w-1/3 text-right">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Hero;
