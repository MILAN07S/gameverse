import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import games from "../data/games";
import GameCard from "../components/GameCard";

function Home() {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
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
    }, []);

    const featuredGame = games[featuredIndex];

    return (
        <div className="home">

            {/* Featured Game */}
            <section className="hero">
                <div className="hero-container">

                    <div
                        className={`hero-poster ${isChanging ? "changing" : ""
                            }`}
                    >
                        <img
                            src={featuredGame.image}
                            alt={featuredGame.name}
                        />
                    </div>

                    <div
                        className={`hero-content ${isChanging ? "changing" : ""
                            }`}
                    >

                        <div className="eyebrow-line">
                            <div className="dash"></div>
                            <span>FEATURED GAME</span>
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
                            to={`/game/${featuredGame.id}`}
                            className="hero-button"
                        >
                            View Game
                        </Link>

                    </div>

                </div>
            </section>

            {/* Game Catalog */}
            <section className="games-section">

                <div className="section-head">
                    <h2>Popular Games</h2>

                    <span className="game-count">
                        {games.length} titles
                    </span>
                </div>

                <div className="games-grid">
                    {games.slice(0, 12).map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
                        />
                    ))}
                </div>

                <Link
                    to="/games"
                    className="see-more-button"
                >
                    See More
                </Link>

            </section>

        </div>
    );
}

export default Home;