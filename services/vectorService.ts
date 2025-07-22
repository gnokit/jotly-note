import { embedText } from './ollamaService';
import { NotePayload } from './qdrantService';
import { qdrantService } from './qdrantService';

export class VectorService {
  async generateEmbedding(title: string, content: string): Promise<number[]> {
    const combinedText = `${title} ${content}`;
    return await embedText(combinedText);
  }

  async searchSimilarNotes(query: string, limit = 5) {
    const queryVector = await embedText(query);
    return await qdrantService.searchNotes(queryVector, limit);
  }

  async generateNotePayload(title: string, content: string, createdAt: number, updatedAt: number): Promise<NotePayload> {
    return {
      title,
      content,
      createdAt,
      updatedAt
    };
  }
}

export const vectorService = new VectorService();