import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Action",
      image: "/images/action.jpg",
    },
    {
      name: "Adventure",
      image: "/images/adventure.jpg",
    },
    {
      name: "RPG",
      image: "/images/rpg.jpg",
    },
    {
      name: "Racing",
      image: "/images/racing.jpg",
    },
    {
      name: "Horror",
      image: "/images/horror.jpg",
    },
    {
      name: "Shooter",
      image: "/images/shooter.jpg",
    },
    {
      name: "Open World",
      image: "/images/openworld.jpg",
    },
    {
      name: "Survival",
      image: "/images/survival.jpg",
    },
  ];

  return (
    <div className="categories-page">

      {/* HEADER */}
      <div className="categories-header">

        <div className="eyebrow-line">
          <div className="dash"></div>
          <span>GAMEVERSE COLLECTION</span>
        </div>

        <h1>GAME CATEGORIES</h1>

        <p>
          Choose a category and discover games that match
          your style of play.
        </p>

      </div>


      {/* CATEGORY GRID */}
      <div className="categories-grid">

        {categories.map((category, index) => (

          <Link
            key={category.name}
            to={`/categories/${category.name.toLowerCase()}`}
            className="category-card"
          >

            <div className="category-image">

              <img
                src={category.image}
                alt={category.name}
              />

              <div className="category-overlay"></div>


              {/* CATEGORY NAME */}
              <div className="category-label">
                <span>{category.name}</span>
              </div>


              {/* NUMBER */}
              <div className="category-number">
                {String(index + 1).padStart(2, "0")}
              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Categories;