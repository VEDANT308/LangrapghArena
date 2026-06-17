import { ChatCohere } from "@langchain/cohere";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
dotenv.config();
const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY || "",
});
async function run() {
    try {
        const response = await cohereModel.invoke([
            new SystemMessage(`You are an AI Judge. Return EXACTLY a JSON object matching this schema: { "score": number, "reasoning": string }`),
            new HumanMessage(`Evaluate the color blue.`)
        ]);
        console.log("Response:", response.content);
    }
    catch (err) {
        console.error("Error:", err);
    }
}
run();
//# sourceMappingURL=test-cohere.js.map