import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  displayName: String,
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
