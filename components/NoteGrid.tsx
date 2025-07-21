
import React from 'react';
import { NoteType } from '../types';
import Note from './Note';

interface NoteGridProps {
  notes: NoteType[];
  onUpdateNote: (id: string, data: Partial<Omit<NoteType, 'id'>>) => void;
  onDeleteNote: (id: string) => void;
  searchQuery: string;
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes, onUpdateNote, onDeleteNote, searchQuery }) => {
  if (notes.length === 0) {
    if (searchQuery) {
      return (
        <div className="text-center py-20 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">No results found</p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Try searching for something else.</p>
        </div>
      );
    }

    return (
      <div className="text-center py-20 px-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Notes you add appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8">
      {notes.map((note) => (
        <div key={note.id} className="group">
          <Note
            note={note}
            onUpdate={onUpdateNote}
            onDelete={onDeleteNote}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteGrid;