import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner"; // assumed path

const AddCommentModal = ({ poem, isOpen, onClose, onChange }) => {
  const [formData, setFormData] = useState({ content: "" });
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getAuthHeaders } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Close on ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, loading, onClose]);

  useEffect(() => {
    if (isOpen) {
      setFormData({ content: "" });
      setError("");
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, content: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/poems/comment`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          poemId: poem._id,
          content: formData.content.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to post comment");

      onChange(data.comment);
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative animate-scaleIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add a Comment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner className="w-8 h-8" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              name="content"
              ref={textareaRef}
              rows="4"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your thoughts..."
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {error && (
              <div className="text-sm text-red-600 bg-red-100 border border-red-200 p-2 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formData.content.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Animation class */}
      <style>
        {`
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        `}
      </style>
    </div>
  );
};

export default AddCommentModal;
