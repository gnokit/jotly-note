
import React, { useState, useRef, useEffect } from 'react';
import { NoteType } from '../types';
import { improveNote } from '../services/ollamaService';
import IconButton from './IconButton';
import LoadingSpinner from './LoadingSpinner';
import { Sparkles } from 'lucide-react';

interface CreateNoteProps {
  onAddNote: (note: Omit<NoteType, 'id' | 'createdAt'>) => void;
}



const CreateNote: React.FC<CreateNoteProps> = ({ onAddNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = contentRef.current;
    if (textarea) {
      if (isExpanded) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      } else {
        textarea.style.height = 'auto';
      }
    }
  }, [content, isExpanded]);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const resetState = () => {
    setIsExpanded(false);
    setTitle('');
    setContent('');
    setError(null);
    setIsImproving(false);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      if (title || content) {
        onAddNote({ title, content });
      }
      resetState();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title || content) {
      onAddNote({ title, content });
      resetState();
    }
  };
  
  const handleImprove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!content) return;
    
    setIsImproving(true);
    setError(null);
    try {
      const improved = await improveNote(title, content);
      setTitle(improved.title);
      setContent(improved.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsImproving(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div ref={wrapperRef} className="px-4 my-8 max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
      >
        <div className="p-4">
          {isExpanded && (
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-lg font-semibold text-gray-900 dark:text-white focus:outline-none mb-3 placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isImproving}
            />
          )}
          <textarea
            ref={contentRef}
            placeholder="Take a note..."
            value={content}
            onChange={handleContentChange}
            onFocus={handleFocus}
            className="w-full bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none resize-none placeholder-gray-500 dark:placeholder-gray-400"
            rows={1}
            disabled={isImproving}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {isExpanded && (
            <div className="flex justify-end items-center mt-2 space-x-2">
              <IconButton onClick={handleImprove} label="Improve with AI" disabled={isImproving || !content}>
                {isImproving ? <LoadingSpinner /> : <Sparkles className="h-5 w-5 text-yellow-500" />}
              </IconButton>
              <button
                type="submit"
                disabled={isImproving}
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-offset-gray-800 transition-colors disabled:bg-gray-400"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateNote;