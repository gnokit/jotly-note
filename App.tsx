
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { NoteType } from './types';
import Header from './components/Header';
import CreateNote from './components/CreateNote';
import NoteGrid from './components/NoteGrid';
import { qdrantService } from './services/qdrantService';
import { vectorService } from './services/vectorService';
import { validateEnvVars } from './utils/security';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NoteType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Validate environment variables on app start
    const envValidation = validateEnvVars();
    if (!envValidation.valid) {
      console.warn('Missing environment variables:', envValidation.missing);
    }
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
      alert('Failed to add note. Please check your connection and try again.');
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
      alert('Failed to update note. Please check your connection and try again.');
    }
  }, [notes]);
  
  const handleDeleteNote = useCallback(async (id: string) => {
    try {
      await qdrantService.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Failed to delete note from Qdrant:', error);
      alert('Failed to delete note. Please check your connection and try again.');
    }
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await vectorService.semanticSearch(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Semantic search failed:', error);
        // Fallback to text search if semantic search fails
        const fallbackResults = notes.filter(note =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.content.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(fallbackResults);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, [notes]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const sortedNotes = [...notes].sort((a, b) => b.createdAt - a.createdAt);

  const displayedNotes = searchQuery ? searchResults : sortedNotes;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 flex flex-col">
      <Header onSearchChange={handleSearchChange}/>
      <main className="flex-1">
        <CreateNote onAddNote={handleAddNote} />
        <NoteGrid
          notes={displayedNotes}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          searchQuery={searchQuery}
          isSearching={isSearching}
        />
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <p>© 2025 Jotly - Your Local Note Taking App</p>
      </footer>
    </div>
  );
};

export default App;