import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Stop the server if DB connection fails
  }
};

export default connectToMongo;
