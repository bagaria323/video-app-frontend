// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadVideo from "./pages/UploadVedio.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* main pages */}
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/upload-video"
        element={
          <ProtectedRoute>
            <UploadVideo />
          </ProtectedRoute>
        }
      />
      {/* The page for a single video */}
      <Route path="/videos/:videoId" element={<VideoPage />} />
      {/* A catch-all route for any page that doesn't exist */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
