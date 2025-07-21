
import React from 'react';
import ThemeToggle from './ThemeToggle';
import Search from './Search';
import { Edit3 } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center space-x-3 flex-shrink-0">
             <Edit3 className="h-8 w-8 text-yellow-500" />
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