import mongoose from "mongoose";

const poemSchema = mongoose.Schema({
  title: String,
  content: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Poem = mongoose.model("Poem", poemSchema);

export default Poem;
