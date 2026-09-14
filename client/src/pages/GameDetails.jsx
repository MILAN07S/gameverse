import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";

function GameDetails() {
    const { id } = useParams();

    const [game, setGame] = useState(null);
    const [currentPreview, setCurrentPreview] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // LOAD GAME FROM MONGODB
    // ==========================================

    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await API.get(`/games/${id}`);

                setGame(response.data);
                setCurrentPreview(0);

            } catch (error) {
                console.log("Error loading game:", error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load game."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [id]);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="not-found">
                <h1>LOADING GAME...</h1>
                <p>Please wait...</p>
            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error || !game) {
        return (
            <div className="not-found">

                <h1>GAME NOT FOUND</h1>

                <p>
                    {error || "Unable to load game."}
                </p>

                <Link
                    to="/games"
                    className="back-button"
                >
                    ← Back to Games
                </Link>

            </div>
        );
    }


    // ==========================================
    // PREVIEWS
    // ==========================================

    const previews =
        Array.isArray(game.previews)
            ? game.previews
            : Array.isArray(game.preview)
                ? game.preview
                : [];

    const previewTitles =
        Array.isArray(game.preview)
            ? game.preview
            : [];


    // ==========================================
    // NEXT PREVIEW
    // ==========================================

    const nextPreview = () => {
        if (previews.length <= 1) {
            return;
        }

        setCurrentPreview((current) =>
            current === previews.length - 1
                ? 0
                : current + 1
        );
    };


    // ==========================================
    // PREVIOUS PREVIEW
    // ==========================================

    const previousPreview = () => {
        if (previews.length <= 1) {
            return;
        }

        setCurrentPreview((current) =>
            current === 0
                ? previews.length - 1
                : current - 1
        );
    };


    return (
        <div className="details-container">

            {/* =====================================
                BACK BUTTON
            ===================================== */}

            <div className="detail-top">

                <Link
                    to="/games"
                    className="back-button"
                >
                    ← Back to Games
                </Link>

            </div>


            {/* =====================================
                MAIN DETAIL GRID
            ===================================== */}

            <div className="detail-grid">


                {/* =================================
                    LEFT — GAME POSTER
                ================================= */}

                <div className="detail-poster">

                    <img
                        src={game.image}
                        alt={game.name}
                    />

                    <div className="poster-genre">
                        {game.genre}
                    </div>

                </div>


                {/* =================================
                    RIGHT — GAME INFORMATION
                ================================= */}

                <div className="detail-info">


                    {/* =================================
                        TAGS
                    ================================= */}

                    <div className="detail-tags">

                        <span className="tag">
                            {game.company}
                        </span>

                        <span className="tag">
                            {game.releaseYear}
                        </span>

                        <span className="tag">
                            {game.genre}
                        </span>

                    </div>


                    {/* =================================
                        TITLE
                    ================================= */}

                    <h1 className="detail-title">
                        {game.name}
                    </h1>


                    {/* =================================
                        DESCRIPTION
                    ================================= */}

                    <p className="detail-description">
                        {game.description}
                    </p>


                    {/* =================================
                        GAMEPLAY SNAPSHOTS
                    ================================= */}

                    <div className="snapshot-header">

                        <h2 className="detail-section-title">
                            GAMEPLAY SNAPSHOTS
                        </h2>

                    </div>


                    {/* =================================
                        PREVIEW CAROUSEL
                    ================================= */}

                    {previews.length > 0 ? (

                        <div className="snapshots-window">


                            {/* PREVIOUS */}

                            <button
                                type="button"
                                className="carousel-arrow carousel-arrow-left"
                                onClick={previousPreview}
                                aria-label="Previous gameplay preview"
                            >
                                ←
                            </button>


                            {/* TRACK */}

                            <div
                                className="snapshots-track"
                                style={{
                                    transform:
                                        `translateX(-${currentPreview * 100}%)`,
                                }}
                            >

                                {previews.map(
                                    (previewImage, index) => (

                                        <div
                                            className="game-preview"
                                            key={index}
                                        >

                                            <img
                                                src={previewImage}
                                                alt={
                                                    previewTitles[index] ||
                                                    `${game.name} gameplay preview ${index + 1}`
                                                }
                                            />

                                            <div className="preview-overlay">

                                                <span>
                                                    {
                                                        previewTitles[index] ||
                                                        `Gameplay Preview ${index + 1}`
                                                    }
                                                </span>

                                                <small>
                                                    Gameplay preview {index + 1}
                                                </small>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* NEXT */}

                            <button
                                type="button"
                                className="carousel-arrow carousel-arrow-right"
                                onClick={nextPreview}
                                aria-label="Next gameplay preview"
                            >
                                →
                            </button>

                        </div>

                    ) : (

                        <div className="game-preview-empty">
                            No gameplay previews available.
                        </div>

                    )}


                    {/* =================================
                        PREVIEW DOTS
                    ================================= */}

                    {previews.length > 1 && (

                        <div className="preview-dots">

                            {previews.map(
                                (_, index) => (

                                    <button
                                        type="button"
                                        key={index}
                                        className={
                                            currentPreview === index
                                                ? "preview-dot active"
                                                : "preview-dot"
                                        }
                                        onClick={() =>
                                            setCurrentPreview(index)
                                        }
                                        aria-label={
                                            `Go to preview ${index + 1}`
                                        }
                                    />

                                )
                            )}

                        </div>

                    )}


                    {/* =================================
                        SALES & PERFORMANCE
                    ================================= */}

                    <h2 className="detail-section-title snapshots-title">
                        SALES & PERFORMANCE
                    </h2>


                    <div className="info-grid">


                        {/* UNITS */}

                        <div className="info-box">

                            <span>
                                Units sold
                            </span>

                            <strong>
                                {game.stats?.units || "N/A"}
                            </strong>

                        </div>


                        {/* REVENUE */}

                        <div className="info-box">

                            <span>
                                Lifetime revenue
                            </span>

                            <strong>
                                {game.stats?.revenue || "N/A"}
                            </strong>

                        </div>


                        {/* PROFIT */}

                        <div className="info-box">

                            <span>
                                Est. profit / loss
                            </span>

                            <strong className="profit-value">
                                {game.stats?.profit || "N/A"}
                            </strong>

                        </div>


                        {/* RELEASE */}

                        <div className="info-box">

                            <span>
                                Released
                            </span>

                            <strong>
                                {game.releaseYear || "N/A"}
                            </strong>

                        </div>

                    </div>


                    {/* =================================
                        FINANCIAL NOTE
                    ================================= */}

                    <div className="stats-note">

                        Sales and financial figures are rounded,
                        illustrative estimates for this demo project
                        — not audited data.

                    </div>


                    {/* =================================
                        GAME INFORMATION
                    ================================= */}

                    <h2 className="detail-section-title extra-section-title">
                        GAME INFORMATION
                    </h2>


                    <div className="game-info-grid">


                        <div className="game-info-box">

                            <span>
                                Developer
                            </span>

                            <strong>
                                {game.info?.developer || "N/A"}
                            </strong>

                        </div>


                        <div className="game-info-box">

                            <span>
                                Publisher
                            </span>

                            <strong>
                                {game.info?.publisher || "N/A"}
                            </strong>

                        </div>


                        <div className="game-info-box">

                            <span>
                                Release Date
                            </span>

                            <strong>
                                {game.info?.releaseDate || "N/A"}
                            </strong>

                        </div>


                        <div className="game-info-box">

                            <span>
                                Genre
                            </span>

                            <strong>
                                {game.genre || "N/A"}
                            </strong>

                        </div>


                        <div className="game-info-box">

                            <span>
                                Platforms
                            </span>

                            <strong>
                                {game.info?.platforms || "N/A"}
                            </strong>

                        </div>


                        <div className="game-info-box">

                            <span>
                                Game Mode
                            </span>

                            <strong>
                                {game.info?.mode || "N/A"}
                            </strong>

                        </div>

                    </div>


                    {/* =================================
                        GAMEVERSE RATING
                    ================================= */}

                    <h2 className="detail-section-title extra-section-title">
                        GAMEVERSE RATING
                    </h2>


                    <div className="game-rating-box">


                        <div className="game-rating-score">

                            <strong>
                                {game.rating?.score || "N/A"}
                            </strong>

                            <span>
                                / 5
                            </span>

                        </div>


                        <div className="game-rating-details">

                            <div className="game-rating-stars">
                                ★★★★★
                            </div>

                            <p>
                                Based on{" "}
                                {game.rating?.reviews || 0}
                                {" "}player reviews
                            </p>

                        </div>

                    </div>


                    {/* =================================
                        SYSTEM REQUIREMENTS
                    ================================= */}

                    <h2 className="detail-section-title extra-section-title">
                        SYSTEM REQUIREMENTS
                    </h2>


                    <div className="requirements-grid">


                        {/* MINIMUM */}

                        <div className="requirements-box">

                            <h3>
                                MINIMUM
                            </h3>


                            <div className="requirement-row">

                                <span>
                                    OS
                                </span>

                                <strong>
                                    {game.requirements?.minimum?.os || "N/A"}
                                </strong>

                            </div>


                            <div className="requirement-row">

                                <span>
                                    Processor
                                </span>

                                <strong>
                                    {game.requirements?.minimum?.processor || "N/A"}
                                </strong>

                            </div>


                            <div className="requirement-row">

                                <span>
                                    Memory
                                </span>

                                <strong>
                                    {game.requirements?.minimum?.memory || "N/A"}
                                </strong>

                            </div>


                            <div className="requirement-row">

                                <span>
                                    Graphics
                                </span>

                                <strong>
                                    {game.requirements?.minimum?.graphics || "N/A"}
                                </strong>

                            </div>


                            <div className="requirement-row">

                                <span>
                                    Storage
                                </span>

                                <strong>
                                    {game.requirements?.minimum?.storage || "N/A"}
                                </strong>

                            </div>

                        </div>


                        {/* RECOMMENDED */}

                        <div className="requirements-box">

                            <h3>
                                RECOMMENDED
                            </h3>


                            <div className="requirement-row">

                                <span>
                                    OS
                                </span>

                                <strong>
                                    {game.requirements?.recommended?.os || "N/A"}
                                </strong>

                            </div>


                            <div className="requirement-row">

                                <span>
                                    Processor
                                </span>

                                <strong>
                                    {game.requirements?.recommended?.processor || "N/A"}
                                </strong>

                            </div>


                            <div className="requirement-row">

                                <span>
                                    Memory
                                </span>

                                <strong>
                                    {game.requirements?.recommended?.memory || "N/A"}
                                </strong>

                            </div>


                            <div className="requirement-row">

                                <span>
                                    Graphics
                                </span>

                                <strong>
                                    {game.requirements?.recommended?.graphics || "N/A"}
                                </strong>

                            </div>


                            <div className="requirement-row">

                                <span>
                                    Storage
                                </span>

                                <strong>
                                    {game.requirements?.recommended?.storage || "N/A"}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default GameDetails;