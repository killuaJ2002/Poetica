import express from "express";
import {
  deleteComment,
  getComments,
  postComment,
} from "../controllers/commentController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/poems/:id/comment", verifyToken, getComments);

router.post("/poems/comment", verifyToken, postComment);

router.delete("/poems/comment/:id", verifyToken, deleteComment);

export default router;
