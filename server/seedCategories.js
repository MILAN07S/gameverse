const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("./models/Category");

const categories = [
  {
    name: "Action",
    image: "/images/action.jpg",
  },
  {
    name: "Adventure",
    image: "/images/adventure.jpg",
  },
  {
    name: "RPG",
    image: "/images/rpg.jpg",
  },
  {
    name: "Racing",
    image: "/images/racing.jpg",
  },
  {
    name: "Horror",
    image: "/images/horror.jpg",
  },
  {
    name: "Shooter",
    image: "/images/shooter.jpg",
  },
  {
    name: "Open World",
    image: "/images/openworld.jpg",
  },
  {
    name: "Survival",
    image: "/images/survival.jpg",
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Remove existing categories
    await Category.deleteMany({});

    // Insert your existing 8 categories
    await Category.insertMany(categories);

    console.log("8 categories added successfully");

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

  } catch (error) {
    console.log("Category seed error:", error.message);
    process.exit(1);
  }
};

seedCategories();