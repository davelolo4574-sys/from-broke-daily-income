import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateProductDescription = async (productTitle: string, features: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a high-converting, empathetic, and motivational product description in Taglish for a digital product titled "${productTitle}". 
      Key features: ${features.join(', ')}. 
      Target audience: Hardworking Filipinos seeking financial freedom, struggling with "petsa de peligro". 
      Tone: Authoritative yet empathetic, like Dave Miñoza from "From Broke Into Daily Income". 
      Keep it under 200 words.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const generateBlogOutline = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a detailed blog post outline in Taglish for the topic: "${topic}". 
      The blog is for "From Broke To Daily Income", targeting Filipinos looking for financial advice and side hustles. 
      Base the advice on the 8-step system from Dave Miñoza's eBook.
      Include a catchy title, introduction points, 3-5 main sections with sub-points, and a conclusion with a call to action.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const generateSEOKeywords = async (title: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a comma-separated list of 10 highly relevant SEO keywords in Taglish and English for a page with the following:
      Title: ${title}
      Description: ${description}
      Targeting the Philippine market and people interested in "From Broke Into Daily Income".`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
