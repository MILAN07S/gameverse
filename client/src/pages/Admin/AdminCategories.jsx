import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");

  /* ================================
     LOAD CATEGORIES
  ================================= */

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/admin/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    fetchCategories();
  }, []);


  /* ================================
     RESET FORM
  ================================= */

  const resetForm = () => {
    setName("");
    setImage("");
    setEditingCategory(null);
    setShowForm(false);
    setError("");
  };


  /* ================================
     OPEN ADD FORM
  ================================= */

  const handleAdd = () => {
    setEditingCategory(null);
    setName("");
    setImage("");
    setError("");
    setShowForm(true);
  };


  /* ================================
     OPEN EDIT FORM
  ================================= */

  const handleEdit = (category) => {
    setEditingCategory(category);

    setName(category.name);
    setImage(category.image);

    setError("");
    setShowForm(true);
  };


  /* ================================
     IMAGE SELECT
  ================================= */

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };


  /* ================================
     ADD / UPDATE
  ================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter a category name.");
      return;
    }

    if (!image) {
      setError("Please select a category image.");
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("token");

      const categoryData = {
        name: name.trim(),
        image,
      };


      /* EDIT */

      if (editingCategory) {

        const response = await API.put(
          `/admin/categories/${editingCategory._id}`,
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategories((currentCategories) =>
          currentCategories.map((category) =>
            category._id === editingCategory._id
              ? response.data.category
              : category
          )
        );

      }


      /* ADD */

      else {

        const response = await API.post(
          "/admin/categories",
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategories((currentCategories) => [
          ...currentCategories,
          response.data.category,
        ]);

      }

      resetForm();

    } catch (error) {
      console.log("Error saving category:", error);

      setError(
        error.response?.data?.message ||
          "Unable to save category."
      );
    }
  };


  /* ================================
     DELETE
  ================================= */

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(
        `/admin/categories/${category._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories((currentCategories) =>
        currentCategories.filter(
          (item) => item._id !== category._id
        )
      );

    } catch (error) {
      console.log("Error deleting category:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete category."
      );
    }
  };


  /* ================================
     LOADING
  ================================= */

  if (loading) {
    return (
      <div className="admin-page">

        <div className="admin-header">

          <div>

            <div className="eyebrow-line">
              <div className="dash"></div>

              <span>
                CATEGORY MANAGEMENT
              </span>
            </div>

            <h1>CATEGORIES</h1>

            <p>
              Manage game categories on GameVerse.
            </p>

          </div>

        </div>

        <p>Loading categories...</p>

      </div>
    );
  }


  /* ================================
     PAGE
  ================================= */

  return (
    <div className="admin-page">

      {/* HEADER */}

      <div className="admin-header">

        <div>

          <div className="eyebrow-line">
            <div className="dash"></div>

            <span>
              CATEGORY MANAGEMENT
            </span>
          </div>

          <h1>CATEGORIES</h1>

          <p>
            Add, edit and delete categories from GameVerse.
          </p>

        </div>


        <button
          type="button"
          className="admin-add-button"
          onClick={handleAdd}
        >
          + ADD CATEGORY
        </button>

      </div>


      {/* ERROR */}

      {error && !showForm && (
        <div className="admin-error">
          {error}
        </div>
      )}


      {/* FORM */}

      {showForm && (

        <div className="admin-form-card">

          <div className="admin-form-header">

            <div>

              <div className="eyebrow-line">
                <div className="dash"></div>

                <span>
                  {editingCategory
                    ? "EDIT CATEGORY"
                    : "NEW CATEGORY"}
                </span>
              </div>

              <h2>
                {editingCategory
                  ? "EDIT CATEGORY"
                  : "ADD CATEGORY"}
              </h2>

            </div>

          </div>


          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}


          <form
            className="admin-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            <div className="admin-form-field">

              <label>
                CATEGORY NAME
              </label>

              <input
                type="text"
                placeholder="Example: Action"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>


            {/* IMAGE */}

            <div className="admin-form-field">

              <label>
                CATEGORY IMAGE
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

            </div>


            {/* PREVIEW */}

            {image && (

              <div className="admin-category-preview">

                <span>
                  IMAGE PREVIEW
                </span>

                <img
                  src={image}
                  alt="Category preview"
                />

              </div>

            )}


            {/* BUTTONS */}

            <div className="admin-form-actions">

              <button
                type="submit"
                className="admin-save-button"
              >
                {editingCategory
                  ? "UPDATE CATEGORY"
                  : "ADD CATEGORY"}
              </button>

              <button
                type="button"
                className="admin-cancel-button"
                onClick={resetForm}
              >
                CANCEL
              </button>

            </div>

          </form>

        </div>
      )}


      {/* CATEGORY LIST */}

      {!showForm && categories.length === 0 && (

        <div className="admin-empty">

          <h2>
            NO CATEGORIES
          </h2>

          <p>
            Add your first game category.
          </p>

          <button
            type="button"
            className="admin-add-button"
            onClick={handleAdd}
          >
            + ADD CATEGORY
          </button>

        </div>

      )}


      {!showForm && categories.length > 0 && (

        <div className="admin-category-grid">

          {categories.map((category, index) => (

            <div
              className="admin-category-card"
              key={category._id}
            >

              {/* IMAGE */}

              <div className="admin-category-image">

                <img
                  src={category.image}
                  alt={category.name}
                />

                <span className="admin-category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>


              {/* CONTENT */}

              <div className="admin-category-content">

                <h2>
                  {category.name}
                </h2>


                <div className="admin-category-actions">

                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() =>
                      handleEdit(category)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      handleDelete(category)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminCategories;