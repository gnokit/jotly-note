
# Jotly - Design & Architecture

This document outlines the technical architecture, component structure, and data flow of the Jotly application.

## 1. High-Level Architecture

Jotly is a client-side, single-page application (SPA) built with React 19 and TypeScript. It leverages a local AI stack consisting of Ollama for LLM processing and Qdrant for vector-based semantic search and storage. This architecture provides powerful AI capabilities while maintaining complete privacy - no data leaves your local machine.

The architecture is designed to be modular, scalable, and maintainable, with a clear separation of concerns between UI components, state management, AI services, and vector storage.

## 2. Tech Stack

- **Frontend Framework**: **React 19** with functional components and extensive use of React Hooks (`useState`, `useEffect`, `useContext`, `useCallback`, `useRef`).
- **Language**: **TypeScript** for static typing and improved developer experience.
- **Styling**: **Tailwind CSS v4** for utility-first styling with modern design patterns.
- **Build System**: **Vite** with **Bun runtime** for fast development and optimized builds.
- **AI Integration**:
    - **Ollama** for local LLM inference
    - **gemma3:4b-it-qat** model for note enhancement and formatting
    - **snowflake-arctic-embed2:latest** model for text embeddings
- **Vector Storage**: **Qdrant** vector database for semantic search and persistent storage
- **Dependencies**: Standard ES modules via Vite (no importmap)

## 3. Project Structure

The codebase is organized into directories based on functionality:

```
/
├── components/       # Reusable React components
│   ├── CreateNote.tsx
│   ├── Header.tsx
│   ├── IconButton.tsx
│   ├── LoadingSpinner.tsx
│   ├── Note.tsx
│   ├── NoteGrid.tsx
│   ├── Search.tsx
│   └── ThemeToggle.tsx
├── contexts/         # React Context for global state
│   └── ThemeContext.tsx
├── hooks/            # Custom React Hooks
│   ├── useLocalStorage.ts
│   └── useTheme.ts
├── services/         # AI and vector services
│   ├── ollamaService.ts      # AI integration (enhancement + embeddings)
│   ├── qdrantService.ts      # Vector database operations
│   └── vectorService.ts      # Semantic search orchestration
├── types.ts          # Shared TypeScript type definitions
├── App.tsx           # Main application component
├── index.html        # HTML entry point
├── index.tsx         # Root React render call
├── metadata.json     # Application metadata
├── README.md         # Project documentation
└── DESIGN.md         # This file
```

## 4. Component Breakdown

- **`App.tsx`**: The root component managing notes state, semantic search, and CRUD operations. Handles vector embedding generation and Qdrant integration.
- **`Header.tsx`**: Sticky header with search functionality and theme toggle.
- **`CreateNote.tsx`**: Form for adding new notes with validation and embedding generation.
- **`NoteGrid.tsx`**: Responsive grid layout for note cards with search result handling.
- **`Note.tsx`**: Individual note card with editing state, markdown rendering, and AI enhancement controls.
- **`Search.tsx`**: Semantic search input that triggers vector-based queries.
- **`ThemeToggle.tsx`**: Light/dark mode toggle using ThemeContext.
- **`IconButton.tsx` / `LoadingSpinner.tsx`**: Reusable UI components.

## 5. Data Flow

- **Notes Data (CRUD with Vector Embeddings)**:
    1. Notes are stored in Qdrant vector database with associated embeddings
    2. `App.tsx` manages state and coordinates with vector services
    3. On create/update: text is embedded → vector stored in Qdrant alongside note data
    4. On delete: note removed from Qdrant via vector ID
    5. All operations return updated state for React re-rendering

- **Semantic Search**:
    1. User query is embedded using `snowflake-arctic-embed2:latest`
    2. Vector similarity search performed against Qdrant database
    3. Results ranked by semantic similarity and returned as notes
    4. Fallback to text-based search if vector search fails

- **Theme Management**:
    1. `ThemeProvider` manages theme state (`light`/`dark`)
    2. Theme applied to `<html>` element and persisted to localStorage
    3. Accessible via `useTheme` hook throughout components

- **AI Services**:
    - **`ollamaService.ts`**: Encapsulates Ollama API calls for note enhancement and text embedding
    - **`qdrantService.ts`**: Manages vector database operations (CRUD, search)
    - **`vectorService.ts`**: Orchestrates embedding generation and semantic search
    - Services handle errors gracefully with fallback behavior

## 6. Vector Processing Pipeline

- **Embedding Generation**: Combined title and content are embedded into 768-dimensional vectors
- **Storage**: Vectors stored in Qdrant with note metadata as payload
- **Search**: Query vectors compared using cosine similarity for semantic matching
- **Updates**: Note changes trigger re-embedding and vector updates
- **Performance**: Debounced search with 300ms delay for optimal UX
