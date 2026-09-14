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

  return (
    <div className="admin-page">

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

      <div className="admin-stats">

        <div className="admin-stat-card">
          <span>TOTAL GAMES</span>
          <strong>22</strong>
        </div>

        <div className="admin-stat-card">
          <span>TOTAL USERS</span>
          <strong>
            {loading ? "..." : stats.users}
          </strong>
        </div>

        <div className="admin-stat-card">
          <span>TOTAL REVIEWS</span>
          <strong>
            {loading ? "..." : stats.reviews}
          </strong>
        </div>

      </div>

      <div className="admin-grid">

        <Link
          to="/admin/games"
          className="admin-card"
        >
          <span>01</span>
          <h2>Games</h2>
          <p>Add, edit and delete games.</p>
        </Link>

        <Link
          to="/admin/users"
          className="admin-card"
        >
          <span>02</span>
          <h2>Users</h2>
          <p>View and manage registered users.</p>
        </Link>

        <Link
          to="/admin/reviews"
          className="admin-card"
        >
          <span>03</span>
          <h2>Reviews</h2>
          <p>Manage player reviews.</p>
        </Link>

        <Link
          to="/admin/categories"
          className="admin-card"
        >
          <span>04</span>
          <h2>Categories</h2>
          <p>Manage game categories.</p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;