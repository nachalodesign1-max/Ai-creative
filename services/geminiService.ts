import { GoogleGenAI } from "@google/genai";
import { GenerationType } from "../types";

// Check for API key availability.
// We safely check if 'process' is defined to avoid crashing in browser environments.
const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

// Mock response for Demo Mode (when API key is missing)
const getMockResponse = (userInput: string, type: GenerationType): string => {
  // In a real app we would translate, but for demo we simulate the structure
  if (type === GenerationType.PHOTO) {
    return `**PROMPT:** Cinematic wide shot of ${userInput}, hyper-realistic, 8k resolution, dramatic volumetric lighting, shot on Sony A7R IV, 35mm lens, f/1.8, depth of field, bokeh, golden hour, highly detailed texture, professional photography, masterpiece.

**EXPLANATION:** (DEMO MODE) Я улучшил ваш запрос, добавив параметры профессиональной камеры (Sony A7R), настройки объектива для красивого размытия фона и кинематографичное освещение ("золотой час") для фотореализма.`;
  } else {
    return `**PROMPT:** Cinematic video clip of ${userInput}, slow motion, smooth camera dolly zoom, 4k, high fidelity, physics-based motion, atmospheric lighting, epic scale, professional color grading, unreal engine 5 render style, continuous movement.

**EXPLANATION:** (DEMO MODE) Оптимизировано для видео: добавлено плавное движение камеры (dolly zoom), замедленная съемка (slow motion) и параметры высокого разрешения для создания эпичной атмосферы.`;
  }
};

export const enhancePrompt = async (userInput: string, type: GenerationType): Promise<string> => {
  // DEMO MODE CHECK
  if (!ai) {
    console.warn("API Key missing. Running in DEMO MODE.");
    // Simulate network delay for realistic UX (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    return getMockResponse(userInput, type);
  }

  const modelName = 'gemini-2.5-flash';
  
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
    // Even if the API fails (e.g. quota), fall back to demo mode so the user sees something
    return getMockResponse(userInput, type);
  }
};