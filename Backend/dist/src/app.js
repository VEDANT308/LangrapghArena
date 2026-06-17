import express from "express";
import cors from "cors";
import useGraph from "./services/graph.ai.service.js";
import config from "./config/config.js";

const app = express();

app.use(express.json());

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.toLowerCase().replace(/\/$/, "");

        const isAllowed = config.CORS_ORIGIN.some(
            (allowed) =>
                allowed.toLowerCase().replace(/\/$/, "") === normalizedOrigin
        );

        if (isAllowed || config.CORS_ORIGIN.includes("*")) {
            callback(null, true);
        } else {
            console.error(`[CORS BLOCKED] Origin rejected: "${origin}"`);
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },

    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
// IMPORTANT: DO NOT use app.options("*")

app.get("/health", (req, res) => {
    res.status(200).json({ success: true, status: "ok" });
});

app.get("/", async (req, res) => {
    try {
        const result = await useGraph(
            "What is the capital of France and Japan?"
        );

        res.status(200).json({ success: true, result });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Something went wrong.",
        });
    }
});

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

        res.status(200).json({
            success: true,
            message: "Graph executed successfully.",
            result,
        });
    } catch (err) {
        console.error("[API Error] /invoke failed:", err);

        res.status(500).json({
            success: false,
            error: err.message || "Unexpected error",
        });
    }
});

export default app;