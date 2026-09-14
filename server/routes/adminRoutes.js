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

// Get all users
router.get("/users", adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch users.",
      error: error.message,
    });
  }
});


// =========================
// DELETE USER
// =========================

router.delete("/users/:id", adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot delete your own admin account.",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete user.",
      error: error.message,
    });
  }
});

router.get("/reviews", adminOnly, async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch reviews.",
      error: error.message,
    });
  }
});

router.delete("/reviews/:id", adminOnly, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found.",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      message: "Review deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete review.",
      error: error.message,
    });
  }
});


module.exports = router;