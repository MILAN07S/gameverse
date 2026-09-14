import Games from "./pages/Games";
import Categories from "./pages/Categories";
import CategoryGames from "./pages/CategoryGames";
import Reviews from "./pages/Reviews";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminGames from "./pages/Admin/AdminGames";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminReviews from "./pages/Admin/AdminReviews";
import AdminCategories from "./pages/Admin/AdminCategories";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/games"
          element={<Games />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/categories/:category"
          element={<CategoryGames />}
        />

        <Route
          path="/reviews"
          element={<Reviews />}
        />

        <Route
          path="/game/:id"
          element={<GameDetails />}
        />

        <Route
          path="/signin"
          element={<SignIn />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/games"
          element={
            <AdminRoute>
              <AdminGames />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />

        <Route
          path="/admin/reviews"
          element={<AdminReviews />}
        />

        <Route
          path="/admin/categories"
          element={<AdminCategories />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;