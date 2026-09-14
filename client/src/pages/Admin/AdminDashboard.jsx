import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    reviews: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data);
      } catch (error) {
        console.log("Error loading admin statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  /*
    We currently have 10 demo reviews.

    Deleted demo reviews are stored in localStorage
    so the dashboard can use the same number as the
    Admin Reviews page.
  */
  const deletedDemoReviews = JSON.parse(
    localStorage.getItem("deletedDemoReviews") || "[]"
  );

  const activeDemoReviews = Math.max(
    0,
    10 - deletedDemoReviews.length
  );

  const totalReviews =
    stats.reviews + activeDemoReviews;

  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="admin-header">
        <div>

          <div className="eyebrow-line">
            <div className="dash"></div>
            <span>GAMEVERSE ADMIN</span>
          </div>

          <h1>ADMIN DASHBOARD</h1>

          <p>
            Manage your GameVerse platform.
          </p>

        </div>
      </div>


      {/* STATISTICS */}
      <div className="admin-stats">

        {/* GAMES */}
        <div className="admin-stat-card">
          <span>TOTAL GAMES</span>

          <strong>
            22
          </strong>
        </div>


        {/* USERS */}
        <div className="admin-stat-card">
          <span>TOTAL USERS</span>

          <strong>
            {loading ? "..." : stats.users}
          </strong>
        </div>


        {/* REVIEWS */}
        <div className="admin-stat-card">
          <span>TOTAL REVIEWS</span>

          <strong>
            {loading ? "..." : totalReviews}
          </strong>
        </div>

      </div>


      {/* ADMIN OPTIONS */}
      <div className="admin-grid">

        <Link
          to="/admin/games"
          className="admin-card"
        >
          <span>01</span>

          <h2>Games</h2>

          <p>
            Add, edit and delete games.
          </p>
        </Link>


        <Link
          to="/admin/users"
          className="admin-card"
        >
          <span>02</span>

          <h2>Users</h2>

          <p>
            View and manage registered users.
          </p>
        </Link>


        <Link
          to="/admin/reviews"
          className="admin-card"
        >
          <span>03</span>

          <h2>Reviews</h2>

          <p>
            Manage player reviews.
          </p>
        </Link>


        <Link
          to="/admin/categories"
          className="admin-card"
        >
          <span>04</span>

          <h2>Categories</h2>

          <p>
            Manage game categories.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;