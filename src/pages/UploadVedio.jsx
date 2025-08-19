// src/pages/UploadVideo.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function UploadVideo() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !title) {
      setError("Video file and title are required.");
      return;
    }
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await api.post("/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/Dashboard");
    } catch (err) {
      const serverError = err.response?.data?.message || "Upload failed.";
      setError(serverError);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-gray-200 p-2 sm:p-3 lg:p-4 relative">
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
          to="/Dashboard"
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
        >
          Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center relative">
          Upload a <span className="font-extrabold text-gray-800">New</span>{" "}
          <span className="text-blue-500">Video</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 rounded-lg border-none w-full py-3 px-4 text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 focus:ring-opacity-50 transition duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="bg-gray-50 rounded-lg border-none w-full py-3 px-4 text-gray-800 
                         placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-blue-300 focus:ring-opacity-50 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Video File
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100 hover:file:cursor-pointer transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Thumbnail Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100 hover:file:cursor-pointer transition duration-200"
            />
          </div>

          {error && (
            <p className="bg-red-100 text-red-700 text-sm text-center py-2 px-4 rounded-md mt-3">
              {error}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 
                         flex items-center justify-center space-x-2 transition duration-200 
                         transform hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-600 disabled:shadow-none"
            >
              <span>{uploading ? "Uploading..." : "Publish Video"}</span>
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
      </div>
    </div>
  );
}

export default UploadVideo;
