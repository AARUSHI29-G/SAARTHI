
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { IndianLanguage, LanguageMetadata } from "../types";

// Always create a new GoogleGenAI instance inside each function to ensure fresh context and latest keys as per guidelines.

export const getGeminiResponse = async (userMessage: string, lang: IndianLanguage, contextHistory: string = "") => {
  const languageName = LanguageMetadata[lang].name;
  
  // Create a new GoogleGenAI instance right before making an API call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Previous conversation context:\n${contextHistory}\n\nUser says: ${userMessage}`,
      config: {
        systemInstruction: SYSTEM_PROMPT(languageName),
        temperature: 0.7,
      },
    });
    // Access the text property directly (not as a method).
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const explainDocument = async (base64Data: string, mimeType: string, lang: IndianLanguage) => {
  const languageName = LanguageMetadata[lang].name;
  
  // Create a new GoogleGenAI instance right before making an API call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: `Explain this document simply in ${languageName}. Highlight dates, key points, and any specific instructions for the user (like doctor's orders or bank steps). Be empathetic and supportive. Do NOT give advice. Respond ONLY in the native script of ${languageName}.` }
        ]
      },
      config: {
        systemInstruction: SYSTEM_PROMPT(languageName),
      }
    });
    // Access the text property directly (not as a method).
    return response.text;
  } catch (error) {
    console.error("OCR/Doc Error:", error);
    return null;
  }
};
