
# Jotly - AI-Powered Markdown Note-Taking for LLM Content

Jotly is a modern markdown-first note-taking application designed specifically for capturing and organizing AI-generated content. Built with React and powered by local LLMs, Jotly provides the perfect environment to directly record, edit, and manage markdown content from today's AI assistants. Whether you're saving ChatGPT responses, Claude outputs, or any other AI-generated markdown, Jotly handles it seamlessly with full markdown rendering and AI-powered enhancement.

<img width="762" height="1020" alt="Screenshot 2025-07-22 at 5 26 23 PM" src="https://github.com/user-attachments/assets/ab29a802-5ec5-4355-9cbc-bf02fb2064a7" />

## ✨ Key Features

- **AI-Powered Markdown Enhancement**: Automatically format and enhance your markdown content with AI-generated titles and improved structure. Perfect for organizing raw AI outputs into clean, readable markdown.
- **Semantic Search**: Find notes by meaning, not just keywords. Powered by vector embeddings and Qdrant vector database.
- **Full CRUD Functionality**: Seamlessly create, read, update, and delete notes.
- **Rich Markdown Support**: Write and view notes with rich formatting, including headings, lists, bold/italic text, links, and more.
- **Responsive Design**: Enjoy a consistent and beautiful experience across all your devices, from large desktop monitors to mobile phones.
- **Light & Dark Themes**: Switch between light and dark modes for your viewing comfort. The app also automatically detects and applies your system's preferred theme on first load.
- **Persistent Storage**: Notes are stored in a local vector database (Qdrant) with semantic search capabilities.
- **Modern & Clean UI**: A minimalist and aesthetically pleasing interface that keeps you focused on your notes.
- **Privacy-First**: All AI processing happens locally on your machine - no data is sent to external servers.

## 🚀 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) (with Hooks)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI Integration**: [Ollama](https://ollama.com/) with:
  - `gemma3:4b-it-qat` (note enhancement)
  - `snowflake-arctic-embed2:latest` (text embeddings)
- **Vector Database**: [Qdrant](https://qdrant.tech/) for semantic search and storage
- **Build System**: Vite with Bun runtime

## 🔧 Getting Started

### Prerequisites
- [Ollama](https://ollama.com/) installed and running locally
- [Docker](https://docker.com/) for running Qdrant vector database
- The `gemma3:4b-it-qat` and `snowflake-arctic-embed2:latest` models downloaded

### 1. Install Ollama
Follow the instructions at [ollama.com](https://ollama.com/) to install Ollama for your operating system.

### 2. Download Required Models
Once Ollama is installed, download both required models:
```bash
ollama pull gemma3:4b-it-qat
ollama pull snowflake-arctic-embed2:latest
```

### 3. Start Services

**Start Ollama:**
```bash
ollama serve
```

**Start Qdrant (in a separate terminal):**
```bash
docker run -p 6333:6333 qdrant/qdrant
```

### 4. Configure Environment

Copy the example environment file and configure for your setup:

```bash
# For development (localhost)
cp .env.example .env

# For production (edit with your actual host)
cp .env.example .env.production
```

For detailed environment configuration, see [ENV_SETUP.md](./ENV_SETUP.md).

### 5. Clone and Run the Application

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

### 🐳 Docker Production Deployment

For production deployment using Docker:

1.  **Build and run with Docker Compose:**
    ```bash
    docker-compose build --no-cache
    ```

2.  **Access the application:**
    - Jotly app: http://localhost:8099
    - Qdrant (if running locally): http://localhost:6333
    - Ollama (if running locally): http://localhost:11434

3.  **Stop services:**
    ```bash
    docker-compose down
    ```

4.  **View logs:**
    ```bash
    docker-compose logs -f
    ```

**Docker Setup Notes:**
- The app runs on port 8099 (configurable via docker-compose.yml)
- Uses nginx as reverse proxy for optimal performance
- Requires Ollama and Qdrant to be running separately (not in Docker)
- All configuration is handled via environment variables

## 💡 How to Use

- **Record Markdown Content**: Paste AI-generated markdown directly into notes - Jotly renders it beautifully with full formatting support.
- **Create a Note**: Click on the "Take a note..." area, type or paste markdown content, and click outside to save.
- **Edit Markdown**: Click any note to edit the raw markdown or use AI enhancement for automatic formatting.
- **AI Enhancement**: Click the sparkles icon (✨) to have your local AI automatically improve markdown structure, add titles, and enhance readability.
- **Search Markdown**: Use semantic search to find notes by content meaning, even within markdown formatting.
- **Full Screen Mode**: Click the maximize icon to view markdown content in distraction-free fullscreen.
- **Delete a Note**: Click the trash icon to remove unwanted notes.
