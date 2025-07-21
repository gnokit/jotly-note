
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ImprovedNote {
  title: string;
  content: string;
}

export const improveNote = async (title: string, content: string): Promise<ImprovedNote> => {
  if (!content || content.trim() === '') {
    throw new Error("Cannot improve an empty note.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following note.
Current Title: "${title}"
Current Content:
---
${content}
---
Instructions:
1. Based on the content, generate a concise and relevant title. If the provided title is good, you can use it or slightly improve it. If it's empty, you MUST generate one.
2. Rewrite the original content using rich Markdown formatting to improve its structure and readability. Use elements like headings (h2, h3), bold text, italics, and lists where appropriate. Do not use a level-1 heading in the content, as the title will serve that purpose.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'A concise and relevant title for the note, no more than 5-10 words.',
            },
            content: {
              type: Type.STRING,
              description: 'The rewritten note content, formatted in rich Markdown.',
            },
          },
          required: ['title', 'content'],
        },
      },
    });
    
    const jsonString = response.text;
    if (!jsonString) {
        throw new Error("Received an empty response from the API.");
    }

    return JSON.parse(jsonString) as ImprovedNote;

  } catch (error) {
    console.error("Error improving note:", error);
    throw new Error("Failed to improve the note. Please check the API key and network connection.");
  }
};
