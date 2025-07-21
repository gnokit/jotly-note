# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Jotly** is an AI-powered note-taking application built with React 19 and TypeScript. It uses local Ollama service with the gemma3:4b-it-qat model to enhance notes with improved titles and Markdown formatting. The app is a client-side SPA that persists data in browser localStorage and runs on Bun runtime.

## Architecture

- **Frontend**: React 19 with functional components and hooks
- **Styling**: Tailwind CSS (loaded via CDN)
- **AI Integration**: Local Ollama service with gemma3:4b-it-qat model
- **State Management**: React Context for theme, useState + useLocalStorage for notes
- **Build System**: Vite with Bun runtime
- **Module Loading**: Standard ES modules via Vite (no importmap)

## Key Directories

- `components/` - React components (CreateNote, Note, Header, etc.)
- `contexts/` - React Context providers (ThemeContext)
- `hooks/` - Custom hooks (useLocalStorage, useTheme)
- `services/` - Local AI service integration (ollamaService)
- `types.ts` - TypeScript interfaces (NoteType)

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
2. **Download model**: `ollama pull gemma3:4b-it-qat`
3. **Start service**: `ollama serve`
4. **Run app**: `bun run dev`

## Development Notes

- **Local AI Processing**: All note enhancement happens locally via Ollama
- **No API keys**: Privacy-first approach with no cloud dependencies
- **Local storage**: Notes persist in browser's localStorage under key 'jotly-notes'
- **Theme system**: Light/dark mode with automatic system preference detection
- **AI features**: Note enhancement via `improveNote()` in `ollamaService.ts`
- **Responsive**: Mobile-first design with Tailwind

## Key Files

- `App.tsx` - Main component, manages notes state and search
- `index.html` - Entry point (no importmap)
- `vite.config.ts` - Vite configuration
- `types.ts` - NoteType interface definition
- `services/ollamaService.ts` - Local AI integration