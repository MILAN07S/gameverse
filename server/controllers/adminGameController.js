const Game = require("../models/Game");

// Get all games
const getGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });

    res.json(games);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch games.",
      error: error.message,
    });
  }
};

// Add game
const addGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);

    res.status(201).json({
      message: "Game added successfully.",
      game,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to add game.",
      error: error.message,
    });
  }
};

// Update game
const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!game) {
      return res.status(404).json({
        message: "Game not found.",
      });
    }

    res.json({
      message: "Game updated successfully.",
      game,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update game.",
      error: error.message,
    });
  }
};

// Delete game
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(
      req.params.id
    );

    if (!game) {
      return res.status(404).json({
        message: "Game not found.",
      });
    }

    res.json({
      message: "Game deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete game.",
      error: error.message,
    });
  }
};

module.exports = {
  getGames,
  addGame,
  updateGame,
  deleteGame,
};