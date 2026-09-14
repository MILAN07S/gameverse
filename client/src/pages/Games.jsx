import { useEffect, useState } from "react";
import API from "../services/api";
import GameCard from "../components/GameCard";

function Games() {
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
                console.log("Error loading games:", error);

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
                            <span>GAMEVERSE CATALOG</span>
                        </div>

                        <h1>ALL GAMES</h1>
                    </div>

                    <span className="game-count">
                        {games.length} titles
                    </span>
                </div>

                {games.length === 0 ? (
                    <div className="empty-state">
                        <h2>No games available</h2>
                        <p>
                            Games added from the admin panel
                            will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="games-grid">
                        {games.map((game) => (
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

export default Games;