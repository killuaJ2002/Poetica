import express from "express";
import Poem from "../models/Poem.js";
const router = express.Router();

// Get all the poems
router.get("/poems", async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 });
    res.status(200).json(poems);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "An error occured" });
  }
});

// Post a new poem
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

// Edit existing poem
router.put("/poems/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!id) {
    res.status(400).json({ message: "id required" });
  }
  try {
    const updatedPoem = await Poem.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedPoem) {
      return res.status(404).json({ message: "poem not found" });
    }
    res.status(200).json({ message: "Poem updated successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Couldn't update poem" });
  }
});

// Delete existing poem
router.delete("/poems/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPoem = await Poem.findByIdAndDelete(id);
    if (!deletedPoem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    res.status(200).json({ message: "Poem deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Couldn't delete poem" });
  }
});

export default router;
