// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (avatar) data.append("avatar", avatar);
    if (coverImage) data.append("coverImage", coverImage);

    try {
      await api.post("/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/"); // Navigate to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container - Reduced vertical padding to allow more centering space
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-gray-200 p-2 sm:p-3 lg:p-4 relative">
      {/* HEADER SECTION - Reduced padding */}
      <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center z-10">
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
          to="/"
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
        >
          Sign In
        </Link>
      </div>

      {/* Main Register Card - REMOVED 'transform -translate-y-12' for vertical centering */}
      <div
        className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] 
                   shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full max-w-md"
      >
        {/* Heading - Reduced mb-6 to mb-5 */}
        <h1 className="text-3xl font-bold mb-5 text-center relative">
          Create <span className="font-extrabold text-gray-800">Your</span>{" "}
          <span className="text-blue-500">Account</span>
        </h1>

        {/* Form - Space-y set to 3 for compactness */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Input fields */}
          <div>
            <label className="sr-only" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="bg-gray-50 rounded-lg border-none w-full py-3 px-4 text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 focus:ring-opacity-50 transition duration-200"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <input
              className="bg-gray-50 rounded-lg border-none w-full py-3 px-4 text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 focus:ring-opacity-50 transition duration-200"
              name="username"
              id="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className="bg-gray-50 rounded-lg border-none w-full py-3 px-4 text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 focus:ring-opacity-50 transition duration-200"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className="bg-gray-50 rounded-lg border-none w-full py-3 px-4 text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 focus:ring-opacity-50 transition duration-200"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          {/* Avatar File Input */}
          <div className="pt-1">
            <label className="block text-gray-700 text-sm font-medium mb-0.5">
              Avatar (Optional)
            </label>
            <input
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100 hover:file:cursor-pointer transition duration-200"
              type="file"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          {/* Cover Image File Input */}
          <div className="pt-1">
            <label className="block text-gray-700 text-sm font-medium mb-0.5">
              Cover Image (Optional)
            </label>
            <input
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100 hover:file:cursor-pointer transition duration-200"
              type="file"
              name="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <p className="bg-red-100 text-red-700 text-sm text-center py-2 px-4 rounded-md mt-3">
              {error}
            </p>
          )}

          {/* Sign Up Button */}
          <button
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 
                       flex items-center justify-center space-x-2 transition duration-200 
                       transform hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-600 disabled:shadow-none"
            type="submit"
            disabled={loading}
          >
            <span>{loading ? "Creating Account..." : "Sign Up"}</span>
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
        </form>
      </div>
    </div>
  );
}

export default Register;
