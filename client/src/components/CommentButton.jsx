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
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
      >
        <MessageCircle className="w-4 h-4" />
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
