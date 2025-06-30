import React from "react";
import { Edit3 } from "lucide-react";
const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <Edit3 className="w-4 h-4" />
      <span>Edit</span>
    </button>
  );
};

export default EditButton;
