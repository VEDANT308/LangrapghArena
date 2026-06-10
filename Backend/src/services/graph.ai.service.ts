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
  const [geminiResponse, mistralResponse] = await Promise.all([
    geminiModel.invoke(state.problem),
    mistralAIModel.invoke(state.problem),
  ]);

  return {
    solution_1: String(geminiResponse.content),
    solution_2: String(mistralResponse.content),
  };
};

const judgeSchema = z.object({
  solution_1_score: z.number(),
  solution_2_score: z.number(),
  solution_1_reasoning: z.string(),
  solution_2_reasoning: z.string(),
});

const judgeNode: GraphNode<typeof state> = async (state) => {
  const structuredJudge = cohereModel.withStructuredOutput(judgeSchema);

  const response = await structuredJudge.invoke([
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
  ]);

  return {
    judge: response,
  };
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