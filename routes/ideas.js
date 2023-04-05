const express = require("express");
const router = express.Router();
const Idea = require("../models/idea");
 
// GET ALL IDEAS
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();

    res.json({ success: true, result: ideas.length, data: ideas });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something wrong with the server ",
    });
  }
});

// GET SINGLE IDEA
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res
        .status(404)
        .json({ success: false, error: "Resource not found" });
    }
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Something wrong with the server ",
    });
  }
});

// CREATE IDEA
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  try {
    const savedIdea = await idea.save();
    res.status(201).json({ success: true, data: savedIdea });
  } catch (error) {
    //   try {
    //     console.log(req.body);
    //     const idea = await Idea.create(req.body);
    //     res.status(201).json({ success: true, data: idea });
    //   } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Something wrong with the server ",
    });
  }
});

// UPDATE IDEA
router.put("/:id", async (req, res) => {
  try {
    // const idea = await Idea.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true})
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      {
        new: true,
      }
    );
    if (!updatedIdea) {
      return res
        .status(404)
        .json({ success: false, error: "Resource not found" });
    }
    res.status(200).json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Something wrong with the server ",
    });
  }
});

// DELETE IDEA
router.delete("/:id", async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Something wrong with the server ",
    });
  }
});

module.exports = router;
