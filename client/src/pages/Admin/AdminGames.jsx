import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGames = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/admin/games", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGames(response.data);
    } catch (error) {
      console.log("Error loading games:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load games."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>
          <div className="eyebrow-line">
            <div className="dash"></div>
            <span>GAME MANAGEMENT</span>
          </div>

          <h1>GAMES</h1>

          <p>
            Manage the games displayed on GameVerse.
          </p>
        </div>

        <button className="admin-add-button">
          + ADD GAME
        </button>
      </div>

      {loading && (
        <p>Loading games...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {!loading && !error && games.length === 0 && (
        <div className="admin-empty">
          <h2>No games yet</h2>
          <p>
            Add your first game from the admin panel.
          </p>
        </div>
      )}

      {!loading && !error && games.length > 0 && (
        <div className="admin-table">

          <div className="admin-table-header">
            <span>GAME</span>
            <span>COMPANY</span>
            <span>GENRE</span>
            <span>YEAR</span>
            <span>ACTIONS</span>
          </div>

          {games.map((game) => (
            <div
              className="admin-table-row"
              key={game._id}
            >
              <div className="admin-game-name">

                <img
                  src={game.image}
                  alt={game.name}
                />

                <strong>
                  {game.name}
                </strong>

              </div>

              <span>
                {game.company}
              </span>

              <span>
                {game.genre}
              </span>

              <span>
                {game.releaseYear}
              </span>

              <div className="admin-actions">

                <button className="admin-edit-button">
                  Edit
                </button>

                <button className="admin-delete-button">
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AdminGames;