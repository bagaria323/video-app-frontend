// src/pages/UploadVideo.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UploadVideo() {
  const navigate = useNavigate();

  // State for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  // State for UI feedback
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
      navigate("/");
    } catch (err) {
      const serverError = err.response?.data?.message || "Upload failed.";
      setError(serverError);
    } finally {
      setUploading(false);
    }
  };

  return (
    // Main container: full screen, dark background, centered
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {/* Form card: Wider for more fields, dark bg, padding, rounded */}
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Upload a New Video
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>

          {/* Video File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Video File
            </label>
            <div className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                required
              />
            </div>
          </div>

          {/* Thumbnail File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Thumbnail Image (Optional)
            </label>
            <div className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
            </div>
          </div>

          {error && <p className="text-sm text-center text-red-400">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Publish Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadVideo;
