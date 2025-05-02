// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      © {new Date().getFullYear()} Quick Darshan Live Streaming
    </footer>
  );
};

export default Footer;
