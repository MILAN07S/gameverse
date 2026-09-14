const Category = require("../models/Category");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: 1 });

    res.json(categories);
  } catch (error) {
    console.log("Get categories error:", error.message);

    res.status(500).json({
      message: "Unable to load categories.",
    });
  }
};


// Add category
const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists.",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      image,
    });

    res.status(201).json({
      message: "Category added successfully.",
      category,
    });
  } catch (error) {
    console.log("Add category error:", error.message);

    res.status(500).json({
      message: "Unable to add category.",
      error: error.message,
    });
  }
};


// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Another category already has this name.",
      });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    res.json({
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    console.log("Update category error:", error.message);

    res.status(500).json({
      message: "Unable to update category.",
      error: error.message,
    });
  }
};


// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found.",
      });
    }

    res.json({
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.log("Delete category error:", error.message);

    res.status(500).json({
      message: "Unable to delete category.",
      error: error.message,
    });
  }
};


module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};