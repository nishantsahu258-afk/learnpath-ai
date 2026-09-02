import { GoogleGenAI } from '@google/genai';
import { buildPrompt } from './promptBuilder';
import { validateLearningPath } from '../validation/learningPathSchema';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const primaryModel = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash';
const FALLBACK_MODELS = Array.from(new Set([primaryModel, 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-2.5-flash']));

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

function formatErrorMessage(error) {
  if (error?.message) {
    try {
      const parsed = JSON.parse(error.message);
      if (parsed?.error?.message) return parsed.error.message;
    } catch (_) {}
    return error.message;
  }
  return "An unexpected AI service error occurred. Please try again.";
}

export async function generateLearningPath(profile) {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  const prompt = buildPrompt(profile);
  let lastError = null;

  for (const model of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      if (!text) continue;

      let parsedData;
      try {
        parsedData = JSON.parse(text);
      } catch (parseError) {
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        parsedData = JSON.parse(cleanedText);
      }

      return validateLearningPath(parsedData);
    } catch (error) {
      console.warn(`Model ${model} failed:`, error.message);
      lastError = error;
      // If error is high demand (503) or rate limit (429), try next model in fallback list
      const msg = error?.message || "";
      if (msg.includes("503") || msg.includes("429") || msg.includes("UNAVAILABLE") || msg.includes("RESOURCE_EXHAUSTED")) {
        continue;
      }
      break;
    }
  }

  console.error("All Gemini models failed:", lastError);
  throw new Error(formatErrorMessage(lastError));
}

export async function askAssistant(promptText) {
  if (!ai) {
    throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  let lastError = null;

  for (const model of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: promptText,
      });
      
      if (response.text) {
        return response.text;
      }
    } catch (error) {
      console.warn(`Model ${model} failed for assistant:`, error.message);
      lastError = error;
      const msg = error?.message || "";
      if (msg.includes("503") || msg.includes("429") || msg.includes("UNAVAILABLE") || msg.includes("RESOURCE_EXHAUSTED")) {
        continue;
      }
      break;
    }
  }

  console.error("Assistant Error:", lastError);
  throw new Error(formatErrorMessage(lastError));
}
