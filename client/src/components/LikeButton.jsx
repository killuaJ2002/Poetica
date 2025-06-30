import React from "react";
import { Heart } from "lucide-react";
const LikeButton = ({ likesCount }) => {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
      <Heart className="w-5 h-5" />
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeButton;
