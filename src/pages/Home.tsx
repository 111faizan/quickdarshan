import React from 'react';
import { format } from 'date-fns';
import { motion, useInView } from 'framer-motion';
import EventSlider from '../components/EventSlider';
import Loader from '../components/Loader';
import type { Event } from '../types';

const Reveal = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate server delay
    const timer = setTimeout(() => {
      const localEvents: Event[] = [
        {
          id: 1,
          title: 'Live Mahashivratri Puja',
          description: 'Join the live stream of Mahashivratri night-long puja directly from Kashi Vishwanath Temple.',
          date: format(new Date('2025-03-01'), 'MMMM dd, yyyy'),
          image_url: '/images/mahashivratri.jpg',
        },
        {
          id: 2,
          title: 'Hanuman Jayanti Special Bhajan Sandhya',
          description: 'Experience the spiritual vibes with soulful bhajans in honor of Lord Hanuman.',
          date: format(new Date('2025-04-15'), 'MMMM dd, yyyy'),
          image_url: '/images/hanumanj.jpg',
        },
        {
          id: 3,
          title: 'Durga Aarti from Vaishno Devi',
          description: 'Watch the powerful evening aarti of Goddess Durga streamed live from Vaishno Devi temple.',
          date: format(new Date('2025-10-10'), 'MMMM dd, yyyy'),
          image_url: '/images/vshno.jpg',
        },
        {
          id: 4,
          title: 'Ram Navami Celebrations',
          description: 'Live telecast of Ram Navami celebration from Ayodhya, including processions and chants.',
          date: format(new Date('2025-03-29'), 'MMMM dd, yyyy'),
          image_url: '/images/ramnav.jpg',
        },
        {
          id: 5,
          title: 'Live Ganga Aarti – Haridwar',
          description: 'Feel the divine energy through live Ganga Aarti directly from Har Ki Pauri, Haridwar.',
          date: format(new Date('2025-04-25'), 'MMMM dd, yyyy'),
          image_url: '/images/gng.jpg',
        },
        {
          id: 6,
          title: 'Satyanarayan Katha Stream',
          description: 'Participate virtually in the Satyanarayan Katha from a renowned pandit’s home.',
          date: format(new Date('2025-05-02'), 'MMMM dd, yyyy'),
          image_url: '/images/art.jpg',
        },
      ];

      setEvents(localEvents);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <EventSlider events={events} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Reveal>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Upcoming Events
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Reveal key={event.id}>
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{event.description}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
