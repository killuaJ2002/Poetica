import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import {
  Heart,
  MessageCircle,
  Edit3,
  Trash2,
  ArrowLeft,
  Calendar,
  User,
} from "lucide-react";

const PoemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/poems/${id}`);
        if (!res.ok) {
          throw new Error("Poem not found");
        }
        const data = await res.json();
        setPoem(data);
      } catch (error) {
        console.error("Error fetching poem:", error);
        navigate("/poems");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPoem();
    }
  }, [id, navigate]);

  const handleEdit = () => {
    navigate(`/poems/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this poem?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/poems/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          navigate("/poems");
        }
      } catch (error) {
        console.error("Error deleting poem:", error);
      }
    }
  };

  const isOwner =
    poem &&
    user &&
    (poem.authorId?._id === user.id || poem.authorId === user.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loading={loading} />
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Poem not found
          </h2>
          <button
            onClick={() => navigate("/poems")}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to poems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/poems")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to poems
        </button>

        {/* Main poem card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {poem.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center text-gray-600 mb-4">
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {poem.authorId?.displayName ||
                  poem.authorId?.username ||
                  "Unknown Author"}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {new Date(poem.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Poem content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">
                {poem.content}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              {/* Left side - Social actions */}
              <div className="flex items-center space-x-4">
                {!isOwner && (
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                    <Heart className="w-5 h-5" />
                    <span>{poem.likesCount}</span>
                  </button>
                )}

                <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <span>Comment</span>
                </button>

                {isOwner && (
                  <div className="text-sm text-gray-500">
                    {poem.likesCount} {poem.likesCount === 1 ? "like" : "likes"}
                  </div>
                )}
              </div>

              {/* Right side - Owner actions */}
              {isOwner && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleEdit}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemPage;
