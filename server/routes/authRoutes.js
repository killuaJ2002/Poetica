import express from "express";
import { signup, login } from "../controllers/authController.js";
const router = express.Router();

// signup route
router.post("/signup", signup);

// login route
router.post("/login", login);

export default router;
