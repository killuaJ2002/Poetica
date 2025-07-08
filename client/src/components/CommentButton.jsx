import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddCommentModal from "./AddCommentModal";
const CommentButton = ({ poem, onChange }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Comment</span>
      </button>
      {showModal && (
        <AddCommentModal
          poem={poem}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default CommentButton;
