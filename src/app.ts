import express from "express"
import usegraph from "./services/graph.ai.serive.js"

const app = express()

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.post("/use-graph",async(req,res)=>
{
    
    await usegraph("What is the captial of France?")
})

export default app