const Review = require("../models/Review");

// =========================
// GET ALL REVIEWS
// =========================
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        console.log("Get reviews error:", error.message);

        res.status(500).json({
            message: "Unable to load reviews.",
            error: error.message,
        });
    }
};

// =========================
// ADD REVIEW
// =========================
const addReview = async (req, res) => {
    try {
        const {
            gameId,
            gameName,
            rating,
            comment,
        } = req.body;

        if (!gameId || !gameName || !rating || !comment?.trim()) {
            return res.status(400).json({
                message: "Please fill all review fields.",
            });
        }

        const review = await Review.create({
            user: req.user._id,
            userName: req.user.name || req.user.username,
            gameId: Number(gameId),
            gameName,
            rating: Number(rating),
            comment: comment.trim(),
        });

        res.status(201).json({
            message: "Review added successfully.",
            review,
        });
    } catch (error) {
        console.log("Add review error:", error.message);

        res.status(500).json({
            message: "Unable to add review.",
            error: error.message,
        });
    }
};

module.exports = {
    getReviews,
    addReview,
};