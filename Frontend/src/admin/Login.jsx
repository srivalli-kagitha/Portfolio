import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If token exists, redirect to dashboard directly
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:9002/api/auth/login", {
        username,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        navigate("/dashboard");
      } else {
        setError("Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-glow glow1"></div>
      <div className="login-glow glow2"></div>

      <div className="login-card">
        <h2>Admin Login</h2>
        <p className="subtitle font-style">Enter your admin credentials</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Portfolio
        </button>
      </div>
    </div>
  );
}

export default Login;