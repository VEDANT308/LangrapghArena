import express from "express";
import cors from "cors";
import useGraph from "./services/graph.ai.service.js";

const app = express();

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    })
);

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "ok",
    });
});

// Test Route
app.get("/", async (req, res) => {
    try {
        const result = await useGraph(
            "What is the capital of France and Japan?"
        );

        return res.status(200).json({
            success: true,
            result,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            error: "Something went wrong.",
        });
    }
});

// Main API Route
app.post("/invoke", async (req, res) => {
    try {
        const { input } = req.body;

        if (!input || typeof input !== "string") {
            return res.status(400).json({
                success: false,
                error: "An 'input' string is required.",
            });
        }

        const result = await useGraph(input);

        return res.status(200).json({
            success: true,
            message: "Graph executed successfully.",
            result,
        });
    } catch (err: any) {
        console.error("[API Error] /invoke failed:", err);

        return res.status(500).json({
            success: false,
            error: err.message || "An unexpected error occurred during execution.",
        });
    }
});

export default app;