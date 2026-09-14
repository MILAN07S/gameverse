import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCategories(response.data);
      } catch (error) {
        console.log("Error loading categories:", error);

        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="categories-page">
        <div className="categories-header">
          <div className="eyebrow-line">
            <div className="dash"></div>
            <span>GAMEVERSE COLLECTION</span>
          </div>

          <h1>GAME CATEGORIES</h1>

          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-page">
        <div className="categories-header">
          <div className="eyebrow-line">
            <div className="dash"></div>
            <span>GAMEVERSE COLLECTION</span>
          </div>

          <h1>GAME CATEGORIES</h1>

          <p>{error}</p>
        </div>
      </div>
    );
  }

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
            key={category._id}
            to={`/categories/${category.name.toLowerCase()}`}
            className="category-card"
          >

            <div className="category-image">

              <img
                src={category.image}
                alt={category.name}
              />

              <div className="category-overlay"></div>

              <div className="category-label">
                <span>{category.name}</span>
              </div>

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