const express = require("express");

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// LOGGED-IN USERS
// ========================================

// View categories
router.get("/", protect, getCategories);


// ========================================
// ADMIN ONLY
// ========================================

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required.",
    });
  }

  next();
};


// Add category
router.post(
  "/",
  protect,
  adminOnly,
  addCategory
);


// Edit category
router.put(
  "/:id",
  protect,
  adminOnly,
  updateCategory
);


// Delete category
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCategory
);


module.exports = router;