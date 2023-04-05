const express = require("express");
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: "Positive NewsLetter, a newsletter that onl shares positive, uplifting news",
    tag: "Technology",
    username: "TonyStark",
    date: 2023 - 03 - 01,
  },
  {
    id: 2,
    text: "Milk cartons that turn a different color the older that your milk is getting",
    tag: "Inventions",
    username: "SteveRogers",
    date: 2023 - 03 - 02,
  },
  {
    id: 3,
    text: "ATM location app which lets you know where the closest ATM is and if it is in service",
    tag: "Software",
    username: "BruceBanner",
    date: 2023 - 03 - 03,
  },
];

// GET ALL IDEAS
router.get("/", (req, res) => {
  res.json({ success: true, result: ideas.length ,data: ideas });
});

// GET SINGLE IDEA
router.get("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  res.json({ success: true, data: idea });
});

router.post("/", (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  ideas.push(idea);
  res.status(201).json({ success: true, data: idea  });
});

router.put('/:id', (req,res) => {
    const idea = ideas.find(idea => idea.id === +req.params.id)
    if (!idea) {
        return res
          .status(404)
          .json({ success: false, error: "Resource not found" });
      }
      idea.text = req.body.text 
      idea.tag = req.body.tag

      res.status(200).json({ success: true, data: idea  });

})

router.delete('/:id', (req,res) => {
    const idea = ideas.find(idea => idea.id === +req.params.id)
    if (!idea) {
        return res
          .status(404)
          .json({ success: false, error: "Resource not found" });
      }
      const index = ideas.indexOf(idea)
      ideas.splice(index, 1)

      res.status(200).json({ success: true, data: {}  });

})

module.exports = router;
