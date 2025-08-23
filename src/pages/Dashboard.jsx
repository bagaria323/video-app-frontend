// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
    } catch (err) {
      console.error("Logout API call failed.", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/videos");
        setVideos(response.data.data);
      } catch (err) {
        setError("Failed to fetch videos.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    // Applied a very subtle blue background color matching the screenshot
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <header className=" bg-gradient-to-br from-blue-100 to-gray-200 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Combined Logo: Icon + Text - styled to match the screenshot */}
          <Link to="/" className="flex items-center">
            {/* Logo Icon (SVG) - color and size match screenshot */}
            <svg
              className="w-7 h-7 mr-2 text-blue-500" // w-7 h-7 for size, mr-2 for spacing, text-blue-500 for color
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
            {/* Text Logo - "Video Tube" (two words), dark gray, font size/weight adjusted */}
            <span className="text-xl font-semibold text-gray-800">
              Video Tube {/* Text content now "Video Tube" */}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/upload-video"
              className="bg-gray-250  hover:bg-blue-700 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Upload Video
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-250 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Main heading with accent color (kept as is for good visual hierarchy) */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Latest <span className="text-blue-700">Videos</span>
        </h2>

        {loading && (
          <p className="text-center text-lg text-gray-500">Loading videos...</p>
        )}
        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {!loading && !error && (
          <div>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {videos.map((video) => (
                  <Link
                    to={`/videos/${video._id}`}
                    key={video._id}
                    className="group block h-full"
                  >
                    {/* Video card styling remains consistent and looks good */}
                    {/* Removed bg-white from here to allow sections to define their own backgrounds */}
                    <div className="rounded-xl  overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                      {/* Thumbnail container - now explicitly white with rounded top corners */}
                      <div className="relative w-full pb-[65%] flex-shrink-0 bg-white rounded-2xl">
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <div className="absolute top-0 left-0 w-full h-full bg-slate-200 flex items-center justify-center">
                            <span className="text-3xl font-bold text-slate-500">
                              {video.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description box - now explicitly bg-blue-50 with rounded bottom corners */}
                      <div className="p-2 pl-2 flex-grow bg-blue-50 rounded-b-xl">
                        <h3 className="font-bold text-lg text-gray-800 truncate group-hover:text-blue-600 transition-colors mb-1">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          by {video.owner?.username || "Unknown"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  No Videos Yet
                </h2>
                <p className="text-gray-600">
                  Why not be the first to upload one?
                </p>
                <Link
                  to="/upload-video"
                  className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Upload Now
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
