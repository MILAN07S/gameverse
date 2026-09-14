const express = require("express");

const {
  getGames,
  getGameById,
} = require("../controllers/gameController");

const router = express.Router();

// GET all games
router.get("/", getGames);

// GET one game
router.get("/:id", getGameById);

module.exports = router;