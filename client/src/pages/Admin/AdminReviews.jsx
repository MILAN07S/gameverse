import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const demoReviews = [
  {
    _id: "demo-1",
    userName: "Alex",
    gameName: "Red Dead Redemption 2",
    rating: 5,
    comment: "One of the best open world games ever made.",
    createdAt: "2026-09-10",
    isDemo: true,
  },
  {
    _id: "demo-2",
    userName: "Jordan",
    gameName: "Grand Theft Auto V",
    rating: 5,
    comment: "Amazing game with a huge world and endless things to do.",
    createdAt: "2026-09-09",
    isDemo: true,
  },
  {
    _id: "demo-3",
    userName: "Sam",
    gameName: "God of War Ragnarök",
    rating: 5,
    comment: "Excellent story, combat and visuals.",
    createdAt: "2026-09-08",
    isDemo: true,
  },
  {
    _id: "demo-4",
    userName: "Ryan",
    gameName: "Cyberpunk 2077",
    rating: 4,
    comment: "The world and atmosphere are incredible.",
    createdAt: "2026-09-07",
    isDemo: true,
  },
  {
    _id: "demo-5",
    userName: "Chris",
    gameName: "The Witcher 3",
    rating: 5,
    comment: "Fantastic RPG with an unforgettable story.",
    createdAt: "2026-09-06",
    isDemo: true,
  },
  {
    _id: "demo-6",
    userName: "Taylor",
    gameName: "Elden Ring",
    rating: 5,
    comment: "Challenging but extremely rewarding.",
    createdAt: "2026-09-05",
    isDemo: true,
  },
  {
    _id: "demo-7",
    userName: "Morgan",
    gameName: "Ghost of Tsushima",
    rating: 4,
    comment: "Beautiful world and excellent sword combat.",
    createdAt: "2026-09-04",
    isDemo: true,
  },
  {
    _id: "demo-8",
    userName: "Daniel",
    gameName: "Minecraft",
    rating: 5,
    comment: "Simple idea with almost unlimited possibilities.",
    createdAt: "2026-09-03",
    isDemo: true,
  },
  {
    _id: "demo-9",
    userName: "Jamie",
    gameName: "Marvel's Spider-Man 2",
    rating: 4,
    comment: "Great gameplay and a fantastic Spider-Man experience.",
    createdAt: "2026-09-02",
    isDemo: true,
  },
  {
    _id: "demo-10",
    userName: "Chris",
    gameName: "Hogwarts Legacy",
    rating: 4,
    comment: "A beautiful world for Harry Potter fans.",
    createdAt: "2026-09-01",
    isDemo: true,
  },
];

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/admin/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const deletedDemoReviews = JSON.parse(
        localStorage.getItem("deletedDemoReviews") || "[]"
      );

      const activeDemoReviews = demoReviews.filter(
        (review) => !deletedDemoReviews.includes(review._id)
      );

      setReviews([
        ...response.data,
        ...activeDemoReviews,
      ]);
    } catch (error) {
      console.log("Error loading reviews:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (review) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the review by ${review.userName}?`
    );

    if (!confirmed) {
      return;
    }

    if (review.isDemo) {
      const deletedDemoReviews = JSON.parse(
        localStorage.getItem("deletedDemoReviews") || "[]"
      );

      if (!deletedDemoReviews.includes(review._id)) {
        deletedDemoReviews.push(review._id);
      }

      localStorage.setItem(
        "deletedDemoReviews",
        JSON.stringify(deletedDemoReviews)
      );

      setReviews((currentReviews) =>
        currentReviews.filter(
          (item) => item._id !== review._id
        )
      );

      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(
        `/admin/reviews/${review._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews((currentReviews) =>
        currentReviews.filter(
          (item) => item._id !== review._id
        )
      );
    } catch (error) {
      console.log("Error deleting review:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete review."
      );
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="admin-page">

      {/* BACK BUTTON */}

      <Link
        to="/admin"
        className="admin-back-button"
      >
        ← Back
      </Link>


      {/* HEADER */}

      <div className="admin-header">

        <div>

          <div className="eyebrow-line">
            <div className="dash"></div>

            <span>
              REVIEW MANAGEMENT
            </span>
          </div>

          <h1>REVIEWS</h1>

          <p>
            View and manage player reviews on GameVerse.
          </p>

        </div>

      </div>


      {/* LOADING */}

      {loading && (
        <p>
          Loading reviews...
        </p>
      )}


      {/* ERROR */}

      {!loading && error && (
        <div className="admin-error">
          {error}
        </div>
      )}


      {/* EMPTY */}

      {!loading &&
        !error &&
        reviews.length === 0 && (

        <div className="admin-empty">

          <h2>
            NO REVIEWS YET
          </h2>

          <p>
            Player reviews will appear here.
          </p>

        </div>
      )}


      {/* REVIEWS */}

      {!loading &&
        !error &&
        reviews.length > 0 && (

        <div className="admin-reviews-table-wrapper">

          <table className="admin-reviews-table">

            <thead>

              <tr>
                <th>USER</th>
                <th>GAME</th>
                <th>RATING</th>
                <th>REVIEW</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>

            </thead>

            <tbody>

              {reviews.map((review) => (

                <tr key={review._id}>

                  <td className="admin-review-user-cell">
                    {review.userName}
                  </td>

                  <td className="admin-review-game-cell">
                    {review.gameName}
                  </td>

                  <td className="admin-review-rating-cell">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </td>

                  <td className="admin-review-comment-cell">
                    {review.comment}
                  </td>

                  <td className="admin-review-date-cell">
                    {formatDate(review.createdAt)}
                  </td>

                  <td className="admin-review-actions-cell">

                    <button
                      type="button"
                      className="admin-review-delete"
                      onClick={() =>
                        handleDelete(review)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default AdminReviews;