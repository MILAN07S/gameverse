import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import games from "../data/games";

function GameDetails() {
    const { id } = useParams();

    const game = games.find(
        (item) => item.id === Number(id)
    );

    const [currentPreview, setCurrentPreview] = useState(0);

    // If game doesn't exist
    if (!game) {
        return (
            <div className="not-found">
                <h1>Game Not Found</h1>

                <Link to="/" className="back-button">
                    ← Back to catalog
                </Link>
            </div>
        );
    }

    // Preview images
    const previews = game.previews || [];

    // Preview descriptions
    const previewTitles = game.preview || [];

    // Next preview
    const nextPreview = () => {
        setCurrentPreview((current) =>
            current === previews.length - 1
                ? 0
                : current + 1
        );
    };

    // Previous preview
    const previousPreview = () => {
        setCurrentPreview((current) =>
            current === 0
                ? previews.length - 1
                : current - 1
        );
    };

    return (
        <div className="details-container">

            {/* =========================
                Back Button
            ========================= */}

            <div className="detail-top">

                <Link
                    to="/"
                    className="back-button"
                >
                    ← Back to catalog
                </Link>

            </div>


            {/* =========================
                Main Game Details
            ========================= */}

            <div className="detail-grid">


                {/* =========================
                    Game Poster
                ========================= */}

                <div className="detail-poster">

                    <img
                        src={game.image}
                        alt={game.name}
                    />

                    <div className="poster-genre">
                        {game.genre}
                    </div>

                </div>


                {/* =========================
                    Game Information
                ========================= */}

                <div className="detail-info">


                    {/* Game Tags */}

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


                    {/* Game Name */}

                    <h1 className="detail-title">
                        {game.name}
                    </h1>


                    {/* Game Description */}

                    <p className="detail-description">
                        {game.description}
                    </p>


                    {/* =========================
                        Gameplay Snapshots
                    ========================= */}

                    <div className="snapshot-header">

                        <h2 className="detail-section-title">
                            GAMEPLAY SNAPSHOTS
                        </h2>

                    </div>


                    {/* =========================
                        Preview Carousel
                    ========================= */}

                    {previews.length > 0 ? (

                        <div className="snapshots-window">


                            {/* Previous Button */}

                            <button
                                type="button"
                                className="carousel-arrow carousel-arrow-left"
                                onClick={previousPreview}
                                aria-label="Previous gameplay preview"
                            >
                                ←
                            </button>


                            {/* Preview Track */}

                            <div
                                className="snapshots-track"
                                style={{
                                    transform: `translateX(-${currentPreview * 100}%)`
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


                                            {/* Image Overlay */}

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


                            {/* Next Button */}

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


                    {/* =========================
                        Preview Dots
                    ========================= */}

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
                                        aria-label={`Go to preview ${index + 1}`}
                                    />

                                )
                            )}

                        </div>

                    )}


                    {/* =========================
                        Sales & Performance
                    ========================= */}

                    <h2 className="detail-section-title snapshots-title">
                        SALES & PERFORMANCE
                    </h2>


                    <div className="info-grid">


                        {/* Units Sold */}

                        <div className="info-box">

                            <span>
                                Units sold
                            </span>

                            <strong>
                                {game.stats?.units || "N/A"}
                            </strong>

                        </div>


                        {/* Revenue */}

                        <div className="info-box">

                            <span>
                                Lifetime revenue
                            </span>

                            <strong>
                                {game.stats?.revenue || "N/A"}
                            </strong>

                        </div>


                        {/* Profit / Loss */}

                        <div className="info-box">

                            <span>
                                Est. profit / loss
                            </span>

                            <strong className="profit-value">
                                {game.stats?.profit || "N/A"}
                            </strong>

                        </div>


                        {/* Release Year */}

                        <div className="info-box">

                            <span>
                                Released
                            </span>

                            <strong>
                                {game.releaseYear}
                            </strong>

                        </div>

                    </div>


                    {/* =========================
                        Financial Note
                    ========================= */}

                    <div className="stats-note">
                        <h2 className="detail-section-title extra-section-title">
                            GAME INFORMATION
                        </h2>

                        <div className="game-info-grid">

                            <div className="game-info-box">
                                <span>Developer</span>
                                <strong>{game.info?.developer || "N/A"}</strong>
                            </div>

                            <div className="game-info-box">
                                <span>Publisher</span>
                                <strong>{game.info?.publisher || "N/A"}</strong>
                            </div>

                            <div className="game-info-box">
                                <span>Release Date</span>
                                <strong>{game.info?.releaseDate || "N/A"}</strong>
                            </div>

                            <div className="game-info-box">
                                <span>Genre</span>
                                <strong>{game.genre}</strong>
                            </div>

                            <div className="game-info-box">
                                <span>Platforms</span>
                                <strong>{game.info?.platforms || "N/A"}</strong>
                            </div>

                            <div className="game-info-box">
                                <span>Game Mode</span>
                                <strong>{game.info?.mode || "N/A"}</strong>
                            </div>

                        </div>
                        <h2 className="detail-section-title extra-section-title">
                            GAMEVERSE RATING
                        </h2>

                        <div className="game-rating-box">

                            <div className="game-rating-score">
                                <strong>{game.rating?.score || "N/A"}</strong>
                                <span>/ 5</span>
                            </div>

                            <div className="game-rating-details">

                                <div className="game-rating-stars">
                                    ★★★★★
                                </div>

                                <p>
                                    Based on {game.rating?.reviews || 0} player reviews
                                </p>

                            </div>

                        </div>
                        <h2 className="detail-section-title extra-section-title">
                            SYSTEM REQUIREMENTS
                        </h2>

                        <div className="requirements-grid">

                            <div className="requirements-box">

                                <h3>MINIMUM</h3>

                                <div className="requirement-row">
                                    <span>OS</span>
                                    <strong>{game.requirements?.minimum?.os || "N/A"}</strong>
                                </div>

                                <div className="requirement-row">
                                    <span>Processor</span>
                                    <strong>{game.requirements?.minimum?.processor || "N/A"}</strong>
                                </div>

                                <div className="requirement-row">
                                    <span>Memory</span>
                                    <strong>{game.requirements?.minimum?.memory || "N/A"}</strong>
                                </div>

                                <div className="requirement-row">
                                    <span>Graphics</span>
                                    <strong>{game.requirements?.minimum?.graphics || "N/A"}</strong>
                                </div>

                                <div className="requirement-row">
                                    <span>Storage</span>
                                    <strong>{game.requirements?.minimum?.storage || "N/A"}</strong>
                                </div>

                            </div>


                            <div className="requirements-box">

                                <h3>RECOMMENDED</h3>

                                <div className="requirement-row">
                                    <span>OS</span>
                                    <strong>{game.requirements?.recommended?.os || "N/A"}</strong>
                                </div>

                                <div className="requirement-row">
                                    <span>Processor</span>
                                    <strong>{game.requirements?.recommended?.processor || "N/A"}</strong>
                                </div>

                                <div className="requirement-row">
                                    <span>Memory</span>
                                    <strong>{game.requirements?.recommended?.memory || "N/A"}</strong>
                                </div>

                                <div className="requirement-row">
                                    <span>Graphics</span>
                                    <strong>{game.requirements?.recommended?.graphics || "N/A"}</strong>
                                </div>

                                <div className="requirement-row">
                                    <span>Storage</span>
                                    <strong>{game.requirements?.recommended?.storage || "N/A"}</strong>
                                </div>

                            </div>

                        </div> <br/>

                        Sales and financial figures are rounded,
                        illustrative estimates for this demo project
                        — not audited data.

                    </div>

                </div>

            </div>

        </div>
    );
}

export default GameDetails;