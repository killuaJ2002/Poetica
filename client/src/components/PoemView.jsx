import {
  ArrowLeft,
  Calendar,
  User,
  Heart,
  MessageCircle,
  Edit3,
  Trash2,
} from "lucide-react";

const PoemView = ({ poem, isOwner, handleEdit, handleDelete, navigate }) => {
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

            {/* Author */}
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

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">
                {poem.content}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              {/* Left: Likes & Comments */}
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

              {/* Right: Edit/Delete */}
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

export default PoemView;
