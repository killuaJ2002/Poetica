const Comment = ({ comment }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4 mb-4 bg-gray-50">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">
          {comment.author.displayName || comment.author.username}
        </span>
        <span className="text-xs text-gray-500">{comment.createdAt}</span>
      </div>
      <p className="text-sm text-gray-700">{comment.content}</p>
    </div>
  );
};

export default Comment;
