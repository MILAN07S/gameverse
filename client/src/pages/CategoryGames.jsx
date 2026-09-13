import { Link, useParams } from "react-router-dom";
import games from "../data/games";
import GameCard from "../components/GameCard";

const categoryGames = {
  action: [1, 3, 4, 7, 10, 11, 12, 16, 18, 20, 22],

  adventure: [1, 2, 3, 5, 7, 9, 10, 11, 12, 13, 16, 17, 18, 20, 22],

  rpg: [2, 3, 4, 5, 7, 11, 13, 14, 18],

  racing: [8, 21],

  horror: [19],

  shooter: [4, 10, 15],

  "open world": [1, 2, 4, 5, 6, 7, 9, 10, 11, 14, 21, 22],

  survival: [6, 19, 22],
};

function CategoryGames() {
  const { category } = useParams();

  const selectedCategory = category.toLowerCase();

  const gameIds = categoryGames[selectedCategory] || [];

  const filteredGames = games.filter((game) =>
    gameIds.includes(game.id)
  );

  const categoryTitle = selectedCategory
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return (
    <div className="category-games-page">

      <div className="category-games-header">

        <Link
          to="/categories"
          className="back-button"
        >
          ← Back to Categories
        </Link>

        <div className="eyebrow-line">
          <div className="dash"></div>
          <span>GAMEVERSE CATEGORY</span>
        </div>

        <div className="category-title-row">

          <div>
            <h1>{categoryTitle}</h1>

            <p>
              Explore games from the {categoryTitle.toLowerCase()} category.
            </p>
          </div>

          <div className="category-game-count">
            <strong>{filteredGames.length}</strong>
            <span>GAMES</span>
          </div>

        </div>

      </div>

      {filteredGames.length > 0 ? (

        <div className="games-grid">

          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
            />
          ))}

        </div>

      ) : (

        <div className="category-empty">

          <h2>No Games Found</h2>

          <p>
            There are currently no games in this category.
          </p>

          <Link
            to="/categories"
            className="hero-button"
          >
            Browse Categories
          </Link>

        </div>

      )}

    </div>
  );
}

export default CategoryGames;