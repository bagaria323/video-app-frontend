// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/users/login", {
        email: formData.email,
        username: formData.email,
        password: formData.password,
      });
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));

      navigate("/Dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-gray-200 p-4 sm:p-6 lg:p-8 relative">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <svg
            className="w-7 h-7 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
          <span className="font-semibold text-gray-800 text-lg">
            Video Tube
          </span>
        </div>
        <Link
          to="/register"
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
        >
          Sign up
        </Link>
      </div>

      <div
        className="bg-white p-8 sm:p-10 md:p-12 rounded-[2rem] 
                   shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full max-w-md 
                   transform -translate-y-8"
      >
        <h1 className="text-3xl font-bold mb-8 text-center relative">
          Log in to <span className="font-extrabold text-gray-800">your</span>{" "}
          <span className="text-blue-500">account</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="sr-only" htmlFor="email">
              Email or Username
            </label>
            <input
              className="bg-gray-50 rounded-lg border-none w-full py-3 px-4 text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 focus:ring-opacity-50"
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Email or Phone Number"
              required
            />
          </div>
          <div className="mb-6">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className="bg-gray-50 rounded-lg border-none w-full py-3 px-4 text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 focus:ring-opacity-50"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="flex items-center justify-center">
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 w-full 
                         flex items-center justify-center space-x-2 transition duration-200"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "Logging in..." : "Log In"}</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-500 hover:text-blue-600 transition duration-200"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
