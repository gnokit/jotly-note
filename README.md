
# Jotly - Your AI-Powered Note-Taking Companion

Jotly is a modern, intuitive, and intelligent note-taking application inspired by the simplicity of Google Keep and supercharged with the power of local AI. It provides a clean, fast, and responsive interface to capture, manage, and enhance your thoughts and ideas using local LLM models with semantic search capabilities.

![Jotly App Screenshot](https://storage.googleapis.com/fpl-assets/jotly-screenshot.png)

## ✨ Key Features

- **AI-Powered Note Enhancement**: Automatically generate concise titles and reformat your raw notes into well-structured, readable Markdown with a single click, powered by local LLM models.
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
    docker-compose -p jotly up -d
    ```

2.  **Access the application:**
    - Jotly app: http://localhost:8099
    - Qdrant (if running locally): http://localhost:6333
    - Ollama (if running locally): http://localhost:11434

3.  **Stop services:**
    ```bash
    docker-compose -p jotly down
    ```

4.  **View logs:**
    ```bash
    docker-compose -p jotly logs -f
    ```

**Docker Setup Notes:**
- The app runs on port 8099 (configurable via docker-compose.yml)
- Uses nginx as reverse proxy for optimal performance
- Requires Ollama and Qdrant to be running separately (not in Docker)
- All configuration is handled via environment variables

## 💡 How to Use

- **Create a Note**: Click on the ""Take a note..." area, type a title and content, and click "Done" or click outside the box to save.
- **Edit a Note**: Simply click on any existing note to enter editing mode.
- **Delete a Note**: Hover over a note and click the trash can icon.
- **Search Notes**: Use the search bar in the header to find notes by meaning - semantic search understands the context of your query.
- **Improve with AI**: Click the sparkles icon (✨) on any note to have your local AI model automatically improve its title and formatting.
