const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    genre: {
      type: String,
      required: true,
      trim: true,
    },

    releaseYear: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    info: {
      developer: String,
      publisher: String,
      releaseDate: String,
      platforms: String,
      mode: String,
    },

    rating: {
      score: {
        type: Number,
        default: 0,
      },
      reviews: {
        type: Number,
        default: 0,
      },
    },

    requirements: {
      minimum: {
        os: String,
        processor: String,
        memory: String,
        graphics: String,
        storage: String,
      },

      recommended: {
        os: String,
        processor: String,
        memory: String,
        graphics: String,
        storage: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);