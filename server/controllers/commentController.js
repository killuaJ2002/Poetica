import Comment from "../models/Comment.js";
import mongoose from "mongoose";
// get all the comments for a poem
const getComments = async (req, res) => {
  const { id: poemId } = req.params;
  if (!poemId) {
    return res.status(400).json({ message: "poemId required" });
  }
  try {
    const comments = await Comment.find({ poem: poemId })
      .populate("author", "username displayName")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "comments acquired",
      comments,
    });
  } catch (error) {
    console.log("error fetching comments: ", error);
    res.status(500).json({ message: "comments couldn't be retrieved" });
  }
};

// post a comment
const postComment = async (req, res) => {
  const { poemId, content } = req.body;

  if (!poemId || !mongoose.Types.ObjectId.isValid(poemId)) {
    return res.status(400).json({ message: "Valid poemId is required" });
  }

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    let newComment = new Comment({
      content: content.trim(),
      poem: poemId,
      author: req.user._id,
    });

    await newComment.save();
    newComment = await newComment.populate("author", "username displayName");
    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Couldn't add comment" });
  }
};

// delete a comment
const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;
  const { authorId } = req.body;
  if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "Valid comment id is required" });
  }
  if (!authorId) {
    return res.status(400).json({ message: "Author ID required" });
  }
  try {
    if (authorId.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("couldn't delete comment:", error);
    res.status(500).json({ message: "Couldn't delete comment" });
  }
};

export { getComments, postComment, deleteComment };
