import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Comment = ({ comment, onDeleteComment }) => {
  const { user } = useAuth();

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <>
      {user.id === comment.author._id ? (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-gray-900 text-sm">
                {comment.author?.displayName ||
                  comment.author?.username ||
                  "Anonymous"}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimeAgo(comment.createdAt)}
              </p>
            </div>
            <button
              onClick={() => onDeleteComment(comment.id)}
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition-all duration-200"
              title="Delete comment"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-gray-900 text-sm">
                {comment.author?.displayName ||
                  comment.author?.username ||
                  "Anonymous"}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimeAgo(comment.createdAt)}
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
