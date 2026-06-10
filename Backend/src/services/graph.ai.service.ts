// Handles battle execution and result generation

import {
  StateGraph,
  StateSchema,
  START,
  END,
  type GraphNode,
} from "@langchain/langgraph";

import { z } from "zod";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import {
  geminiModel,
  mistralAIModel,
  cohereModel,
} from "./model.service.js";
import { withTimeout, withRetry } from "./utils.js";

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
  }),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
  console.log(`\n[Graph] Battle started for problem: "${state.problem.substring(0, 50)}..."`);
  
  console.log("[Graph] Invoking Gemini and Mistral...");
  const [geminiResult, mistralResult] = await Promise.allSettled([
    withRetry(() => withTimeout(geminiModel.invoke(state.problem), 30000, "Gemini"), 3, 1000, "Gemini"),
    withRetry(() => withTimeout(mistralAIModel.invoke(state.problem), 30000, "Mistral"), 3, 1000, "Mistral"),
  ]);

  let solution_1 = "";
  let solution_2 = "";

  if (geminiResult.status === "fulfilled") {
    console.log("[Graph] Gemini response received.");
    solution_1 = String(geminiResult.value.content);
  } else {
    console.error("[Graph] Gemini failed:", geminiResult.reason);
    solution_1 = `Error: Gemini failed to respond. Reason: ${geminiResult.reason}`;
  }

  if (mistralResult.status === "fulfilled") {
    console.log("[Graph] Mistral response received.");
    solution_2 = String(mistralResult.value.content);
  } else {
    console.error("[Graph] Mistral failed:", mistralResult.reason);
    solution_2 = `Error: Mistral failed to respond. Reason: ${mistralResult.reason}`;
  }

  return {
    solution_1,
    solution_2,
  };
};

const judgeSchema = z.object({
  solution_1_score: z.number(),
  solution_2_score: z.number(),
  solution_1_reasoning: z.string(),
  solution_2_reasoning: z.string(),
});

const judgeNode: GraphNode<typeof state> = async (state) => {
  console.log("[Graph] Invoking Judge (Cohere)...");
  
  if (state.solution_1.startsWith("Error:") && state.solution_2.startsWith("Error:")) {
    console.warn("[Graph] Both models failed. Skipping Judge.");
    return {
      judge: {
        solution_1_score: 0,
        solution_2_score: 0,
        solution_1_reasoning: "Failed to evaluate: Gemini returned an error.",
        solution_2_reasoning: "Failed to evaluate: Mistral returned an error.",
      }
    };
  }

  const prompt = [
    new SystemMessage(`
You are an AI Judge.

Evaluate both answers.

Return EXACTLY a JSON object matching this schema:
{
  "solution_1_score": number (0-10),
  "solution_2_score": number (0-10),
  "solution_1_reasoning": string,
  "solution_2_reasoning": string
}
    `),
    new HumanMessage(`
Problem:
${state.problem}

Solution 1 (Gemini):
${state.solution_1}

Solution 2 (Mistral):
${state.solution_2}
    `),
  ];

  try {
    const response = await withRetry(() => withTimeout(cohereModel.invoke(prompt), 30000, "Judge"), 3, 1000, "Judge");
    console.log("[Graph] Judge response received.");
    
    let content = String(response.content).trim();
    // Strip markdown formatting if Cohere included it
    if (content.startsWith("\`\`\`json")) {
        content = content.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
    } else if (content.startsWith("\`\`\`")) {
        content = content.replace(/^\`\`\`\n/, "").replace(/\n\`\`\`$/, "");
    }

    const parsed = JSON.parse(content);
    return { judge: parsed };
  } catch (error: any) {
    console.error("[Graph] Judge parsing or invocation failed:", error);
    return {
      judge: {
        solution_1_score: 0,
        solution_2_score: 0,
        solution_1_reasoning: "Error evaluating response.",
        solution_2_reasoning: "Error evaluating response.",
      }
    };
  }
};

const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile();

export default async function useGraph(problem: string) {
  return await graph.invoke({
    problem,
  });
}