import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Link
      to={`/game/${game.id}`}
      className="game-card"
    >
      <div className="game-card-poster">

        <img
          src={game.image}
          alt={game.name}
        />

        <div className="poster-genre">
          {game.genre}
        </div>

      </div>

      <div className="game-card-content">

        <div className="game-card-company">
          {game.company}
        </div>

        <h3>{game.name}</h3>

        <div className="game-card-tags">
          <span>{game.genre}</span>
          <span>{game.releaseYear}</span>
        </div>

      </div>
    </Link>
  );
}

export default GameCard;