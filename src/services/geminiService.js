import { GoogleGenAI } from '@google/genai';
import { buildPrompt } from './promptBuilder';
import { validateLearningPath } from '../validation/learningPathSchema';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const modelName = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.6-flash';

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generateLearningPath(profile) {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    const prompt = buildPrompt(profile);
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response received from Gemini.");
    }

    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (parseError) {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      try {
        parsedData = JSON.parse(cleanedText);
      } catch (secondError) {
        throw new Error("Failed to parse AI response as JSON.");
      }
    }

    return validateLearningPath(parsedData);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}

export async function askAssistant(promptText) {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: promptText,
    });
    
    if (!response.text) {
      throw new Error("Empty response received from Gemini.");
    }
    
    return response.text;
  } catch (error) {
    console.error("Gemini Assistant Error:", error);
    throw error;
  }
}
