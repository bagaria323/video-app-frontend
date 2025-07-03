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

  // The logic is the same, we're just adding Tailwind classes
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
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container - matches the Login page style
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grouping inputs for better structure */}
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {/* File inputs with labels */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Avatar (Required)
            </label>
            <input
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              type="file"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cover Image (Optional)
            </label>
            <input
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              type="file"
              name="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>

          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-blue-500 hover:text-blue-800"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
