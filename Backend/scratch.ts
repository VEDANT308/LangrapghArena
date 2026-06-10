import { ChatCohere } from "@langchain/cohere";
import dotenv from "dotenv";
dotenv.config();

const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: process.env.COHERE_API_KEY,
});

import { HumanMessage } from "@langchain/core/messages";

async function run() {
  try {
    const res = await cohereModel.invoke([new HumanMessage("Rate the color blue from 1 to 10 and explain why.")]);
    console.log("Success:", res.content);
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error:", e.message);
    } else {
      console.error("Error:", e);
    }
  }
}
run();
