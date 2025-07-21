
import React, { useState } from 'react';

interface SearchProps {
    onSearchChange: (query: string) => void;
}

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
    const [query, setQuery] = useState('');

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearchChange(newQuery);
    };

    const clearQuery = () => {
        setQuery('');
        onSearchChange('');
    };

    return (
        <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search"
                className="block w-full bg-gray-200 dark:bg-gray-700/50 border border-transparent rounded-lg py-2 pl-10 pr-10 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent sm:text-sm transition-colors"
                aria-label="Search notes"
            />
            {query && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button 
                        onClick={clearQuery} 
                        className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:bg-gray-300 dark:focus:bg-gray-600"
                        aria-label="Clear search"
                    >
                       <CloseIcon className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Search;