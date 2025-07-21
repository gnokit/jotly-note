# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Jotly** is an AI-powered note-taking application built with React 19 and TypeScript. It uses Google Gemini API to enhance notes with improved titles and Markdown formatting. The app is a client-side SPA that persists data in browser localStorage.

## Architecture

- **Frontend**: React 19 with functional components and hooks
- **Styling**: Tailwind CSS (loaded via CDN)
- **AI Integration**: Google Gemini API via `@google/genai`
- **State Management**: React Context for theme, useState + useLocalStorage for notes
- **Module Loading**: No-build setup with importmap + Vite for development

## Key Directories

- `components/` - React components (CreateNote, Note, Header, etc.)
- `contexts/` - React Context providers (ThemeContext)
- `hooks/` - Custom hooks (useLocalStorage, useTheme)
- `services/` - External API integrations (geminiService)
- `types.ts` - TypeScript interfaces (NoteType)

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Create `.env` file with:
```
GEMINI_API_KEY=your_google_gemini_api_key_here
```

## Development Notes

- **No build required**: Uses importmap for production, Vite for dev
- **Local storage**: Notes persist in browser's localStorage under key 'jotly-notes'
- **Theme system**: Light/dark mode with automatic system preference detection
- **AI features**: Note enhancement via `improveNote()` in `geminiService.ts`
- **Responsive**: Mobile-first design with Tailwind

## Key Files

- `App.tsx` - Main component, manages notes state and search
- `index.html` - Entry point with importmap configuration
- `vite.config.ts` - Vite configuration with env handling
- `types.ts` - NoteType interface definition
- `services/geminiService.ts` - Gemini API integration