import React from "react";

const Poem = ({ poem }) => {
  return (
    <>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">{poem.title}</h2>
        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{poem.content}</p>
        <p className="mt-1 text-sm text-gray-500">
          by{" "}
          {poem.authorId?.displayName ||
            poem.authorId?.username ||
            "Unknown Author"}
        </p>
      </div>
    </>
  );
};

export default Poem;
