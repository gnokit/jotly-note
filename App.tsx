
import React, { useCallback, useState, useEffect } from 'react';
import { NoteType } from './types';
import Header from './components/Header';
import CreateNote from './components/CreateNote';
import NoteGrid from './components/NoteGrid';
import { qdrantService } from './services/qdrantService';
import { vectorService } from './services/vectorService';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const result = await qdrantService.getAllNotes();
      const qdrantNotes = result.points.map(point => ({
        id: point.id.toString(),
        title: point.payload?.title || '',
        content: point.payload?.content || '',
        createdAt: point.payload?.createdAt || Date.now(),
        updatedAt: point.payload?.updatedAt || Date.now()
      }));
      setNotes(qdrantNotes);
    } catch (error) {
      console.error('Failed to load notes from Qdrant:', error);
    }
  };

  const handleAddNote = useCallback(async (newNote: Omit<NoteType, 'id' | 'createdAt'>) => {
    try {
      const id = new Date().getTime().toString();
      const createdAt = Date.now();
      const updatedAt = createdAt;
      
      const vector = await vectorService.generateEmbedding(newNote.title, newNote.content);
      const payload = await vectorService.generateNotePayload(
        newNote.title,
        newNote.content,
        createdAt,
        updatedAt
      );
      
      await qdrantService.upsertNote(id, vector, payload);
      
      const newNoteWithId = { id, ...newNote, createdAt, updatedAt };
      setNotes(prevNotes => [newNoteWithId, ...prevNotes]);
    } catch (error) {
      console.error('Failed to add note to Qdrant:', error);
    }
  }, []);

  const handleUpdateNote = useCallback(async (id: string, data: Partial<Omit<NoteType, 'id'>>) => {
    try {
      const originalNote = notes.find(note => note.id === id);
      if (!originalNote) return;

      const updatedNote = { ...originalNote, ...data, updatedAt: Date.now() };
      const vector = await vectorService.generateEmbedding(updatedNote.title, updatedNote.content);
      const payload = await vectorService.generateNotePayload(
        updatedNote.title,
        updatedNote.content,
        updatedNote.createdAt,
        updatedNote.updatedAt
      );
      
      await qdrantService.upsertNote(id, vector, payload);
      
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === id ? updatedNote : note
        )
      );
    } catch (error) {
      console.error('Failed to update note in Qdrant:', error);
    }
  }, [notes]);
  
  const handleDeleteNote = useCallback(async (id: string) => {
    try {
      await qdrantService.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Failed to delete note from Qdrant:', error);
    }
  }, []);

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 flex flex-col">
      <Header onSearchChange={handleSearchChange}/>
      <main className="flex-1">
        <CreateNote onAddNote={handleAddNote} />
        <NoteGrid
          notes={filteredNotes}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          searchQuery={searchQuery}
        />
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <p>© 2025 Jotly - Your Local Note Taking App</p>
      </footer>
    </div>
  );
};

export default App;