const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { chunkText } = require("./chunker");
const { streamOllama } = require("./ollamaApi");
const { prepareRepoData } = require("./fileUtils");

const app = express();

// ✅ Enable CORS for your Vite dev server
app.use(
  cors({
    origin: "http://localhost:5173", // your React app's dev origin
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "50mb" }));

// Helper to call Ollama synchronously (for map-reduce)
async function callOllama(prompt) {
  const response = await axios.post("http://localhost:11434/api/generate", {
    model: "codellama:7b-instruct",
    prompt,
  });
  return response.data.response;
}

// Main route: handles repo data analysis
app.post("/analyze", async (req, res) => {
  try {
    const { files } = req.body;
    if (!files?.length) return res.status(400).send("No files provided.");

    // 1️⃣ Filter & prepare text data
    const repoText = prepareRepoData(files);

    // 2️⃣ Chunk data safely
    const chunks = chunkText(repoText);

    // 3️⃣ Map phase: summarize each chunk
    const summaries = [];
    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing chunk ${i + 1}/${chunks.length}`);
      const partial = await callOllama(
        `Summarize and analyze this repository section:\n${chunks[i]}`
      );
      summaries.push(partial);
    }

    // 4️⃣ Reduce phase: stream final combined summary
    const mergedPrompt = `Combine and refine these partial analyses into one complete technical documentation:\n${summaries.join(
      "\n\n"
    )}`;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    await streamOllama(mergedPrompt, res);
  } catch (err) {
    console.error("Error during analysis:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
