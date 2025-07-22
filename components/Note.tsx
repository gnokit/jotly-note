
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { NoteType } from '../types';
import IconButton from './IconButton';
import LoadingSpinner from './LoadingSpinner';
import { improveNote } from '../services/ollamaService';
import { Sparkles, Trash2 } from 'lucide-react';

interface NoteProps {
  note: NoteType;
  onUpdate: (id: string, data: Partial<Omit<NoteType, 'id'>>) => void;
  onDelete: (id: string) => void;
}



const Note: React.FC<NoteProps> = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback(() => {
    const textarea = contentRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  // Resize textarea when content changes in edit mode
  useEffect(() => {
    if (isEditing) {
      resizeTextarea();
    }
  }, [note.content, isEditing, resizeTextarea]);
  
  // Resize textarea on window resize
  useEffect(() => {
    window.addEventListener('resize', resizeTextarea);
    return () => {
      window.removeEventListener('resize', resizeTextarea);
    };
  }, [resizeTextarea]);

  // Focus title input when editing starts
  useEffect(() => {
    if (isEditing) {
      titleInputRef.current?.focus();
    }
  }, [isEditing]);

  // Handle click outside to exit editing mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImprove = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsImproving(true);
    setError(null);
    try {
      const improvedData = await improveNote(note.title, note.content);
      onUpdate(note.id, { title: improvedData.title, content: improvedData.content });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsImproving(false);
    }
  }, [note.id, note.content, note.title, onUpdate]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(note.id, { title: e.target.value });
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(note.id, { content: e.target.value });
  };

  const handleNoteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent switching to edit mode if a button or link inside was clicked
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const markdownToRender = note.title ? `# ${note.title}\n\n${note.content}` : note.content;

  return (
    <div
      ref={wrapperRef}
      onClick={handleNoteClick}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ${isEditing ? 'ring-2 ring-yellow-500' : 'cursor-pointer'}`}
    >
      {isEditing ? (
        <>
          <div className="p-4">
            <input
              ref={titleInputRef}
              type="text"
              value={note.title}
              onChange={handleTitleChange}
              placeholder="Title"
              className="w-full bg-transparent text-lg font-bold text-gray-900 dark:text-white focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="p-4 pt-0 flex-grow">
            <textarea
              ref={contentRef}
              value={note.content}
              onChange={handleContentChange}
              placeholder="Take a note..."
              className="w-full bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none resize-none placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
            />
          </div>
        </>
      ) : (
        <>
          {(note.title || note.content) && (
             <div className="p-4 flex-grow min-h-[4rem]">
               <article className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 break-words">
                 <ReactMarkdown
                   remarkPlugins={[remarkGfm]}
                   components={{
                     a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-600" />,
                     p: ({node, ...props}) => <p {...props} className="my-2" />,
                   }}
                 >{markdownToRender}</ReactMarkdown>
               </article>
             </div>
          )}
        </>
      )}
      {error && <p className="px-4 pb-2 text-sm text-red-500">{error}</p>}
      <div className="px-4 pb-2 flex items-center justify-between">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <div className={`flex items-center space-x-1 transition-opacity duration-200 ${isEditing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'}`}>
          <IconButton onClick={handleImprove} label="Improve with AI" disabled={isImproving || !note.content}>
            {isImproving ? <LoadingSpinner /> : <Sparkles className="h-5 w-5 text-yellow-500 cursor-pointer" />}
          </IconButton>
          <IconButton onClick={handleDelete} label="Delete note">
            <Trash2 className="h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Note;
