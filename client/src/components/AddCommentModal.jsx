import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import { X } from "lucide-react";

const AddCommentModal = ({ poem, isOpen, onClose, onChange }) => {
  const [formData, setFormData] = useState({ content: "" });
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { getAuthHeaders } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

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
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          showModal ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`bg-white w-full max-w-lg rounded-lg shadow-xl transform transition-all duration-300 ease-out ${
            showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Add Comment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Spinner loading={loading} />
              <p className="text-gray-600 text-sm mt-4">Posting comment...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">
              <textarea
                name="content"
                ref={textareaRef}
                rows="6"
                value={formData.content}
                onChange={handleChange}
                placeholder="Share your thoughts about this poem..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base leading-relaxed"
              />

              {error && (
                <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.content.trim()}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCommentModal;
