import React from "react";
import { MessageCircle } from "lucide-react";
const CommentButton = () => {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
      <MessageCircle className="w-5 h-5" />
      <span>Comment</span>
    </button>
  );
};

export default CommentButton;
