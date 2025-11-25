import { GoogleGenAI } from "@google/genai";

// Ideally, this is strictly server-side, but for the demo we initialize here.
// The API key MUST be provided via process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStudentHelp = async (query: string, context?: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI Assistance is currently unavailable (Missing API Key).";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are "CarteiraBot", a helpful virtual assistant for the UFPI (Federal University of Piauí) Digital Student ID application.
      
      Your goal is to help students with:
      1. Document upload requirements (Must be clear, PDF or JPG).
      2. Payment issues (Simulated PIX or Credit Card).
      3. Renewal dates (Annual renewal required).
      
      Current Student Context: ${context || 'Not logged in'}.
      
      Keep answers short, friendly, and use emojis. If asked about technical details, explain that this is a React + Firebase prototype.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I'm having trouble connecting to the university servers right now.";
  }
};