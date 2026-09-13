import games from "../data/games";
import GameCard from "../components/GameCard";

function Games() {
  return (
    <div className="games-section">

      <div className="section-head">
        <h2>All Games</h2>

        <span className="game-count">
          {games.length} titles
        </span>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}
      </div>

    </div>
  );
}

export default Games;