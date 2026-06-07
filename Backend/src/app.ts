import express from "express";
import useGraph from "./services/graph.ai.service.js";
import { success } from "zod";

const app = express();

// Parse JSON bodies
app.use(express.json());

// CORS middleware for frontend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});

app.get("/health", (_, res) => {
    res.json({
        status: "ok",
    });
});

// Original GET endpoint (kept for backwards compatibility)
app.get("/", async (_, res) => {
    try {
        const result = await useGraph(
            "What is the capital of France and Japan?"
        );

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Something went wrong",
        });
    }
});

// POST endpoint for frontend
app.post("/invoke", async (req, res) => {
    try {
        const { problem } = req.body;

        if (!problem || typeof problem !== "string") {
            return res.status(400).json({
                success: false,
                error: "A 'problem' string is required in the request body.",
            });
        }

        const result = await useGraph(problem);

        return res.status(200).json({
            success: true,
            message: "Graph executed successfully.",
            data: result,
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            error: "Something went wrong.",
        });
    }
});

export default app;