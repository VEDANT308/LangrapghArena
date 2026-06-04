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
  const [mistralResponse, cohereResponse] = await Promise.all([
    mistralAIModel.invoke(state.problem),
    cohereModel.invoke(state.problem),
  ]);

  return {
    solution_1: String(mistralResponse.content),
    solution_2: String(cohereResponse.content),
  };
};

const judgeSchema = z.object({
  solution_1_score: z.number(),
  solution_2_score: z.number(),
  solution_1_reasoning: z.string(),
  solution_2_reasoning: z.string(),
});

const judgeNode: GraphNode<typeof state> = async (state) => {
  const structuredJudge =
    geminiModel.withStructuredOutput(judgeSchema);

  const response = await structuredJudge.invoke([
    new SystemMessage(`
You are an AI Judge.

Evaluate both answers.

Return:
- solution_1_score (0-10)
- solution_2_score (0-10)
- solution_1_reasoning
- solution_2_reasoning
    `),

    new HumanMessage(`
Problem:
${state.problem}

Solution 1:
${state.solution_1}

Solution 2:
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