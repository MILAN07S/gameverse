const express = require("express");

const reviewController = require("../controllers/reviewController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", reviewController.getReviews);

router.post("/", protect, reviewController.addReview);

module.exports = router;