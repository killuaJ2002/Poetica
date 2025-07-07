import express from "express";
import { getComments, postComment } from "../controllers/commentController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/poems/:id/comment", verifyToken, getComments);

router.post("/poems/comment", verifyToken, postComment);

export default router;
