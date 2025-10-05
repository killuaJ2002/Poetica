import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const EditPoemModal = ({ poem, isOpen, onClose, onChange }) => {
  const [formData, setFormData] = useState({
    title: poem.title,
    content: poem.content,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const titleRef = useRef(null);

  const { getAuthHeaders } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, loading]);

  useEffect(() => {
    if (isOpen) {
      setFormData({ title: poem.title, content: poem.content });
      setError("");
    }
  }, [isOpen, poem.title, poem.content]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Please fill in both title and content");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/poems/${poem._id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update poem");
      }

      toast.success("Poem updated successfully");
      onChange(formData.title.trim(), formData.content.trim());
      onClose();
    } catch (error) {
      console.error("Error updating poem:", error);
      setError(error.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
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
          className={`bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out ${
            showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center p-16">
              <Spinner loading={loading} />
              <p className="text-gray-600 text-sm mt-4">Updating poem...</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <h2 className="text-2xl font-serif text-gray-900">Edit Poem</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    ref={titleRef}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-serif text-lg"
                    placeholder="Untitled"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={12}
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-serif text-base leading-relaxed"
                    placeholder="Write your poem here..."
                    required
                  />
                </div>

                {error && (
                  <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !formData.title.trim() || !formData.content.trim()
                    }
                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPoemModal;
