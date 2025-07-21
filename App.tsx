
import React, { useCallback, useState } from 'react';
import { NoteType } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import CreateNote from './components/CreateNote';
import NoteGrid from './components/NoteGrid';

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<NoteType[]>('jotly-notes', []);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNote = useCallback((newNote: Omit<NoteType, 'id' | 'createdAt'>) => {
    setNotes(prevNotes => [
      { 
        id: new Date().getTime().toString(), 
        createdAt: Date.now(),
        ...newNote 
      },
      ...prevNotes,
    ]);
  }, [setNotes]);

  const handleUpdateNote = useCallback((id: string, data: Partial<Omit<NoteType, 'id'>>) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, ...data } : note
      )
    );
  }, [setNotes]);
  
  const handleDeleteNote = useCallback((id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }, [setNotes]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const sortedNotes = [...notes].sort((a, b) => b.createdAt - a.createdAt);

  const filteredNotes = searchQuery
    ? sortedNotes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sortedNotes;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header onSearchChange={handleSearchChange}/>
      <main>
        <CreateNote onAddNote={handleAddNote} />
        <NoteGrid
          notes={filteredNotes}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          searchQuery={searchQuery}
        />
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Built with React, Tailwind CSS, and Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;