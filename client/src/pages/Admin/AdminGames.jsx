import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

// Supports either:
// export default games;
// OR
// export { games };
import * as gamesModule from "../../data/games";

const gamesData =
  gamesModule.default ||
  gamesModule.games ||
  [];

function AdminGames() {

  const emptyForm = {
    gameId: "",
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


  // =====================================================
  // GET GAMES
  // =====================================================

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


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // =====================================================
  // IMAGE
  // =====================================================

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

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


  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingGame(null);
    setShowForm(false);
    setError("");
  };


  // =====================================================
  // ADD GAME BUTTON
  // =====================================================

  const handleAddGame = () => {
    setEditingGame(null);
    setFormData(emptyForm);
    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =====================================================
  // EDIT GAME
  // =====================================================

  const handleEdit = (game) => {

    setEditingGame(game);

    setFormData({
      gameId: game.gameId || "",
      name: game.name || "",
      company: game.company || "",
      genre: game.genre || "",
      releaseYear: game.releaseYear || "",
      description: game.description || "",
      image: game.image || "",

      developer:
        game.info?.developer || "",

      publisher:
        game.info?.publisher || "",

      releaseDate:
        game.info?.releaseDate || "",

      platforms:
        game.info?.platforms || "",

      mode:
        game.info?.mode || "",
    });

    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =====================================================
  // ADD / UPDATE GAME
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setSubmitting(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!editingGame && !formData.gameId) {
        setError("Game ID is required.");
        setSubmitting(false);
        return;
      }

      if (!formData.name.trim()) {
        setError("Game name is required.");
        setSubmitting(false);
        return;
      }

      if (!formData.company.trim()) {
        setError("Company is required.");
        setSubmitting(false);
        return;
      }

      if (!formData.genre.trim()) {
        setError("Genre is required.");
        setSubmitting(false);
        return;
      }

      if (!formData.releaseYear) {
        setError("Release year is required.");
        setSubmitting(false);
        return;
      }

      if (!formData.description.trim()) {
        setError("Description is required.");
        setSubmitting(false);
        return;
      }

      if (!formData.image) {
        setError("Game poster is required.");
        setSubmitting(false);
        return;
      }


      // Keep existing extra information when editing
      const gameData = {

        gameId: Number(formData.gameId),

        name: formData.name.trim(),

        company: formData.company.trim(),

        genre: formData.genre.trim(),

        releaseYear:
          Number(formData.releaseYear),

        description:
          formData.description.trim(),

        image: formData.image,


        info: {
          developer:
            formData.developer.trim(),

          publisher:
            formData.publisher.trim(),

          releaseDate:
            formData.releaseDate.trim(),

          platforms:
            formData.platforms.trim(),

          mode:
            formData.mode.trim(),
        },


        previews:
          editingGame?.previews || [],

        preview:
          editingGame?.preview || [],


        stats:
          editingGame?.stats || {
            units: "",
            revenue: "",
            profit: "",
          },


        rating:
          editingGame?.rating || {
            score: 0,
            reviews: 0,
          },


        requirements:
          editingGame?.requirements || {
            minimum: {},
            recommended: {},
          },
      };


      // =================================================
      // UPDATE EXISTING GAME
      // =================================================

      if (editingGame) {

        const response = await API.put(
          `/admin/games/${editingGame._id}`,
          gameData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
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


        alert(
          "Game updated successfully."
        );

        resetForm();

        return;
      }


      // =================================================
      // ADD NEW GAME
      // =================================================

      const response = await API.post(
        "/admin/games",
        gameData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      setGames((current) => [
        response.data.game,
        ...current,
      ]);


      alert(
        "Game added successfully."
      );

      resetForm();

    } catch (error) {

      console.log(
        "Error saving game:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to save game."
      );

    } finally {
      setSubmitting(false);
    }
  };


  // =====================================================
  // DELETE GAME
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this game?"
    );

    if (!confirmed) {
      return;
    }

    try {

      setError("");

      const token =
        localStorage.getItem("token");


      await API.delete(
        `/admin/games/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      setGames((current) =>
        current.filter(
          (game) => game._id !== id
        )
      );


      alert(
        "Game deleted successfully."
      );

    } catch (error) {

      console.log(
        "Error deleting game:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to delete game."
      );
    }
  };


  // =====================================================
  // IMPORT ALL 22 ORIGINAL GAMES
  // =====================================================

  const handleImportGames = async () => {

    if (!Array.isArray(gamesData)) {
      setError(
        "games.js data could not be loaded."
      );
      return;
    }


    if (gamesData.length === 0) {
      setError(
        "No games were found in games.js."
      );
      return;
    }


    const confirmed = window.confirm(
      `Import/update all ${gamesData.length} original games into MongoDB?`
    );


    if (!confirmed) {
      return;
    }


    try {

      setSubmitting(true);
      setError("");

      const token =
        localStorage.getItem("token");


      // Get current MongoDB games
      const response = await API.get(
        "/admin/games",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      const existingGames =
        response.data;


      // Import each game
      for (const game of gamesData) {

        const existingGame =
          existingGames.find(
            (item) =>
              Number(item.gameId) ===
              Number(game.id)
          );


        const gameData = {

          gameId:
            Number(game.id),

          name:
            game.name || "",

          company:
            game.company || "",

          genre:
            game.genre || "",

          releaseYear:
            Number(game.releaseYear) || 0,

          image:
            game.image || "",

          description:
            game.description || "",


          previews:
            game.previews || [],

          preview:
            game.preview || [],


          stats: {
            units:
              game.stats?.units || "",

            revenue:
              game.stats?.revenue || "",

            profit:
              game.stats?.profit || "",
          },


          info: {
            developer:
              game.info?.developer || "",

            publisher:
              game.info?.publisher || "",

            releaseDate:
              game.info?.releaseDate || "",

            platforms:
              game.info?.platforms || "",

            mode:
              game.info?.mode || "",
          },


          rating: {
            score:
              game.rating?.score || 0,

            reviews:
              game.rating?.reviews || 0,
          },


          requirements: {
            minimum:
              game.requirements?.minimum || {},

            recommended:
              game.requirements?.recommended || {},
          },
        };


        // Existing game = UPDATE
        if (existingGame) {

          await API.put(
            `/admin/games/${existingGame._id}`,
            gameData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        }

        // Missing game = ADD
        else {

          await API.post(
            "/admin/games",
            gameData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );
        }
      }


      alert(
        `All ${gamesData.length} games are now in MongoDB.`
      );


      await fetchGames();

    } catch (error) {

      console.log(
        "Import error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to import games."
      );

    } finally {

      setSubmitting(false);
    }
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="admin-page">


      {/* BACK */}

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
              GAME MANAGEMENT
            </span>

          </div>


          <h1>
            GAMES
          </h1>


          <p>
            Manage the games displayed
            on GameVerse.
          </p>

        </div>


        {/* HEADER BUTTONS */}

        <div className="admin-header-actions">


          <button
            type="button"
            className="admin-import-button"
            onClick={handleImportGames}
            disabled={submitting}
          >
            {submitting ? "IMPORTING..." : "IMPORT"}
          </button>


          <button
            type="button"
            className="admin-add-button"
            onClick={handleAddGame}
            disabled={submitting}
          >

            + ADD GAME

          </button>


        </div>

      </div>


      {/* ERROR */}

      {error && (

        <div className="admin-error">

          {error}

        </div>

      )}


      {/* =================================================
                ADD / EDIT FORM
            ================================================= */}

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


              {/* GAME ID */}

              <div className="admin-form-field">

                <label>
                  Game ID
                </label>

                <input
                  type="number"
                  name="gameId"
                  value={formData.gameId}
                  onChange={handleChange}
                  placeholder="e.g. 23"
                  required
                  disabled={
                    Boolean(
                      editingGame
                    )
                  }
                />

              </div>


              {/* NAME */}

              <div className="admin-form-field">

                <label>
                  Game Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. GTA V"
                  required
                />

              </div>


              {/* COMPANY */}

              <div className="admin-form-field">

                <label>
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Rockstar Games"
                  required
                />

              </div>


              {/* GENRE */}

              <div className="admin-form-field">

                <label>
                  Genre
                </label>

                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="e.g. Action"
                  required
                />

              </div>


              {/* YEAR */}

              <div className="admin-form-field">

                <label>
                  Release Year
                </label>

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

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write a description..."
                required
              />

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


              {/* DEVELOPER */}

              <div className="admin-form-field">

                <label>
                  Developer
                </label>

                <input
                  type="text"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  placeholder="Developer"
                />

              </div>


              {/* PUBLISHER */}

              <div className="admin-form-field">

                <label>
                  Publisher
                </label>

                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Publisher"
                />

              </div>


              {/* RELEASE DATE */}

              <div className="admin-form-field">

                <label>
                  Release Date
                </label>

                <input
                  type="text"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  placeholder="15 March 2026"
                />

              </div>


              {/* PLATFORMS */}

              <div className="admin-form-field">

                <label>
                  Platforms
                </label>

                <input
                  type="text"
                  name="platforms"
                  value={formData.platforms}
                  onChange={handleChange}
                  placeholder="PC · PlayStation · Xbox"
                />

              </div>


              {/* MODE */}

              <div className="admin-form-field">

                <label>
                  Game Mode
                </label>

                <input
                  type="text"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  placeholder="Single-player"
                />

              </div>

            </div>


            {/* FORM BUTTONS */}

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


      {/* =================================================
                LOADING
            ================================================= */}

      {loading && (

        <p>
          Loading games...
        </p>

      )}


      {/* =================================================
                EMPTY
            ================================================= */}

      {!loading &&
        !error &&
        games.length === 0 &&
        !showForm && (

          <div className="admin-empty">

            <h2>
              NO GAMES YET
            </h2>

            <p>
              Click "IMPORT 22 GAMES"
              to load your existing
              GameVerse games.
            </p>

          </div>

        )}


      {/* =================================================
                GAMES TABLE
            ================================================= */}

      {!loading &&
        games.length > 0 && (

          <div className="admin-table">


            {/* TABLE HEADER */}

            <div className="admin-table-header">

              <span>
                GAME
              </span>

              <span>
                COMPANY
              </span>

              <span>
                GENRE
              </span>

              <span>
                YEAR
              </span>

              <span>
                ACTIONS
              </span>

            </div>


            {/* TABLE ROWS */}

            {games.map((game) => (

              <div
                className="admin-table-row"
                key={game._id}
              >


                {/* GAME */}

                <div className="admin-game-name">

                  <img
                    src={game.image}
                    alt={game.name}
                  />


                  <div>

                    <strong>
                      {game.name}
                    </strong>


                    <small>
                      ID: {game.gameId}
                    </small>

                  </div>

                </div>


                {/* COMPANY */}

                <span>
                  {game.company}
                </span>


                {/* GENRE */}

                <span>
                  {game.genre}
                </span>


                {/* YEAR */}

                <span>
                  {game.releaseYear}
                </span>


                {/* ACTIONS */}

                <div className="admin-actions">


                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() =>
                      handleEdit(game)
                    }
                    disabled={submitting}
                  >
                    Edit
                  </button>


                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      handleDelete(
                        game._id
                      )
                    }
                    disabled={submitting}
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