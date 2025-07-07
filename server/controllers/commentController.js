import Comment from "../models/Comment.js";
import mongoose from "mongoose";
// get all the comments
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
    const newComment = new Comment({
      content: content.trim(),
      poem: poemId,
      author: req.user._id,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Couldn't add comment" });
  }
};

export { getComments, postComment };
