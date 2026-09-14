const express = require("express");

const {
    getGames,
    getGameById,
} = require("../controllers/gameController");

const router = express.Router();


// GET ALL GAMES
// /api/games

router.get(
    "/",
    getGames
);


// GET ONE GAME
// /api/games/:id

router.get(
    "/:id",
    getGameById
);


module.exports = router;