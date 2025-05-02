// src/pages/Images.tsx
import React, { useEffect, useState } from 'react';

export default function Images() {
  const [savedImages, setSavedImages] = useState<string[]>(() => {
    const stored = JSON.parse(localStorage.getItem('savedImages') || 'null');
    if (Array.isArray(stored) && stored.length > 0) return stored;
    return [
      '/images/aarti.png',
      '/images/img3.jpg',
      '/images/img4.jpg',
    ];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (url: string) => {
    const updated = savedImages.filter(item => item !== url);
    setSavedImages(updated);
    localStorage.setItem('savedImages', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Image Gallery</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Saved Screenshots</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-40 bg-gray-300 animate-pulse rounded-md"
                />
              ))
            ) : savedImages.length > 0 ? (
              savedImages.map((url, i) => (
                <div key={i} className="relative bg-white shadow-md rounded-md overflow-hidden">
                  <img
                    src={url}
                    alt={`Saved ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDelete(url)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    title="Delete Image"
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No saved images found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
