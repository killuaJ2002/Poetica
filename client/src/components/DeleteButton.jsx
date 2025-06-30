import React from "react";
import { Trash2 } from "lucide-react";
const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      <span>Delete</span>
    </button>
  );
};

export default DeleteButton;
