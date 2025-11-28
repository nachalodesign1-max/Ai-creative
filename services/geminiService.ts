import { GoogleGenAI } from "@google/genai";
import { GenerationType } from "../types";

// Check for API key availability without exposing it in client code directly if possible,
// but for this environment, we rely on process.env.API_KEY being injected.
const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const enhancePrompt = async (userInput: string, type: GenerationType): Promise<string> => {
  if (!ai) {
    throw new Error("API Key is missing. Please configure the environment.");
  }

  const modelName = 'gemini-2.5-flash';
  
  // Updated instruction to be tool-agnostic (removed explicit Midjourney/Runway references)
  // Focus is on technical quality (lighting, composition, motion) rather than brand-specific syntax.
  const systemInstruction = `You are an expert AI Artist and Prompt Engineer specializing in Generative AI.
  Your task is to take a raw, simple idea from a user and convert it into a highly detailed, professional prompt optimized for high-end generation models.
  
  If the type is 'Photo', optimize for photorealism and artistic detail. Include details about lighting (e.g., volumetric, cinematic), composition, camera lens, style, and texture.
  If the type is 'Video', optimize for cinematic motion and physics. Include details about camera movement (pan, zoom), motion speed, consistency, and atmosphere.
  
  The user input will be in Russian. You MUST output the final prompt in English (as AI tools work best with English), followed by a brief explanation in Russian of what you added.
  
  Format:
  **PROMPT:** [The English Prompt]
  
  **EXPLANATION:** [Russian explanation of improvements]`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `User Request: "${userInput}". \nType: ${type}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Не удалось сгенерировать ответ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при обращении к ИИ. Пожалуйста, попробуйте позже.";
  }
};