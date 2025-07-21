
import React from 'react';
import ThemeToggle from './ThemeToggle';
import Search from './Search';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center space-x-3 flex-shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.08,4.13a1,1,0,0,0-1-1.15,1,1,0,0,0-.6.21L14.65,7.1,3.22,18.54a2,2,0,0,0,0,2.82,2,2,0,0,0,2.83,0l11.43-11.44,4-3.95A1,1,0,0,0,21.08,4.13ZM5.33,20.67a1,1,0,0,1-1.41,0,1,1,0,0,1,0-1.42L12.43,10.8,13.84,12.21ZM15.26,10.8,13.84,9.39l1.42-1.41,1.41,1.41Z"/>
            </svg>
            <span className="text-2xl font-bold text-gray-800 dark:text-white hidden md:inline">Jotly</span>
          </div>
          <div className="flex-1 flex items-center justify-center min-w-0 px-2">
            <Search onSearchChange={onSearchChange} />
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;