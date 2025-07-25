import { Ollama } from 'ollama/browser';
import { getNoteImprovementPrompt } from './prompts';

export interface ImprovedNote {
  title: string;
  content: string;
}

// Create Ollama client instance
const ollamaClient = new Ollama({
  host: import.meta.env.VITE_OLLAMA_URL || 'http://127.0.0.1:11434'
});

export const improveNote = async (title: string, content: string): Promise<ImprovedNote> => {
  if (!content || content.trim() === '') {
    throw new Error("Cannot improve an empty note.");
  }

  try {
    // Check if Ollama service is available
    try {
      await ollamaClient.list();
    } catch (error) {
      throw new Error(`Cannot connect to Ollama service. Please ensure Ollama is running.`);
    }

    const response = await ollamaClient.chat({
      model: "gemma3:4b-it-qat",
      messages: [
        {
          role: "user",
          content: getNoteImprovementPrompt(title, content)
        }
      ],
      format: "json",
      stream: false,
    });

    if (!response.message?.content) {
      throw new Error("Received empty response from Ollama");
    }

    // Parse the JSON response
    const result = JSON.parse(response.message.content);
    
    // Validate the response structure
    if (!result.title || !result.content) {
      throw new Error("Invalid response format from Ollama");
    }

    return {
      title: result.title,
      content: result.content
    };

  } catch (error) {
    console.error("Error improving note with Ollama:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("model not found")) {
        throw new Error("Model 'gemma3:4b-it-qat' not found. Please run: ollama pull gemma3:4b-it-qat");
      }
      throw error;
    }
    
    throw new Error("Failed to improve the note. Please check that Ollama is running and the model is available.");
  }
};

// Utility function to check Ollama availability
export const checkOllamaHealth = async (): Promise<boolean> => {
  try {
    await ollamaClient.list();
    return true;
  } catch {
    return false;
  }
};

export const embedText = async (text: string): Promise<number[]> => {
  if (!text || text.trim() === '') {
    throw new Error("Cannot embed empty text.");
  }

  try {
    // Check if Ollama service is available
    try {
      await ollamaClient.list();
    } catch (error) {
      throw new Error(`Cannot connect to Ollama service. Please ensure Ollama is running on ${import.meta.env.VITE_OLLAMA_URL || 'http://127.0.0.1:11434'}`);
    }

    const response = await ollamaClient.embed({
      model: "snowflake-arctic-embed2:latest",
      input: text,
      truncate: true
    });

    if (!response.embeddings || response.embeddings.length === 0) {
      throw new Error("Received empty embeddings from Ollama");
    }

    // Return the first embedding since we're only processing one text input
    return response.embeddings[0];

  } catch (error) {
    console.error("Error generating embedding with Ollama:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("model not found")) {
        throw new Error("Model 'snowflake-arctic-embed2:latest' not found. Please run: ollama pull snowflake-arctic-embed2:latest");
      }
      throw error;
    }
    
    throw new Error("Failed to generate embedding. Please check that Ollama is running and the model is available.");
  }
};