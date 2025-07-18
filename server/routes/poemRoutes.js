import express from "express";
import {
  getPoems,
  createPoem,
  editPoem,
  deletePoem,
  getPoem,
  toggleLikePoem,
} from "../controllers/poemController.js";
import verifyToken from "../middlewares/authMiddleware.js";
const router = express.Router();

// Get all the poems
router.get("/poems", getPoems);

// Get a single poem
router.get("/poems/:id", getPoem);

// Post a new poem
router.post("/poems", verifyToken, createPoem);

// Edit existing poem
router.put("/poems/:id", verifyToken, editPoem);

// Delete existing poem
router.delete("/poems/:id", verifyToken, deletePoem);

// like or unlike poem
router.post("/poems/:id/like", verifyToken, toggleLikePoem);

export default router;
