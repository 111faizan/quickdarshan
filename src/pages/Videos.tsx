// src/pages/Videos.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Videos() {
  const navigate = useNavigate();

  const [savedVideos, setSavedVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading saved videos from "server"
  useEffect(() => {
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('savedVideos') || '[]');
      setSavedVideos(stored);
      setLoading(false);
    }, 1500); // fake delay
  }, []);

  const handleDeleteVideo = (videoSrc: string) => {
    const updated = savedVideos.filter((v) => v !== videoSrc);
    setSavedVideos(updated);
    localStorage.setItem('savedVideos', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12 overflow-hidden">
      {/* Back to Home at top-left */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 z-10"
      >
        Back to Home
      </button>

      <div className="absolute inset-0 bg-white opacity-10" />

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto pt-16 px-4 relative z-10">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Saved Videos</h1>

          {savedVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedVideos.map((vid, idx) => (
                <div key={idx} className="relative">
                  <video src={vid} controls className="w-full h-auto rounded-lg shadow-lg" />
                  <button
                    onClick={() => handleDeleteVideo(vid)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    title="Delete"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-center">No saved videos yet.</p>
          )}
        </div>
      )}
    </div>
  );
}