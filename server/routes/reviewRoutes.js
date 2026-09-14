const express = require("express");

const {
    getReviews,
    addReview,
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getReviews);

// Logged-in users
router.post("/", authMiddleware, addReview);

module.exports = router;