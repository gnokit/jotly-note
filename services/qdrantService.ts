import { QdrantClient } from '@qdrant/js-client-rest';

export interface NotePayload {
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export class QdrantService {
  private client: QdrantClient;
  private collectionName = 'jotly-notes';

  constructor() {
    this.client = new QdrantClient({ url: import.meta.env.VITE_QDRANT_URL || 'http://127.0.0.1:6333' });
  }

  async upsertNote(id: string, vector: number[], payload: NotePayload): Promise<void> {
    const numericId = parseInt(id, 10);
    await this.client.upsert(this.collectionName, {
      points: [{ id: numericId, vector, payload }]
    });
  }

  async deleteNote(id: string): Promise<void> {
    const numericId = parseInt(id, 10);
    await this.client.delete(this.collectionName, { points: [numericId] });
  }

  async searchNotes(queryVector: number[], limit = 10) {
    return await this.client.search(this.collectionName, {
      vector: queryVector,
      limit,
      with_payload: true
    });
  }

  async getAllNotes() {
    return await this.client.scroll(this.collectionName, {
      with_payload: true,
      with_vector: false
    });
  }

  async getNoteById(id: string) {
    const numericId = parseInt(id, 10);
    const result = await this.client.retrieve(this.collectionName, {
      ids: [numericId],
      with_payload: true,
      with_vector: false
    });
    return result[0] || null;
  }
}

export const qdrantService = new QdrantService();