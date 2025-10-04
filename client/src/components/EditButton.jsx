import React from "react";
import { Edit3 } from "lucide-react";

const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-all"
      title="Edit poem"
    >
      <Edit3 className="w-4 h-4" />
      <span>Edit</span>
    </button>
  );
};

export default EditButton;
