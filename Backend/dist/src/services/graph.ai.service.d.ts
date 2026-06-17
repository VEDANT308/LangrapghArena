import { z } from "zod";
export default function useGraph(problem: string): Promise<import("@langchain/langgraph").StateType<import("@langchain/langgraph").StateSchemaFieldsToStateDefinition<{
    problem: z.ZodDefault<z.ZodString>;
    solution_1: z.ZodDefault<z.ZodString>;
    solution_2: z.ZodDefault<z.ZodString>;
    judge: z.ZodObject<{
        solution_1_score: z.ZodDefault<z.ZodNumber>;
        solution_2_score: z.ZodDefault<z.ZodNumber>;
        solution_1_reasoning: z.ZodDefault<z.ZodString>;
        solution_2_reasoning: z.ZodDefault<z.ZodString>;
    }, z.core.$strip>;
}>>>;
//# sourceMappingURL=graph.ai.service.d.ts.map