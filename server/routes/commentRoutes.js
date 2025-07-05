import express from "express";
import { getComments, postComment } from "../controllers/commentController";
import verifyToken from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/poems/:id/comment", verifyToken, getComments);

router.post("/poems/comment", verifyToken, postComment);

export default router;
