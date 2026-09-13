import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import games from "../data/games";

function Navbar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/signin");
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner">

                <Link to="/" className="logo">
                    <div className="logo-mark">GV</div>
                    <div className="logo-text">GAMEVERSE</div>
                </Link>

                <div className="nav-links">

                    <Link to="/">Home</Link>

                    <Link to="/games">Games</Link>

                    <Link to="/categories">Categories</Link>

                    <Link to="/reviews">Reviews</Link>

                </div>
                <div className="search-wrap">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search the catalog..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <div className="search-results">
                            {games
                                .filter((game) =>
                                    game.name.toLowerCase().includes(search.toLowerCase()) ||
                                    game.company.toLowerCase().includes(search.toLowerCase()) ||
                                    game.genre.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((game) => (
                                    <Link
                                        key={game.id}
                                        to={`/game/${game.id}`}
                                        className="search-result"
                                        onClick={() => setSearch("")}
                                    >
                                        <img src={game.image} alt={game.name} />

                                        <div>
                                            <strong>{game.name}</strong>
                                            <span>{game.company}</span>
                                        </div>
                                    </Link>
                                ))}

                            {games.filter((game) =>
                                game.name.toLowerCase().includes(search.toLowerCase()) ||
                                game.company.toLowerCase().includes(search.toLowerCase()) ||
                                game.genre.toLowerCase().includes(search.toLowerCase())
                            ).length === 0 && (
                                    <div className="no-search-result">
                                        No games found
                                    </div>
                                )}
                        </div>
                    )}
                </div>

                <div className="nav-actions">

                    {token && user ? (
                        <>
                            <div className="user-chip">
                                Signed in as <strong>{user.name}</strong>
                            </div>

                            <button
                                className="btn btn-ghost"
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/signin"
                                className="btn btn-ghost"
                            >
                                Sign in
                            </Link>

                            <Link
                                to="/signup"
                                className="btn btn-gold"
                            >
                                Sign up
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar; 