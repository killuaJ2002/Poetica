import Poem from "../models/Poem.js";

// get poems
const getPoems = async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 });
    res.status(200).json(poems);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "An error occured" });
  }
};

// post poems
const createPoem = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Both title and content are required" }); // Added return
  }
  try {
    const newPoem = new Poem({
      title,
      content,
      authorId: req.user.id, // Link poem to authenticated user
    });
    await newPoem.save();
    res.status(201).json({ message: "Poem successfully created" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "an error occured" });
  }
};

// update poem
const editPoem = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!id) {
    return res.status(400).json({ message: "id required" }); // Added return
  }
  try {
    // First, find the poem to check ownership
    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ message: "poem not found" });
    }

    // Check if the authenticated user owns this poem
    if (poem.authorId.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this poem" });
    }

    const updatedPoem = await Poem.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json({ message: "Poem updated successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Couldn't update poem" });
  }
};

//delete poem
const deletePoem = async (req, res) => {
  const { id } = req.params;
  try {
    // First, find the poem to check ownership
    const poem = await Poem.findById(id);
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    // Check if the authenticated user owns this poem
    if (poem.authorId.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this poem" });
    }

    await Poem.findByIdAndDelete(id);
    res.status(200).json({ message: "Poem deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Couldn't delete poem" });
  }
};

export { getPoems, createPoem, editPoem, deletePoem };
