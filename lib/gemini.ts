import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Gemini API Key is missing. Please set EXPO_PUBLIC_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
export const geminiVisionModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
