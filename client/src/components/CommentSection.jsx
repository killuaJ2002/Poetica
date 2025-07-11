import Comment from "./Comment";

const CommentSection = ({ comments, onDeleteComment }) => {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentSection;
