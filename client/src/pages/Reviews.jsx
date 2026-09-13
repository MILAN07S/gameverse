import { useEffect, useState } from "react";
import games from "../data/games";
import API from "../services/api";

const demoReviews = [
    {
        _id: "demo-1",
        userName: "Alex",
        gameName: "Red Dead Redemption 2",
        rating: 5,
        comment:
            "The story, characters and open world are absolutely incredible. One of the best games I have ever played.",
        createdAt: "2026-09-10",
    },
    {
        _id: "demo-2",
        userName: "Jordan",
        gameName: "Grand Theft Auto V",
        rating: 5,
        comment:
            "The huge open world, missions and GTA Online make this game incredibly fun even after many years.",
        createdAt: "2026-09-08",
    },
    {
        _id: "demo-3",
        userName: "Sam",
        gameName: "God of War Ragnarök",
        rating: 5,
        comment:
            "Amazing combat and storytelling. The characters and emotional moments make this game unforgettable.",
        createdAt: "2026-09-06",
    },
    {
        _id: "demo-4",
        userName: "Ryan",
        gameName: "Cyberpunk 2077",
        rating: 4,
        comment:
            "Night City looks fantastic and there is a lot to explore. The missions and characters are very engaging.",
        createdAt: "2026-09-04",
    },
    {
        _id: "demo-5",
        userName: "Chris",
        gameName: "The Witcher 3",
        rating: 5,
        comment:
            "Fantastic world design, side quests and characters. Every area feels like it has its own story.",
        createdAt: "2026-09-02",
    },
    {
        _id: "demo-6",
        userName: "Taylor",
        gameName: "Elden Ring",
        rating: 5,
        comment:
            "The exploration and boss fights are incredible. There is always something new to discover.",
        createdAt: "2026-08-30",
    },
    {
        _id: "demo-7",
        userName: "Morgan",
        gameName: "Ghost of Tsushima",
        rating: 4,
        comment:
            "Beautiful environment, satisfying combat and a great samurai story. The world is stunning.",
        createdAt: "2026-08-28",
    },
    {
        _id: "demo-8",
        userName: "Daniel",
        gameName: "Minecraft",
        rating: 5,
        comment:
            "Simple idea but endless possibilities. I can spend hours building and exploring different worlds.",
        createdAt: "2026-08-25",
    },
    {
        _id: "demo-9",
        userName: "Jamie",
        gameName: "Marvel's Spider-Man 2",
        rating: 4,
        comment:
            "Swinging through the city feels fantastic and the combat is fast and enjoyable.",
        createdAt: "2026-08-22",
    },
    {
        _id: "demo-10",
        userName: "Chris",
        gameName: "Hogwarts Legacy",
        rating: 4,
        comment:
            "The Hogwarts world is beautiful and there are plenty of places to explore and things to discover.",
        createdAt: "2026-08-20",
    },
];
function Reviews() {
    const [showForm, setShowForm] = useState(false);

    const [reviews, setReviews] = useState([]);

    const [selectedGame, setSelectedGame] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Load reviews from MongoDB
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await API.get("/reviews");
                setReviews([
                    ...response.data,
                    ...demoReviews,
                ]);
            } catch (error) {
                console.log("Error loading reviews:", error);
                setError("Unable to load reviews.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Calculate average rating
    const averageRating =
        reviews.length > 0
            ? reviews.reduce(
                (total, review) => total + Number(review.rating),
                0
            ) / reviews.length
            : 0;

    // Submit review
    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || !user) {
            setError("Please sign in before writing a review.");
            return;
        }

        if (!selectedGame || !rating || !comment.trim()) {
            setError("Please fill all fields.");
            return;
        }

        const game = games.find(
            (item) => item.id === Number(selectedGame)
        );

        if (!game) {
            setError("Selected game not found.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const response = await API.post(
                "/reviews",
                {
                    gameId: game.id,
                    gameName: game.name,
                    rating,
                    comment: comment.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setReviews((currentReviews) => [
                response.data.review,
                ...currentReviews,
            ]);

            // Reset form
            setSelectedGame("");
            setRating(0);
            setComment("");
            setShowForm(false);

        } catch (error) {
            console.log("Error submitting review:", error);

            setError(
                error.response?.data?.message ||
                "Unable to submit review."
            );

        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="reviews-page">

            <div className="reviews-header">

                <div className="eyebrow-line">
                    <div className="dash"></div>
                    <span>GAMEVERSE COMMUNITY</span>
                </div>

                <h1>PLAYER REVIEWS</h1>

                <p>
                    See what the GameVerse community thinks about
                    their favorite games.
                </p>

            </div>

            <div className="reviews-summary">

                <div className="overall-rating">

                    <strong>
                        {averageRating.toFixed(1)}
                    </strong>

                    <div className="overall-stars">
                        ★★★★★
                    </div>

                    <span>
                        Based on {reviews.length} reviews
                    </span>

                </div>

                <div className="review-summary-text">

                    <span>COMMUNITY RATING</span>

                    <p>
                        Ratings and opinions from GameVerse players.
                    </p>

                </div>

            </div>

            {error && !showForm && (
                <div className="review-error">
                    {error}
                </div>
            )}

            <div className="reviews-list">

                {loading ? (

                    <div className="reviews-loading">
                        Loading reviews...
                    </div>

                ) : reviews.length > 0 ? (

                    reviews.map((review) => (

                        <div
                            className="review-card"
                            key={review._id}
                        >

                            <div className="review-card-top">

                                <div className="review-user">

                                    <div className="review-avatar">
                                        {review.userName
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <strong>
                                            {review.userName}
                                        </strong>

                                        <span>
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>

                                </div>

                                <span className="review-game">
                                    {review.gameName}
                                </span>

                            </div>

                            <div className="review-rating">

                                <span className="stars">

                                    {"★".repeat(Number(review.rating))}

                                    <span className="empty-stars">
                                        {"★".repeat(
                                            5 - Number(review.rating)
                                        )}
                                    </span>

                                </span>

                                <span className="rating-number">
                                    {review.rating}/5
                                </span>

                            </div>

                            <p className="review-comment">
                                "{review.comment}"
                            </p>

                        </div>

                    ))

                ) : (

                    <div className="reviews-loading">
                        No reviews yet. Be the first to write one.
                    </div>

                )}

            </div>

            <div className="write-review-section">

                <div>

                    <h2>SHARE YOUR EXPERIENCE</h2>

                    <p>
                        Played a game from our collection?
                        Share your thoughts with the community.
                    </p>

                </div>

                <button
                    type="button"
                    className="hero-button"
                    onClick={() => {
                        setError("");
                        setShowForm(true);
                    }}
                >
                    Write a Review
                </button>

            </div>

            {showForm && (

                <div
                    className="review-modal-overlay"
                    onClick={() => setShowForm(false)}
                >

                    <div
                        className="review-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <button
                            type="button"
                            className="review-modal-close"
                            onClick={() => setShowForm(false)}
                        >
                            ×
                        </button>

                        <div className="eyebrow-line">
                            <div className="dash"></div>
                            <span>GAMEVERSE COMMUNITY</span>
                        </div>

                        <h2>WRITE A REVIEW</h2>

                        <p className="review-modal-description">
                            Share your experience with a game.
                        </p>

                        {error && (
                            <div className="review-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <label>
                                Select Game
                            </label>

                            <select
                                value={selectedGame}
                                onChange={(event) =>
                                    setSelectedGame(event.target.value)
                                }
                            >

                                <option value="" disabled>
                                    Choose a game
                                </option>

                                {games.map((game) => (
                                    <option
                                        key={game.id}
                                        value={game.id}
                                    >
                                        {game.name}
                                    </option>
                                ))}

                            </select>

                            <label>
                                Your Rating
                            </label>

                            <div className="review-form-stars">

                                {[1, 2, 3, 4, 5].map((star) => (

                                    <button
                                        type="button"
                                        key={star}
                                        className={
                                            star <= rating
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() => setRating(star)}
                                    >
                                        ★
                                    </button>

                                ))}

                            </div>

                            <label>
                                Your Review
                            </label>

                            <textarea
                                value={comment}
                                onChange={(event) =>
                                    setComment(event.target.value)
                                }
                                placeholder="Write your experience..."
                                rows="5"
                                maxLength="500"
                            ></textarea>

                            <div className="review-form-actions">

                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="hero-button"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Submit Review"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Reviews;