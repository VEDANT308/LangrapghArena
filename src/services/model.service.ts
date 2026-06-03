import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere"

import getconfig from "../config/config.js";

export const GeminiModel = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: getconfig.GOOGLE_API_KEY,
});

export const MistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: getconfig.MISTRAL_API_KEY,
});

export const CohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: getconfig.COHERE_API_KEY,
});