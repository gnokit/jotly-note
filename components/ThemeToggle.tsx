
import React from 'react';
import useTheme from '../hooks/useTheme';

const SunIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zM12 9a3 3 0 1 1-3 3 3 3 0 0 1 3-3zM12 2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1zm0 18a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zm8-11a1 1 0 0 0-1-1h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1zM5 11a1 1 0 0 0-1-1H2a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1zm12.78-5.22a1 1 0 0 0-1.42 0l-1.41 1.41a1 1 0 1 0 1.41 1.42l1.42-1.41a1 1 0 0 0 0-1.42zM6.34 17.66a1 1 0 0 0-1.41 0l-1.42 1.41a1 1 0 1 0 1.42 1.42L6.34 19.07a1 1 0 0 0 0-1.41zM17.66 6.34a1 1 0 0 0 0 1.41l1.41 1.42a1 1 0 0 0 1.42-1.41l-1.41-1.42a1 1 0 0 0-1.42 0zM7.76 6.34a1 1 0 0 0-1.42-1.41L4.93 6.34a1 1 0 0 0 1.41 1.41l1.42-1.42z" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 11.83A5.002 5.002 0 0 1 12 2a10 10 0 0 0 0 20 5 5 0 0 1 0-10.17z" />
  </svg>
);

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-offset-gray-800 transition-colors"
    >
      {isLight ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
