import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventSlider() {
  const events = [
    {
      title: 'Morning Aarti Darshan',
      description: 'Experience the spiritual bliss of the morning aarti at 6:00 AM, live from the temple premises.',
      date: 'Everyday - 6:00 AM',
      image_url: '/images/mnd.jpg',
      liveStreamUrl: 'http://localhost:5173/live/morning-aarti', // Update to the correct live stream URL
    },
    {
      title: 'Evening Sandhya Aarti',
      description: 'Join us for the mesmerizing evening aarti as lamps are lit and chants echo in the divine ambiance.',
      date: 'Everyday - 7:00 PM',
      image_url: '/images/sandhya.jpg',
      liveStreamUrl: 'http://localhost:5173/live/evening-sandhya', // Update to the correct live stream URL
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Redirect function to join the live stream page
  const handleJoinStream = () => {
    window.location.href = events[currentIndex].liveStreamUrl; // Direct to live stream URL
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={currentIndex}
      >
        <img
          src={events[currentIndex].image_url}
          alt={events[currentIndex].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-4xl font-bold mb-2">{events[currentIndex].title}</h2>
            <p className="text-lg">{events[currentIndex].description}</p>
            <p className="text-sm mt-2">{events[currentIndex].date}</p>
            <button
              onClick={handleJoinStream}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors"
            >
              Join Stream
            </button>
          </div>
        </div>
      </motion.div>

      {events.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}
    </div>
  );
}
