import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert(response.data.message);
      navigate("/signin");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>CREATE ACCOUNT</h1>

        <p className="auth-subtitle">
          Save games and explore the GameVerse catalog.
        </p>

        <form onSubmit={handleSignup}>

          <div className="auth-field">
            <label>Name</label>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            Create account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <button onClick={() => navigate("/signin")}>
            Sign in
          </button>
        </p>

      </div>

    </div>
  );
}

export default SignUp;