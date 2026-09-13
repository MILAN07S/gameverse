import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>SIGN IN</h1>

        <p className="auth-subtitle">
          Welcome back to GameVerse.
        </p>

        <form onSubmit={handleLogin}>

          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Sign in
          </button>

        </form>

        <p className="auth-switch">
          New here?{" "}
          <button onClick={() => navigate("/signup")}>
            Create an account
          </button>
        </p>

      </div>

    </div>
  );
}

export default SignIn;