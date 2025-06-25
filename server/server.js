import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import poemRoutes from "./routes/poemRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", poemRoutes);

connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
