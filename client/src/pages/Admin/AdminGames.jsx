import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminGames() {
  const emptyForm = {
    name: "",
    company: "",
    genre: "",
    releaseYear: "",
    description: "",
    image: "",
    developer: "",
    publisher: "",
    releaseDate: "",
    platforms: "",
    mode: "",
  };

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  // =========================
  // GET GAMES
  // =========================

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError("");

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

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE IMAGE
  // =========================

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Limit image size to 7 MB
    if (file.size > 7 * 1024 * 1024) {
      setError("Image must be smaller than 7 MB.");
      event.target.value = "";
      return;
    }

    setError("");

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((current) => ({
        ...current,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingGame(null);
    setShowForm(false);
    setError("");
  };

  // =========================
  // ADD GAME
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const token = localStorage.getItem("token");

      const gameData = {
        name: formData.name,
        company: formData.company,
        genre: formData.genre,
        releaseYear: Number(formData.releaseYear),
        description: formData.description,
        image: formData.image,

        info: {
          developer: formData.developer,
          publisher: formData.publisher,
          releaseDate: formData.releaseDate,
          platforms: formData.platforms,
          mode: formData.mode,
        },

        rating: editingGame
          ? editingGame.rating || {
              score: 0,
              reviews: 0,
            }
          : {
              score: 0,
              reviews: 0,
            },

        requirements: editingGame
          ? editingGame.requirements || {
              minimum: {},
              recommended: {},
            }
          : {
              minimum: {},
              recommended: {},
            },
      };

      // EDIT EXISTING GAME
      if (editingGame) {
        const response = await API.put(
          `/admin/games/${editingGame._id}`,
          gameData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setGames((current) =>
          current.map((game) =>
            game._id === editingGame._id
              ? response.data.game
              : game
          )
        );

        alert("Game updated successfully.");

        resetForm();

        return;
      }

      // ADD NEW GAME
      const response = await API.post(
        "/admin/games",
        gameData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGames((current) => [
        response.data.game,
        ...current,
      ]);

      alert("Game added successfully.");

      resetForm();
    } catch (error) {
      console.log("Error saving game:", error);

      setError(
        error.response?.data?.message ||
          "Unable to save game."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // EDIT GAME
  // =========================

  const handleEdit = (game) => {
    setEditingGame(game);

    setFormData({
      name: game.name || "",
      company: game.company || "",
      genre: game.genre || "",
      releaseYear: game.releaseYear || "",
      description: game.description || "",
      image: game.image || "",

      developer: game.info?.developer || "",
      publisher: game.info?.publisher || "",
      releaseDate: game.info?.releaseDate || "",
      platforms: game.info?.platforms || "",
      mode: game.info?.mode || "",
    });

    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE GAME
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("token");

      await API.delete(`/admin/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGames((current) =>
        current.filter((game) => game._id !== id)
      );

      alert("Game deleted successfully.");
    } catch (error) {
      console.log("Error deleting game:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete game."
      );
    }
  };

  return (
    <div className="admin-page">

      {/* =========================
          HEADER
      ========================= */}

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

        <button
          type="button"
          className="admin-add-button"
          onClick={() => {
            setEditingGame(null);
            setFormData(emptyForm);
            setError("");
            setShowForm(true);
          }}
        >
          + ADD GAME
        </button>

      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      {showForm && (
        <div className="admin-form-card">

          <div className="admin-form-header">

            <div>

              <span className="admin-form-label">
                {editingGame
                  ? "EDIT ENTRY"
                  : "NEW ENTRY"}
              </span>

              <h2>
                {editingGame
                  ? "EDIT GAME"
                  : "ADD NEW GAME"}
              </h2>

            </div>

            <button
              type="button"
              onClick={resetForm}
              className="admin-cancel-button"
            >
              Cancel
            </button>

          </div>

          <form
            className="admin-game-form"
            onSubmit={handleSubmit}
          >

            {/* BASIC INFORMATION */}

            <h3 className="admin-form-section-title">
              BASIC INFORMATION
            </h3>

            <div className="admin-form-grid">

              <div className="admin-form-field">
                <label>Game Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. GTA V"
                  required
                />
              </div>

              <div className="admin-form-field">
                <label>Company</label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Rockstar Games"
                  required
                />
              </div>

              <div className="admin-form-field">
                <label>Genre</label>

                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="e.g. Action · Open World"
                  required
                />
              </div>

              <div className="admin-form-field">
                <label>Release Year</label>

                <input
                  type="number"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChange}
                  placeholder="2026"
                  required
                />
              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="admin-form-field">

              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write a description of the game..."
                required
              ></textarea>

            </div>

            {/* IMAGE */}

            <div className="admin-form-field">

              <label>
                Game Poster
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingGame}
              />

              <small>
                {editingGame
                  ? "Choose a new image only if you want to replace the current poster."
                  : "Select a poster image from your device."}
              </small>

              {formData.image && (
                <div className="admin-image-preview">

                  <img
                    src={formData.image}
                    alt="Game poster preview"
                  />

                </div>
              )}

            </div>

            {/* GAME INFORMATION */}

            <h3 className="admin-form-section-title">
              GAME INFORMATION
            </h3>

            <div className="admin-form-grid">

              <div className="admin-form-field">
                <label>Developer</label>

                <input
                  type="text"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  placeholder="e.g. Rockstar Games"
                />
              </div>

              <div className="admin-form-field">
                <label>Publisher</label>

                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="e.g. Rockstar Games"
                />
              </div>

              <div className="admin-form-field">
                <label>Release Date</label>

                <input
                  type="text"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  placeholder="15 March 2026"
                />
              </div>

              <div className="admin-form-field">
                <label>Platforms</label>

                <input
                  type="text"
                  name="platforms"
                  value={formData.platforms}
                  onChange={handleChange}
                  placeholder="PC · PlayStation · Xbox"
                />
              </div>

              <div className="admin-form-field">
                <label>Game Mode</label>

                <input
                  type="text"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  placeholder="Single-player · Multiplayer"
                />
              </div>

            </div>

            {/* BUTTONS */}

            <div className="admin-form-actions">

              <button
                type="button"
                onClick={resetForm}
                className="admin-cancel-button"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-save-button"
                disabled={submitting}
              >
                {submitting
                  ? editingGame
                    ? "SAVING..."
                    : "ADDING..."
                  : editingGame
                  ? "SAVE CHANGES"
                  : "ADD GAME"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <p>Loading games...</p>
      )}

      {/* =========================
          EMPTY
      ========================= */}

      {!loading &&
        !error &&
        games.length === 0 &&
        !showForm && (
          <div className="admin-empty">

            <h2>NO GAMES YET</h2>

            <p>
              Add your first game from the admin panel.
            </p>

          </div>
        )}

      {/* =========================
          GAMES LIST
      ========================= */}

      {!loading &&
        games.length > 0 && (
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

                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() => handleEdit(game)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      handleDelete(game._id)
                    }
                  >
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