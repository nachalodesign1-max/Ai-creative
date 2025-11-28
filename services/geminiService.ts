import { GoogleGenAI } from "@google/genai";
import { GenerationType } from "../types";

// Check for API key availability without exposing it in client code directly if possible.
// We safely check if 'process' is defined to avoid crashing in browser environments that don't polyfill it.
const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const enhancePrompt = async (userInput: string, type: GenerationType): Promise<string> => {
  if (!ai) {
    // Return a user-friendly message instead of crashing or throwing immediately if called
    console.warn("API Key is missing.");
    return "API ключ не настроен. Пожалуйста, убедитесь, что переменная окружения API_KEY добавлена в настройках вашего хостинга.";
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