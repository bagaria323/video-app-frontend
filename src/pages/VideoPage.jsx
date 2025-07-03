// src/pages/VideoPage.jsx
import React, { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import api from "../services/api";

function VideoPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?");
    if (confirmDelete) {
      try {
    
        await api.delete(`/videos/${videoId}`);
        
        alert("Video deleted successfully.");
        navigate("/");
      } catch (err) {
        console.error("Failed to delete video", err);
        alert( err.response?.data?.message || "failed to delete video.");
      }
    }
  }
  const handleLike = async () => {
    if (!video) return;
    try {
      await api.post(`/likes/toggle/v/${videoId}`);
      setVideo((prevVideo) => ({
        ...prevVideo,
        isLiked: !prevVideo.isLiked,
        likeCount: prevVideo.isLiked
          ? prevVideo.likeCount - 1
          : prevVideo.likeCount + 1,
      }));
    } catch (err) {
      console.error("Failed to toggle like", err);
      alert("Something went wrong with the like feature.");
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await api.get(`/videos/${videoId}`);
        setVideo(response.data.data);
      } catch (err) {
        setError("Failed to load video.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);

  // --- UI / JSX (All the visual changes are here) ---
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (!video)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Video not found.</p>
      </div>
    );
console.log("LOGGED IN USER:", loggedInUser);
console.log("VIDEO OWNER:", video.owner);

  

return (
  // Main container with a light gray background
  <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
    <div className="max-w-4xl mx-auto">
      {/* Video Player Container */}
      <div className="bg-black rounded-lg shadow-2xl overflow-hidden mb-4">
        <video
          className="w-full aspect-video"
          controls
          autoPlay
          src={video.videoFile}
          poster={video.thumbnail}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Metadata and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          {video.title}
        </h1>

        {/* --- RESPONSIVE & DELETE BUTTON UPGRADE --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Owner Information (remains the same) */}
          <p className="text-gray-600">
            by{" "}
            <span className="font-semibold">
              {video.owner?.username || "Unknown"}
            </span>
          </p>

          {/* Action Buttons Container */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex-grow sm:flex-grow-0 font-bold py-2 px-5 rounded-full transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
                video.isLiked
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0016 8h-2V5a2 2 0 00-2-2h-1a2 2 0 00-2 2v1H6a2 2 0 00-2 2h2v1.333z" />
              </svg>
              <span>
                {video.likeCount} {video.isLiked ? "Liked" : "Like"}
              </span>
            </button>

            {/* Conditional Delete Button */}
            {loggedInUser &&
              video.owner && loggedInUser._id === (video.owner._id || video.owner)
              && (
                <button
                  onClick={handleDelete}
                  className="flex-grow sm:flex-grow-0 font-bold py-2 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 shadow-sm"
                >
                  Delete
                </button>
              )}
          </div>
        </div>
        {/* --- END OF UPGRADE --- */}

        <hr className="my-6" />

        {/* Video Description */}
        <div className="prose max-w-none text-gray-800">
          <p>{video.description}</p>
        </div>
      </div>

      {/* Placeholder for Comments Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <p className="text-gray-500">Comments coming soon!</p>
      </div>
    </div>
  </div>
);
};
export default VideoPage;
