/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OLLAMA_URL: string
  readonly VITE_QDRANT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}