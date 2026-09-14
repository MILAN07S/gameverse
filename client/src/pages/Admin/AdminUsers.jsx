import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.log("Error loading users:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((current) =>
        current.filter((user) => user._id !== id)
      );

      alert("User deleted successfully.");
    } catch (error) {
      console.log("Error deleting user:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete user."
      );
    }
  };

  return (
    <div className="admin-page">

      <div className="admin-header">

        <div>

          <div className="eyebrow-line">
            <div className="dash"></div>
            <span>USER MANAGEMENT</span>
          </div>

          <h1>USERS</h1>

          <p>
            View and manage registered GameVerse users.
          </p>

        </div>

      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {loading && (
        <p>Loading users...</p>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="admin-empty">
          <h2>NO USERS YET</h2>
          <p>
            No registered users found.
          </p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="admin-table">

          <div className="admin-table-header">

            <span>USER</span>
            <span>EMAIL</span>
            <span>ROLE</span>
            <span>JOINED</span>
            <span>ACTIONS</span>

          </div>

          {users.map((user) => {

            const isCurrentUser =
              user._id ===
              JSON.parse(
                localStorage.getItem("user")
              )?.id;

            return (
              <div
                className="admin-table-row"
                key={user._id}
              >

                <div className="admin-game-name">
                  <strong>
                    {user.name}
                  </strong>
                </div>

                <span>
                  {user.email}
                </span>

                <span>
                  {user.role || "user"}
                </span>

                <span>
                  {user.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </span>

                <div className="admin-actions">

                  {isCurrentUser ? (
                    <span className="admin-current-user">
                      YOU
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="admin-delete-button"
                      onClick={() =>
                        handleDelete(user._id)
                      }
                    >
                      Delete
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default AdminUsers;