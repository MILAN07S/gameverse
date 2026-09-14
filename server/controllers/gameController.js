const Game = require("../models/Game");

// ==========================================
// GET ALL GAMES
// ==========================================

const getGames = async (req, res) => {
    try {
        const games = await Game.find()
            .sort({ gameId: 1 });

        res.status(200).json(games);

    } catch (error) {
        console.log(
            "Get games error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to load games.",
            error: error.message,
        });
    }
};


// ==========================================
// GET ONE GAME
// ==========================================

const getGameById = async (req, res) => {
    try {
        const gameId = Number(req.params.id);

        // Check whether ID is valid
        if (Number.isNaN(gameId)) {
            return res.status(400).json({
                message: "Invalid game ID.",
            });
        }

        // IMPORTANT:
        // Search using GameVerse gameId,
        // NOT MongoDB _id
        const game = await Game.findOne({
            gameId: gameId,
        });

        if (!game) {
            return res.status(404).json({
                message: "Game not found.",
            });
        }

        res.status(200).json(game);

    } catch (error) {
        console.log(
            "Get game error:",
            error.message
        );

        res.status(500).json({
            message: "Unable to load game.",
            error: error.message,
        });
    }
};


module.exports = {
    getGames,
    getGameById,
};