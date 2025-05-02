import React from 'react';
import { NavLink } from 'react-router-dom';
import { Video, Image, Radio, Home, Sun, Moon } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

export default function Navigation({ toggleTheme, theme }: NavigationProps) {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const navVariants = {
    hover: { scale: 1.05, color: '#2563eb' },
    tap: { scale: 0.95 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <NavLink to="/" className="flex items-center px-2 py-2">
              <span className="text-xl font-bold text-gray-800 dark:text-white">Quick Darshan</span>
            </NavLink>
          </div>

          <div className="flex space-x-6 items-center">
            {[
              { to: '/', label: 'Home', Icon: Home },
              { to: '/live', label: 'Live Stream', Icon: Radio },
              { to: '/images', label: 'Images', Icon: Image },
              { to: '/videos', label: 'Videos', Icon: Video },
            ].map(({ to, label, Icon }) => (
              <motion.div key={label} variants={navVariants} whileHover="hover" whileTap="tap">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </NavLink>
              </motion.div>
            ))}

            <motion.button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            {isAuthenticated && (
              <li className="list-none text-gray-800 dark:text-gray-200 font-medium">
                <p>{user.name}</p>
              </li>
            )}

            {isAuthenticated ? (
              <motion.li
                className="list-none"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Log Out
                </motion.button>
              </motion.li>
            ) : (
              <motion.li
                className="list-none"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.button
                  onClick={() => loginWithRedirect()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  Log In
                </motion.button>
              </motion.li>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
