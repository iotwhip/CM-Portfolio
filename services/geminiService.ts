
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateCreativeBrief = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following user idea, generate a short, exciting, and imaginative creative brief for an AI-generated artwork. The brief should be one paragraph and inspire a visually stunning piece. User idea: "${prompt}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating creative brief:", error);
    return "Failed to generate a creative brief. Please check your API key and try again.";
  }
};
