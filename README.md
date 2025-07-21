
# Jotly - Your AI-Powered Note-Taking Companion

Jotly is a modern, intuitive, and intelligent note-taking application inspired by the simplicity of Google Keep and supercharged with the power of local AI. It provides a clean, fast, and responsive interface to capture, manage, and enhance your thoughts and ideas using local LLM models.

![Jotly App Screenshot](https://storage.googleapis.com/fpl-assets/jotly-screenshot.png)

## ✨ Key Features

- **AI-Powered Note Enhancement**: Automatically generate concise titles and reformat your raw notes into well-structured, readable Markdown with a single click, powered by local LLM models.
- **Full CRUD Functionality**: Seamlessly create, read, update, and delete notes.
- **Real-time Search**: Instantly find the note you're looking for with a powerful search bar that filters notes by title and content as you type.
- **Rich Markdown Support**: Write and view notes with rich formatting, including headings, lists, bold/italic text, links, and more.
- **Responsive Design**: Enjoy a consistent and beautiful experience across all your devices, from large desktop monitors to mobile phones.
- **Light & Dark Themes**: Switch between light and dark modes for your viewing comfort. The app also automatically detects and applies your system's preferred theme on first load.
- **Persistent Local Storage**: Your notes and theme preferences are securely saved in your browser's local storage, so they're always there when you return.
- **Modern & Clean UI**: A minimalist and aesthetically pleasing interface that keeps you focused on your notes.
- **Privacy-First**: All AI processing happens locally on your machine with Ollama - no data is sent to external servers.

## 🚀 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) (with Hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Ollama](https://ollama.com/) with `gemma3:4b-it-qat` model
- **Dependencies**: Modules are loaded directly in the browser via `importmap` from [esm.sh](https://esm.sh/).

## 🔧 Getting Started

### Prerequisites
- [Ollama](https://ollama.com/) installed and running locally
- The `gemma3:4b-it-qat` model downloaded

### 1. Install Ollama
Follow the instructions at [ollama.com](https://ollama.com/) to install Ollama for your operating system.

### 2. Download the Model
Once Ollama is installed, download the `gemma3:4b-it-qat` model:
```bash
ollama pull gemma3:4b-it-qat
```

### 3. Start Ollama Service
Ensure Ollama is running:
```bash
ollama serve
```

### 4. Clone and Run the Application

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Run the application:**
    ```bash
    bun run dev
    ```
    
    The application will now be running on a local port (e.g., `http://localhost:5173`).

## 💡 How to Use

- **Create a Note**: Click on the ""Take a note..." area, type a title and content, and click "Done" or click outside the box to save.
- **Edit a Note**: Simply click on any existing note to enter editing mode.
- **Delete a Note**: Hover over a note and click the trash can icon.
- **Search Notes**: Use the search bar in the header to filter your notes in real-time.
- **Improve with AI**: Click the sparkles icon (✨) on any note to have your local AI model automatically improve its title and formatting.
