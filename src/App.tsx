import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import LiveStream from './pages/LiveStream';
import Images from './pages/Images';
import Videos from './pages/Videos';
import Footer from './components/Footer';
import { useAuth0 } from '@auth0/auth0-react';

function App(): JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  // Prevent body scrolling during loading/login screen.
  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading, isAuthenticated]);

  // Explicitly redirect with the callback URL if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        redirect_uri: 'https://quickdarshan.vercel.app/callback' // Corrected callback URL
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  // Theme toggling
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Loading/login screen
  if (isLoading || !isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        {/* Rotating gradient circle behind */}
        <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 rounded-full animate-spin opacity-30"></div>
        <div className="relative text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            QUICK DARSHAN LIVE STREAMING PLATFORM
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  // Main app render
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navigation toggleTheme={toggleTheme} theme={theme} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<LiveStream />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
