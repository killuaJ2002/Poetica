import { useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LikeButton = ({ poem }) => {
  const { user, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = user ? user.id : null;

  const [liked, setLiked] = useState(
    userId ? poem.likedBy.includes(userId) : false
  );

  const [likesCount, setLikesCount] = useState(poem.likesCount);
  const handleClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // like api
    try {
      const userId = user.id;
      const res = await fetch(`${API_BASE_URL}/poems/${poem._id}/like`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const data = await res.json(); // contains message, liked, likesCount
      if (!res.ok) {
        throw new Error(data.message || "Failed to like/unline poem");
      }
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch (error) {
      console.log("error updating like/unlike:", error.message);
      toast.error("Couldn't update like");
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
        liked
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {liked ? (
        <Heart className="w-5 h-5 fill-current" />
      ) : (
        <Heart className="w-5 h-5" />
      )}
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeButton;
