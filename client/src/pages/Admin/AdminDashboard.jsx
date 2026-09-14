import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>
          <div className="eyebrow-line">
            <div className="dash"></div>
            <span>GAMEVERSE ADMIN</span>
          </div>

          <h1>ADMIN DASHBOARD</h1>
          <p>Manage your GameVerse platform.</p>
        </div>
      </div>

      <div className="admin-grid">

        <Link to="/admin/games" className="admin-card">
          <span>01</span>
          <h2>Games</h2>
          <p>Add, edit and delete games.</p>
        </Link>

        <Link to="/admin/users" className="admin-card">
          <span>02</span>
          <h2>Users</h2>
          <p>View and manage registered users.</p>
        </Link>

        <Link to="/admin/reviews" className="admin-card">
          <span>03</span>
          <h2>Reviews</h2>
          <p>Manage player reviews.</p>
        </Link>

        <Link to="/admin/categories" className="admin-card">
          <span>04</span>
          <h2>Categories</h2>
          <p>Manage game categories.</p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;