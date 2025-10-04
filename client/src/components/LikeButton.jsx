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

    try {
      const res = await fetch(`${API_BASE_URL}/poems/${poem._id}/like`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to like/unlike poem");
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
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
        liked
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeButton;
