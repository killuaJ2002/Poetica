import express from "express";
import Poem from "../models/Poem.js";
const router = express.Router();

router.get("/poems", async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 });
    res.status(200).json(poems);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "An error occured" });
  }
});

router.post("/poems", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ message: "Both title and content are required" });
  }
  try {
    const newPoem = new Poem({
      title,
      content,
    });
    await newPoem.save();
    res.status(201).json({ message: "Poem successfully created" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "an error occured" });
  }
});

export default router;
