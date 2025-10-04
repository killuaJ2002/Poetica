import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

const Poem = ({ poem }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const lines = poem.content.split("\n");
  const maxLines = 8;
  const isLongPoem = lines.length > maxLines;

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

  const authorName =
    poem.authorId?.displayName || poem.authorId?.username || "Unknown Author";

  return (
    <article className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2
              className="text-2xl font-serif text-gray-900 mb-2 cursor-pointer hover:text-gray-700 transition-colors"
              onClick={() => navigate(`/poems/${poem._id}`)}
            >
              {poem.title}
            </h2>
            <p className="text-sm text-gray-500">
              by <span className="font-medium text-gray-700">{authorName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 relative">
        <div
          className="font-serif text-gray-800 leading-relaxed whitespace-pre-wrap cursor-pointer"
          onClick={() => navigate(`/poems/${poem._id}`)}
        >
          {displayContent}
        </div>

        {shouldTruncate && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
            <button
              onClick={() => navigate(`/poems/${poem._id}`)}
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium relative z-10"
            >
              Continue reading →
            </button>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {!isOwner && <LikeButton poem={poem} />}

          <CommentButton poem={poem} onChange={Function.prototype} />

          {isOwner && (
            <div className="flex items-center gap-1.5 text-gray-500 text-sm ml-auto">
              <span className="font-medium text-gray-700">
                {poem.likesCount}
              </span>
              <span>{poem.likesCount === 1 ? "like" : "likes"}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Poem;
