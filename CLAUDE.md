# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Jotly** is an AI-powered note-taking application built with React 19 and TypeScript. It uses local AI services (Ollama + Qdrant) for note enhancement and semantic search. The app runs as a client-side SPA with vector-based semantic search capabilities and local persistence.

## Architecture

- **Frontend**: React 19 with functional components and hooks
- **Styling**: Tailwind CSS v4 with typography plugin
- **AI Integration**: 
  - Ollama service with gemma3:4b-it-qat (note enhancement)
  - snowflake-arctic-embed2:latest (text embeddings)
  - Qdrant vector database (semantic search)
- **State Management**: React state + Qdrant for persistence
- **Build System**: Vite with Bun runtime
- **Vector Storage**: Qdrant for semantic search and note storage

## Key Directories

- `components/` - React components (CreateNote, Note, Header, etc.)
- `contexts/` - React Context providers (ThemeContext)
- `hooks/` - Custom hooks (useLocalStorage, useTheme)
- `services/` - AI and vector services
  - `ollamaService.ts` - Local AI integration (enhancement + embeddings)
  - `qdrantService.ts` - Vector database operations
  - `vectorService.ts` - Semantic search orchestration
- `types.ts` - TypeScript interfaces

## Development Commands

```bash
# Install dependencies
bun install

# Development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Local Setup Requirements

1. **Install Ollama** from [ollama.com](https://ollama.com/)
2. **Download models**:
   ```bash
   ollama pull gemma3:4b-it-qat
   ollama pull snowflake-arctic-embed2:latest
   ```
3. **Start Ollama**: `ollama serve`
4. **Start Qdrant**: `docker run -p 6333:6333 qdrant/qdrant`
5. **Run app**: `bun run dev`

## Development Notes

- **Vector Database**: Qdrant stores notes as vectors for semantic search
- **AI Processing**: All processing happens locally - no cloud dependencies
- **Search**: Semantic search via embeddings + fallback text search
- **Storage**: Notes stored in Qdrant with vector embeddings
- **Theme system**: Light/dark mode with automatic system preference detection
- **Responsive**: Mobile-first design with Tailwind

## Key Files

- `App.tsx` - Main component, manages notes state and semantic search
- `types.ts` - NoteType interface definition
- `services/ollamaService.ts` - AI integration (enhancement + embeddings)
- `services/qdrantService.ts` - Vector database operations
- `services/vectorService.ts` - Semantic search coordination
- `vite.config.ts` - Vite configuration with Tailwind v4