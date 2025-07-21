
# Jotly - Your AI-Powered Note-Taking Companion

Jotly is a modern, intuitive, and intelligent note-taking application inspired by the simplicity of Google Keep and supercharged with the power of Google's Gemini AI. It provides a clean, fast, and responsive interface to capture, manage, and enhance your thoughts and ideas.

![Jotly App Screenshot](https://storage.googleapis.com/fpl-assets/jotly-screenshot.png)

## ✨ Key Features

- **AI-Powered Note Enhancement**: Automatically generate concise titles and reformat your raw notes into well-structured, readable Markdown with a single click, powered by the Gemini API.
- **Full CRUD Functionality**: Seamlessly create, read, update, and delete notes.
- **Real-time Search**: Instantly find the note you're looking for with a powerful search bar that filters notes by title and content as you type.
- **Rich Markdown Support**: Write and view notes with rich formatting, including headings, lists, bold/italic text, links, and more.
- **Responsive Design**: Enjoy a consistent and beautiful experience across all your devices, from large desktop monitors to mobile phones.
- **Light & Dark Themes**: Switch between light and dark modes for your viewing comfort. The app also automatically detects and applies your system's preferred theme on first load.
- **Persistent Local Storage**: Your notes and theme preferences are securely saved in your browser's local storage, so they're always there when you return.
- **Modern & Clean UI**: A minimalist and aesthetically pleasing interface that keeps you focused on your notes.

## 🚀 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) (with Hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
- **Dependencies**: Modules are loaded directly in the browser via `importmap` from [esm.sh](https://esm.sh/).

## 🔧 Getting Started

To run this project locally, you'll need to have a Google Gemini API key.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set up your API Key:**
    Create a file named `.env` in the root of the project and add your Google Gemini API key to it:
    ```
    API_KEY=your_google_gemini_api_key_here
    ```

3.  **Run the application:**
    Since this project uses a no-build setup with `importmap`, you can serve the files using any simple local web server. A common choice is `serve`:
    ```bash
    # If you don't have serve, install it globally
    npm install -g serve

    # Run the server
    serve .
    ```
    The application will now be running on a local port (e.g., `http://localhost:3000`).

## 💡 How to Use

- **Create a Note**: Click on the "Take a note..." area, type a title and content, and click "Done" or click outside the box to save.
- **Edit a Note**: Simply click on any existing note to enter editing mode.
- **Delete a Note**: Hover over a note and click the trash can icon.
- **Search Notes**: Use the search bar in the header to filter your notes in real-time.
- **Improve with AI**: Click the sparkles icon (✨) on any note to have Gemini automatically improve its title and formatting.
