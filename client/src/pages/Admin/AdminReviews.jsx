import { useEffect, useState } from "react";
import API from "../../services/api";

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

      setReviews(response.data);
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review._id !== id
        )
      );

      alert("Review deleted successfully.");
    } catch (error) {
      console.log("Error deleting review:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete review."
      );
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>

          <div className="eyebrow-line">
            <div className="dash"></div>
            <span>REVIEW MANAGEMENT</span>
          </div>

          <h1>REVIEWS</h1>

          <p>
            View and manage player reviews on GameVerse.
          </p>

        </div>
      </div>


      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}


      {loading && (
        <p>Loading reviews...</p>
      )}


      {!loading && !error && reviews.length === 0 && (
        <div className="admin-empty">
          <h2>NO REVIEWS YET</h2>

          <p>
            No player reviews have been submitted.
          </p>
        </div>
      )}


      {!loading && reviews.length > 0 && (
        <div className="admin-review-list">

          {reviews.map((review) => (
            <div
              className="admin-review-card"
              key={review._id}
            >

              <div className="admin-review-top">

                <div>
                  <span className="admin-review-user">
                    {review.userName}
                  </span>

                  <h2>
                    {review.gameName}
                  </h2>
                </div>

                <button
                  type="button"
                  className="admin-delete-button"
                  onClick={() =>
                    handleDelete(review._id)
                  }
                >
                  Delete
                </button>

              </div>


              <div className="admin-review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>


              <p className="admin-review-comment">
                {review.comment}
              </p>


              <span className="admin-review-date">
                {review.createdAt
                  ? new Date(
                      review.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AdminReviews;