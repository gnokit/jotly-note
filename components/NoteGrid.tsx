
import React from 'react';
import { NoteType } from '../types';
import Note from './Note';
import { Search, FileText } from 'lucide-react';

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
          <Search className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" strokeWidth={1} />
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">No results found</p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Try searching for something else.</p>
        </div>
      );
    }

    return (
      <div className="text-center py-20 px-4">
        <FileText className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" strokeWidth={1} />
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