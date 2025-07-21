
# Jotly - Design & Architecture

This document outlines the technical architecture, component structure, and data flow of the Jotly application.

## 1. High-Level Architecture

Jotly is a client-side, single-page application (SPA) built with React. It operates without a traditional backend server for data persistence, instead leveraging the browser's `localStorage`. All AI-powered features are handled by making direct API calls from the client to the Google Gemini API.

The architecture is designed to be modular, scalable, and maintainable, with a clear separation of concerns between UI components, state management, and external services.

## 2. Tech Stack

- **Frontend Framework**: **React 19** is used for building the user interface. The application is built entirely with functional components and extensive use of React Hooks (`useState`, `useEffect`, `useContext`, `useCallback`, `useRef`).
- **Language**: **TypeScript** provides static typing, improving code quality, maintainability, and the developer experience.
- **Styling**: **Tailwind CSS** is used for utility-first styling. This allows for rapid development of a custom, responsive design directly within the markup. A global stylesheet handles scrollbar aesthetics.
- **AI Integration**: The **`@google/genai`** library is used to communicate with the Google Gemini API for note enhancement.
- **State Management**:
    - **Local State**: `useState` is used for managing component-level state (e.g., a note's editing mode, input values).
    - **Shared State**: `React.Context` is used for global state that needs to be shared across the application, specifically for theme management (`ThemeContext`).
    - **Persistent State**: The custom `useLocalStorage` hook provides a simple abstraction to read from and write to the browser's `localStorage`, making the notes data persistent across sessions.
- **Module Loading**: The project uses a **no-build setup**. Dependencies are loaded directly from the [esm.sh](https://esm.sh/) CDN via an `importmap` in `index.html`, eliminating the need for a bundler like Webpack or Vite for development.

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
├── services/         # Modules for external API calls
│   └── geminiService.ts
├── types.ts          # Shared TypeScript type definitions
├── App.tsx           # Main application component
├── index.html        # HTML entry point with importmap
├── index.tsx         # Root React render call
├── metadata.json     # Application metadata
└── README.md         # Project documentation
└── DESIGN.md         # This file
```

## 4. Component Breakdown

- **`App.tsx`**: The root component. It orchestrates the entire application, manages the notes state (CRUD operations), handles search filtering, and renders the main layout.
- **`Header.tsx`**: The sticky header bar. It contains the application logo and title, the `Search` component, and the `ThemeToggle` component.
- **`CreateNote.tsx`**: The form for adding new notes. It manages its own expanded/collapsed state and handles user input before passing the new note data up to `App.tsx`.
- **`NoteGrid.tsx`**: Renders the collection of `Note` components in a responsive grid. It also displays contextual messages for when there are no notes or no search results.
- **`Note.tsx`**: Represents a single note card. This is a key component that manages its own `isEditing` state, displays content (using `react-markdown`), and contains controls for deleting or improving the note.
- **`Search.tsx`**: A controlled input component that lifts the search query state to `App.tsx` for filtering.
- **`ThemeToggle.tsx`**: A simple button that consumes `ThemeContext` to toggle between light and dark themes.
- **`IconButton.tsx` / `LoadingSpinner.tsx`**: General-purpose, reusable UI components.

## 5. Data Flow

- **Notes Data (CRUD)**:
    1. The `notes` array is initialized in `App.tsx` from `localStorage` via the `useLocalStorage` hook.
    2. The state and updater functions (`handleAddNote`, `handleUpdateNote`, `handleDeleteNote`) are owned by `App.tsx`.
    3. These functions are passed down as props to the components that need to trigger actions (`CreateNote`, `NoteGrid` -> `Note`).
    4. When an action is triggered, the callback function in `App.tsx` updates the state, which automatically persists to `localStorage` and causes a re-render.

- **Theme Management**:
    1. `ThemeProvider` in `index.tsx` wraps the entire application.
    2. `ThemeProvider` manages the theme state (`light`/`dark`), applies the corresponding class to the `<html>` element, and saves the setting to `localStorage`.
    3. Any component can access the current theme or the setter function using the `useTheme` hook (e.g., `ThemeToggle`).

- **Search Filtering**:
    1. The `searchQuery` state lives in `App.tsx`.
    2. The `Search` component receives an `onSearchChange` callback.
    3. As the user types, `Search` calls this callback, updating the `searchQuery` in `App.tsx`.
    4. `App.tsx` filters the `notes` array based on the query and passes the `filteredNotes` to `NoteGrid` for rendering.

- **AI Service (`geminiService.ts`)**:
    - This module encapsulates all logic for interacting with the Gemini API.
    - The `improveNote` function constructs a prompt and uses the `gemini-2.5-flash` model with a strict `responseSchema` to request JSON output.
    - This keeps API logic separate from component logic and makes it easy to modify or extend AI features in the future. Components like `Note` and `CreateNote` call this service directly.
