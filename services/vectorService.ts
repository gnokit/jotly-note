import { embedText } from './ollamaService';
import { NotePayload } from './qdrantService';
import { qdrantService } from './qdrantService';
import { NoteType } from '../types';

export class VectorService {
  async generateEmbedding(title: string, content: string): Promise<number[]> {
    const combinedText = `${title} ${content}`;
    return await embedText(combinedText);
  }

  async searchSimilarNotes(query: string, limit = 5) {
    const queryVector = await embedText(query);
    return await qdrantService.searchNotes(queryVector, limit);
  }

  async semanticSearch(query: string, limit = 3): Promise<NoteType[]> {
    try {
      const searchResults = await this.searchSimilarNotes(query, limit);
      
      return searchResults.map(result => ({
        id: result.id.toString(),
        title: result.payload?.title || '',
        content: result.payload?.content || '',
        createdAt: result.payload?.createdAt || Date.now(),
        updatedAt: result.payload?.updatedAt || Date.now()
      }));
    } catch (error) {
      console.error('Semantic search failed:', error);
      throw error;
    }
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