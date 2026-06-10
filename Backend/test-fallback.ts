import useGraph from "./src/services/graph.ai.service.js";
import { mistralAIModel } from "./src/services/model.service.js";

// Override API key with an invalid one
mistralAIModel.apiKey = "invalid_key";

async function runTest() {
  console.log("Testing fallback API...");
  try {
    const result = await useGraph("What is the capital of France?");
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (err: any) {
    console.error("Fetch failed:", err.message);
  }
}
runTest();
