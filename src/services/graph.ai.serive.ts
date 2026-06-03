import {
    StateSchema,
    MessagesValue,
    type GraphNode,
    StateGraph,
    START,
    END,
    ReducedValue,
} from "@langchain/langgraph";
import { MistralModel, CohereModel } from "./model.service.js";
import { HumanMessage } from "@langchain/core/messages";

import { z } from "zod"

// Define State
const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""),
        {
            reducer: (current, next) => {
                return next
            }
        }),
    solution_2: new ReducedValue(z.string().default(""),
        {
            reducer: (current, next) => {
                return next
            }
        }),
    judge_recommendation: new ReducedValue(z.object().default(
        {
            solution_1_score: 0,
            solution_2_score: 0
        }
    ),
        {
            reducer: (current, next) => {
                return next
            }
        })
});

// Define Node
const solutionNode: GraphNode<typeof State> = async (state) => {

    const [Mistral_sloution, Cohere_solution] = await Promise.all([
        MistralModel.invoke(state.messages[0]),
        CohereModel.invoke(state.messages[0])
    ]);

    return {
        solution_1: Mistral_sloution.text,
        solution_2: Cohere_solution.text
    };
};

// Build Graph
const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addEdge(START, "solution")
    .addEdge("solution", END)
    .compile();

export default async function (usermessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(usermessage)
        ]
    });

    console.log(result)

    return result;
}