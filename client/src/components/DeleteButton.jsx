import React from "react";
import { Trash2 } from "lucide-react";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-full transition-all"
      title="Delete poem"
    >
      <Trash2 className="w-4 h-4" />
      <span>Delete</span>
    </button>
  );
};

export default DeleteButton;
