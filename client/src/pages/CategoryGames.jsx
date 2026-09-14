import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import GameCard from "../components/GameCard";

function CategoryGames() {
    const { category } = useParams();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await API.get("/games");

                setGames(response.data);
            } catch (error) {
                console.log(
                    "Error loading category games:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load games."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const decodedCategory = decodeURIComponent(category || "");

    const filteredGames = games.filter((game) => {
        return (
            game.genre?.toLowerCase() ===
            decodedCategory.toLowerCase()
        );
    });

    if (loading) {
        return (
            <div className="games-page">
                <section className="games-section">
                    <h2>Loading games...</h2>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="games-page">
                <section className="games-section">
                    <h2>Unable to load games</h2>
                    <p>{error}</p>
                </section>
            </div>
        );
    }

    return (
        <div className="games-page">

            <section className="games-section">

                <div className="section-head">

                    <div>
                        <div className="eyebrow-line">
                            <div className="dash"></div>
                            <span>GAMEVERSE CATEGORY</span>
                        </div>

                        <h1>{decodedCategory}</h1>
                    </div>

                    <span className="game-count">
                        {filteredGames.length} titles
                    </span>

                </div>

                {filteredGames.length === 0 ? (
                    <div className="empty-state">

                        <h2>No games found</h2>

                        <p>
                            There are currently no games
                            in this category.
                        </p>

                        <Link
                            to="/games"
                            className="hero-button"
                        >
                            View All Games
                        </Link>

                    </div>
                ) : (
                    <div className="games-grid">

                        {filteredGames.map((game) => (
                            <GameCard
                                key={game._id}
                                game={game}
                            />
                        ))}

                    </div>
                )}

            </section>

        </div>
    );
}

export default CategoryGames;