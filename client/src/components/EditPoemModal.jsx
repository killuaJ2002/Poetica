import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const EditPoemModal = ({ poem, isOpen, onClose, onChange }) => {
  const [formData, setFormData] = useState({
    title: poem.title,
    content: poem.content,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { getAuthHeaders } = useAuth();
  const API_BASE_URL = "http://localhost:8000/api";

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !loading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, loading]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ title: poem.title, content: poem.content });
      setError("");
    }
  }, [isOpen]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
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

      // Success - reset form and close modal
      onChange(formData.title.trim(), formData.content.trim());
      setFormData({ title: "", content: "" });
      onClose();
    } catch (error) {
      console.error("Error updating poem:", error);
      setError(error.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Close modal when clicking on backdrop (only if not loading)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-200 scale-100">
          {/* Show loading spinner when processing */}
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Spinner className="w-8 h-8 mb-4" />
              <p className="text-gray-600 text-sm">Updating poem...</p>
            </div>
          ) : (
            <>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Poem
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
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

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6">
                {/* Title Field */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter poem title"
                    required
                  />
                </div>

                {/* Content Field */}
                <div className="mb-4">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Poem Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={8}
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Write your poem here..."
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md p-3">
                    {error}
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !formData.title.trim() || !formData.content.trim()
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    Update Poem
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
