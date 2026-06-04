import express from "express";
import useGraph from "./services/graph.ai.service.js";

const app = express();

app.get("/health", (_, res) => {
    res.json({
        status: "ok",
    });
});

app.get("/", async (_, res) => {
    try {
        const result = await useGraph(
            "tell me the best round trip of the world ?"
        );

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Something went wrong",
        });
    }
});

export default app;