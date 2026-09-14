const express = require("express");
const Game = require("../models/Game");

const adminOnly = require("../middleware/adminMiddleware");
const {
  getGames,
  addGame,
  updateGame,
  deleteGame,
} = require("../controllers/adminGameController");

const User = require("../models/User");
const Review = require("../models/Review");

const router = express.Router();

// Dashboard statistics
router.get("/stats", adminOnly, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const reviews = await Review.countDocuments();
    const games = await Game.countDocuments();

    res.json({
      users,
      reviews,
      games,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch admin statistics.",
    });
  }
});

// Game management
router.get("/games", adminOnly, getGames);

router.post("/games", adminOnly, addGame);

router.put("/games/:id", adminOnly, updateGame);

router.delete("/games/:id", adminOnly, deleteGame);

module.exports = router;