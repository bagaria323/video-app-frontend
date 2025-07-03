// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // --- LOGIC (No changes needed here) ---
  const handleLogout = async () => {
    try { await api.post('/users/logout'); }
    catch (err) { console.error("Logout API call failed.", err); }
    finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem("user");
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        setVideos(response.data.data);
      } catch (err) {
        setError('Failed to fetch videos.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // --- UI / JSX ---
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">VideoTube</h1>
          <div className="flex items-center gap-4">
            <Link to="/upload-video" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
              Upload Video
            </Link>
            <button onClick={handleLogout} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200">
              Logout
            </button>
          </div>
          </div>
        </header>
      
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Latest Videos</h2>
        
        {loading && <p className="text-center text-lg">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {videos.map((video) => (
                  <Link to={`/videos/${video._id}`} key={video._id} className="group">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
                      
                      {/* --- THIS IS THE FIX --- */}
                      <div className="aspect-w-16 aspect-h-9">
                        {video.thumbnail ? (
                          // If thumbnail exists, show the image
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          // If NO thumbnail, show a placeholder
                          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                            <span className="text-2xl font-bold text-slate-500">
                              {video.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* --- END OF THE FIX --- */}

                      <div className="p-5">
                        <h3 className="font-bold text-lg text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          by {video.owner?.username || 'Unknown'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">No Videos Yet</h2>
                <p className="text-gray-500">Why not be the first to upload one?</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;