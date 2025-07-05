import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    poem: { type: mongoose.Schema.Types.ObjectId, ref: "Poem" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
