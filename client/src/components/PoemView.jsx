import { ArrowLeft, Calendar, User } from "lucide-react";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import CommentSection from "./CommentSection";

const PoemView = ({
  poem,
  isOwner,
  handleEdit,
  handleDelete,
  navigate,
  comments,
  onChange,
  onDeleteComment,
}) => {
  const authorName =
    poem.authorId?.displayName || poem.authorId?.username || "Unknown Author";
  const formattedDate = new Date(poem.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/poems")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to poems</span>
        </button>

        {/* Main poem card */}
        <article className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <header className="px-8 py-8 border-b border-gray-100">
            <h1 className="text-4xl font-serif text-gray-900 mb-6 leading-tight">
              {poem.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="px-8 py-10">
            <div className="font-serif text-lg text-gray-800 whitespace-pre-wrap leading-loose">
              {poem.content}
            </div>
          </div>

          {/* Actions */}
          <footer className="px-8 py-5 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              {/* Left: Likes & Comments */}
              <div className="flex items-center gap-4">
                {!isOwner && <LikeButton poem={poem} />}
                <CommentButton poem={poem} onChange={onChange} />
                {isOwner && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span className="font-medium text-gray-700">
                      {poem.likesCount}
                    </span>
                    <span>{poem.likesCount === 1 ? "like" : "likes"}</span>
                  </div>
                )}
              </div>

              {/* Right: Edit/Delete */}
              {isOwner && (
                <div className="flex items-center gap-2">
                  <EditButton onClick={handleEdit} />
                  <DeleteButton onClick={handleDelete} />
                </div>
              )}
            </div>
          </footer>
        </article>

        {/* Comments Section */}
        <div className="mt-8">
          {comments.length > 0 ? (
            <CommentSection
              comments={comments}
              onDeleteComment={onDeleteComment}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoemView;
