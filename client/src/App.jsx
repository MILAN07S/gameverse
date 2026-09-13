import Games from "./pages/Games";
import Categories from "./pages/Categories";
import CategoryGames from "./pages/CategoryGames";
import Reviews from "./pages/Reviews";
import Footer from "./components/Footer";

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

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;