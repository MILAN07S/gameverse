const Review = require("../models/Review");

// Add a review
const addReview = async (req, res) => {
  try {
    const {
      gameId,
      gameName,
      rating,
      comment,
    } = req.body;

    if (!gameId || !gameName || !rating || !comment) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      userName: req.user.name,
      gameId,
      gameName,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    console.log("Review error:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  addReview,
  getReviews,
};