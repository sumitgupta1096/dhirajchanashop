import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from '../constants';

const SYSTEM_INSTRUCTION = `
You are "Dhiraj's Assistant", a helpful and knowledgeable culinary assistant for Dhiraj Chana Shop.
We sell authentic Indian snacks, legumes, and chaat ingredients.

Here is our menu with prices (in INR):
${MENU_ITEMS.map(i => `- ${i.name}: ₹${i.price} (${i.description})`).join('\n')}

Your goal is to:
1. Suggest recipes based on our ingredients (e.g., if they ask about 'Kala Chana', suggest a curry or salad).
2. Explain health benefits of items like peanuts, chana, dates (Khajoor).
3. Help them build a shopping list (e.g., "For Bhel Puri, you'll need Kurmura, Sev, and Puris").
4. Be friendly, warm, and encourage them to order via the website.

Keep responses concise (under 100 words usually) and formatted nicely.
Do not invent items we don't have, but you can mention common household ingredients (onion, tomato, salt) needed for recipes.
`;

let aiClient: GoogleGenAI | null = null;

export const getAIClient = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const generateChefResponse = async (history: { role: 'user' | 'model', text: string }[], newMessage: string): Promise<string> => {
  const client = getAIClient();
  if (!client) {
    return "I'm sorry, my brain (API Key) is missing right now. Please contact the developer.";
  }

  try {
    const model = client.models;
    
    // Construct a simple chat history string for context (stateless for simplicity here, or use actual chat history object if persistent)
    // For this simple implementation, we'll just send the last few messages or just the prompt with system instruction.
    // To do it properly with history:
    
    // Note: The new SDK stateless chat or generateContent is preferred for single turns, 
    // but here we want a conversational feel. We will use generateContent with the system instruction.
    
    const contents = [
      ...history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: newMessage }] }
    ];

    const response = await model.generateContent({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      contents: contents as any // Casting to avoid strict type checks on the lightweight history object construction
    });

    return response.text || "I'm not sure what to say about that. Try asking about our Chana!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! I'm having trouble thinking of a recipe right now. Please try again later.";
  }
};
