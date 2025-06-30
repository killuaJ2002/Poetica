import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
const Poem = ({ poem }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  // Smart truncation by lines instead of characters
  const lines = poem.content.split("\n");
  const maxLines = 6;
  const isLongPoem = lines.length > maxLines;

  // Truncate at natural break points (line breaks)
  let displayContent = poem.content;
  let shouldTruncate = false;

  if (isLongPoem) {
    displayContent = lines.slice(0, maxLines).join("\n");
    shouldTruncate = true;
  }

  const isOwner =
    poem &&
    user &&
    (poem.authorId?._id === user.id || poem.authorId === user.id);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-800 flex-1 mr-2">
            {poem.title}
          </h2>
        </div>

        <div className="relative">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
            {displayContent}
          </p>

          {/* Subtle fade effect for truncated poems */}
          {shouldTruncate && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            by{" "}
            <span className="font-medium">
              {poem.authorId?.displayName ||
                poem.authorId?.username ||
                "Unknown Author"}
            </span>
          </p>

          <button
            onClick={() => navigate(`/poems/${poem._id}`)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-all duration-200 hover:bg-indigo-50 px-3 py-1 rounded-full"
          >
            Read More
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {!isOwner && <LikeButton likesCount={poem.likesCount} />}

            <CommentButton />

            {isOwner && (
              <div className="text-sm text-gray-500">
                {poem.likesCount} {poem.likesCount <= 1 ? "like" : "likes"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poem;
