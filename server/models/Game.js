const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        gameId: {
            type: Number,
            required: true,
            unique: true,
        },

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

        image: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        // =========================
        // GAMEPLAY PREVIEWS
        // =========================

        previews: {
            type: [String],
            default: [],
        },

        preview: {
            type: [String],
            default: [],
        },

        // =========================
        // SALES & PERFORMANCE
        // =========================

        stats: {
            units: {
                type: String,
                default: "",
            },

            revenue: {
                type: String,
                default: "",
            },

            profit: {
                type: String,
                default: "",
            },
        },

        // =========================
        // GAME INFORMATION
        // =========================

        info: {
            developer: {
                type: String,
                default: "",
            },

            publisher: {
                type: String,
                default: "",
            },

            releaseDate: {
                type: String,
                default: "",
            },

            platforms: {
                type: String,
                default: "",
            },

            mode: {
                type: String,
                default: "",
            },
        },

        // =========================
        // RATING
        // =========================

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

        // =========================
        // SYSTEM REQUIREMENTS
        // =========================

        requirements: {
            minimum: {
                os: {
                    type: String,
                    default: "",
                },

                processor: {
                    type: String,
                    default: "",
                },

                memory: {
                    type: String,
                    default: "",
                },

                graphics: {
                    type: String,
                    default: "",
                },

                storage: {
                    type: String,
                    default: "",
                },
            },

            recommended: {
                os: {
                    type: String,
                    default: "",
                },

                processor: {
                    type: String,
                    default: "",
                },

                memory: {
                    type: String,
                    default: "",
                },

                graphics: {
                    type: String,
                    default: "",
                },

                storage: {
                    type: String,
                    default: "",
                },
            },
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Game", gameSchema);