const express = require("express");

const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Admin protection
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required.",
    });
  }

  next();
};


// Get categories
router.get(
  "/",
  protect,
  adminOnly,
  getCategories
);


// Add category
router.post(
  "/",
  protect,
  adminOnly,
  addCategory
);


// Update category
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