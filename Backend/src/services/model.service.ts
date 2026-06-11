// AI model configuration

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js";

export const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: config.GOOGLE_API_KEY,
});


export const mistralAIModel = new ChatMistralAI({
  model: "mistral-meduium-latest",
  apiKey: config.MISTRAL_API_KEY,
});


export const cohereModel = new ChatCohere({
  model: "command-a-plus-05-2026",
  apiKey: config.COHERE_API_KEY,
});