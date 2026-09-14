import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import GameCard from "../components/GameCard";

function Home() {
    const [games, setGames] = useState([]);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

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

    useEffect(() => {
        if (games.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            setIsChanging(true);

            setTimeout(() => {
                setFeaturedIndex((current) =>
                    (current + 1) % games.length
                );

                setIsChanging(false);
            }, 350);

        }, 3200);

        return () => clearInterval(interval);
    }, [games]);

    if (loading) {
        return (
            <div className="home">
                <section className="games-section">
                    <h2>Loading games...</h2>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home">
                <section className="games-section">
                    <h2>Unable to load games</h2>
                    <p>{error}</p>
                </section>
            </div>
        );
    }

    if (games.length === 0) {
        return (
            <div className="home">
                <section className="games-section">
                    <h2>No games available</h2>
                </section>
            </div>
        );
    }

    const featuredGame = games[featuredIndex];

    return (
        <div className="home">

            {/* FEATURED GAME */}

            <section className="hero">

                <div className="hero-container">

                    <div
                        className={`hero-poster ${
                            isChanging ? "changing" : ""
                        }`}
                    >
                        <img
                            src={featuredGame.image}
                            alt={featuredGame.name}
                        />
                    </div>

                    <div
                        className={`hero-content ${
                            isChanging ? "changing" : ""
                        }`}
                    >

                        <div className="eyebrow-line">

                            <div className="dash"></div>

                            <span>
                                FEATURED GAME
                            </span>

                        </div>

                        <h1>
                            {featuredGame.name}
                        </h1>

                        <p className="hero-company">
                            {featuredGame.company} ·{" "}
                            {featuredGame.releaseYear}
                        </p>

                        <p className="hero-description">
                            {featuredGame.description}
                        </p>

                        <Link
                            to={`/game/${featuredGame.gameId}`}
                            className="hero-button"
                        >
                            View Game
                        </Link>

                    </div>

                </div>

            </section>


            {/* POPULAR GAMES */}

            <section className="games-section">

                <div className="section-head">

                    <h2>
                        Popular Games
                    </h2>

                    <span className="game-count">
                        {games.length} titles
                    </span>

                </div>

                <div className="games-grid">

                    {games.slice(0, 12).map((game) => (
                        <GameCard
                            key={game._id}
                            game={game}
                        />
                    ))}

                </div>

                {games.length > 12 && (
                    <Link
                        to="/games"
                        className="see-more-button"
                    >
                        See More
                    </Link>
                )}

            </section>

        </div>
    );
}

export default Home;