import React from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import type { MediaItem } from '../types';

interface MediaGridProps {
  items: MediaItem[];
  type: 'image' | 'video';
}

export default function MediaGrid({ items, type }: MediaGridProps) {
  const [selectedItem, setSelectedItem] = React.useState<MediaItem | null>(null);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="mb-4 cursor-pointer relative group"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.thumbnail_url}
              alt={item.title}
              className="w-full rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
              <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </Masonry>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-7xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {type === 'image' ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  className="max-w-full max-h-[90vh]"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}