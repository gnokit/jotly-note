# Environment Configuration Guide

This guide explains how to configure Jotly for different environments using environment variables.

## Environment Files

### Development
- **File**: `.env`
- **Loaded by**: `bun run dev`

### Production
- **File**: `.env.production`
- **Loaded by**: `bun run build`

### Staging
- **File**: `.env.staging`
- **Loaded by**: `bun run build --mode staging`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_OLLAMA_URL` | Ollama service URL for AI note enhancement and embeddings | `http://127.0.0.1:11434` |
| `VITE_QDRANT_URL` | Qdrant vector database URL for semantic search | `http://127.0.0.1:6333` |

## Quick Setup

### 1. Development (Local)
```bash
# .env file
VITE_OLLAMA_URL=http://127.0.0.1:11434
VITE_QDRANT_URL=http://127.0.0.1:6333
```

### 2. Production/Remote Hosting
```bash
# .env.production file
VITE_OLLAMA_URL=http://192.168.1.100:11434
VITE_QDRANT_URL=http://192.168.1.100:6333
```

Replace `192.168.1.100` with your actual server IP address.

## Usage Commands

### Development
```bash
bun run dev
```

### Production Build
```bash
bun run build
```

### Staging Build
```bash
bun run build --mode staging
```

## Docker Configuration

For Docker deployments, you can use runtime environment variables with the placeholder approach:

```bash
# Build with placeholders
VITE_OLLAMA_URL=__VITE_OLLAMA_URL__
VITE_QDRANT_URL=__VITE_QDRANT_URL__

# Then inject at runtime
docker run -e VITE_OLLAMA_URL=http://your-host:11434 -e VITE_QDRANT_URL=http://your-host:6333 your-image
```

## Troubleshooting

### Cannot connect to services
- Verify services are running on the configured URLs
- Check firewall settings for external access
- Ensure correct IP address in environment variables

### Build contains wrong URLs
- Check that `.env.production` contains actual host values, not placeholders
- Rebuild after updating environment files: `bun run build`

### TypeScript errors
- Ensure `vite-env.d.ts` exists with proper type declarations
- Restart TypeScript server if needed