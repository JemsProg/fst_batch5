// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";
import { Link, replace, useNavigate } from "react-router-dom";
import { handlelogin } from "../api/Authapi.js"; // adjust the path as needed

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const {setIsAuthenticated} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await handlelogin(username, password);
      console.log("Login success:", response.data);

      // example: save tokens to localStorage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      

      if (localStorage.getItem("access")) {
        nav("/profile", { replace: true });
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        className="bg-white shadow-md rounded-md p-6 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-primary mb-4">Sign In</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-hover transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Link */}
        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm text-gray-600 hover:underline"
          >
            Don’t have an account yet?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
