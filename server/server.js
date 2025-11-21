require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai"); // ✅ move to top for clarity
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { streamOllama } = require("./ollamaApi");// ✅ ensures GEMINI_KEY is loaded from .env if present


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "50mb" }));

// Utility: Retry and timeout wrapper
const withTimeout = (promise, ms, name) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${name} timed out after ${ms}ms`)), ms)
    ),
  ]);

async function callOllama(prompt, attempt = 1) {
  try {
    const response = await withTimeout(
      axios.post("http://localhost:11434/api/generate", {
        model: "gemma2:27b",
        prompt,
      }),
      90000,
      "Ollama call"
    );
    return response.data.response;
  } catch (err) {
    if (attempt < 3) {
      console.warn(`Retrying Ollama (attempt ${attempt + 1})...`);
      return callOllama(prompt, attempt + 1);
    }
    throw err;
  }
}

// ✅ Existing Ollama-based SRS generation
app.post("/analyze", async (req, res) => {
  try {
    const { repoName, owner, defaultBranch, languages, readme, fileList } = req.body;
    if (!fileList?.length) return res.status(400).send("No file list provided.");

    const structureText = fileList
      .map(
        (f) =>
          `📄 ${f.name}${f.folder ? " (in " + f.folder + ")" : ""} — type: ${f.extension}`
      )
      .join("\n");

    const prompt = `You are an expert senior software analyst, technical writer, and documentation engineer with deep experience producing formal SRS documents for academic and enterprise delivery. Using ONLY the repository metadata and structure provided below, generate a complete, professional, and **IEEE 830-1998 compliant Software Requirements Specification (SRS)** document that is ready to paste into Microsoft Word or Google Docs.

IMPORTANT INSTRUCTIONS (must be followed exactly):
- Do NOT include any Mermaid, Graphviz, ASCII-art diagrams, or code blocks. Use **textual descriptions** for architecture/diagrams and include clear captions and placeholders where a diagram or figure could be inserted later (e.g., "[Insert component diagram here — describe layout]").  
- Output **only the SRS document in Markdown**. Do not add any meta commentary, explanations about how you inferred things, or any assistant preamble. The returned Markdown is the final SRS.
- For every inferred item (module, function, user type, requirement), include **Evidence** listing the repository filename(s) or README excerpt that led to the inference, and a **Confidence** level: High / Medium / Low.
- Number functional requirements uniquely (FR-001, FR-002, ...). For each FR include: Description, Rationale, Priority (High/Medium/Low), Acceptance Criteria (testable), Source files, and Confidence.
- Provide a **Requirements Traceability Matrix** table mapping each Functional Requirement to source file(s) and to test cases (IDs).
- Keep headings and subheadings strictly structured and use IEEE numbering where appropriate.
- Use formal, professional tone. Keep language unambiguous, concise, and suited for a document that will be reviewed and uploaded to Google Docs.
- If essential assumptions are made due to missing info, list them explicitly in the Assumptions section and mark confidence.

Repository metadata (use these directly to infer the system):

Repository Name: ${repoName}
Owner: ${owner}
Main Branch: ${defaultBranch}
Languages Detected: ${Object.keys(languages || {}).join(", ") || "Unknown"}

README (if available):
${readme || "N/A"}

File & Folder Structure:
${structureText}

Now generate the SRS following the IEEE 830 structure below. Use Markdown headings and ordered numbering.

1. Title Page
   - Project Title (derive from repository name)
   - Document Title: Software Requirements Specification (SRS)
   - Version: 1.0
   - Author: (Inferred: "Automated SRS — generated from repository structure")
   - Date: (use today's date)
   - Status: Draft

2. Table of Contents
   - Auto-generate the ToC (list of top-level headings with numbers)

3. 1. Introduction
   1.1 Purpose — short, precise statement of the document purpose
   1.2 Scope — define system boundaries, major capabilities and intended users
   1.3 Definitions, Acronyms, and Abbreviations — list items inferred from filenames or README
   1.4 References — list README, package files (package.json, requirements.txt) if present, and any files used as evidence
   1.5 Overview — short description of remainder of document

4. 2. Overall Description
   2.1 Product Perspective — is it a library, web app, microservice, mobile app? Explain relationship to other systems (inferred)
   2.2 Product Functions — high-level bullet list of major functions (each item with Evidence + Confidence)
   2.3 User Classes and Characteristics — list expected user types (e.g., admin, end-user, developer) and key characteristics (Evidence + Confidence)
   2.4 Operating Environment — inferred runtime and deployment environment (languages, frameworks, DB). List Evidence + Confidence.
   2.5 Design & Implementation Constraints — inferred constraints (browser support, authentication, third-party services)
   2.6 Assumptions and Dependencies — explicit list with confidence

5. 3. Specific Requirements
   3.1 Functional Requirements (FR-001, FR-002, ...)
       - For each FR include:
         * ID (e.g., FR-001)
         * Title (one-line)
         * Description (clear, testable)
         * Rationale (why inferred; link to feature or filename)
         * Priority: High / Medium / Low
         * Acceptance Criteria (clear pass/fail conditions; testable)
         * Source/Evidence: list specific filenames or README lines (exact filenames)
         * Confidence: High / Medium / Low
   3.2 External Interface Requirements
       - User interfaces: describe major screens or pages (title, purpose), list Evidence + Confidence
       - Hardware interfaces: if applicable
       - Software interfaces: external APIs, auth providers, DB (list Evidence + Confidence)
       - Communications interfaces: protocols used (HTTP, WebSocket etc.)
   3.3 Performance Requirements
       - Latency, throughput, expected load or constraints you can infer; each with Evidence + Confidence
   3.4 Logical Database Requirements
       - High-level data entities, key fields, and relationships (use tabular form). For each entity include Evidence + Confidence.
   3.5 Design Constraints
       - Any constraints such as frameworks, library versions, hosting or security rules inferred

6. 4. System Architecture and Major Components
   - Textual description of main components/modules and relationships
   - For each component: responsibilities, interfaces, key data flows, and Evidence + Confidence
   - Provide a placeholder note for visual diagrams (e.g., "[Insert component diagram here — recommend: Component A -> Component B]")

7. 5. Non-functional Requirements
   - Security (authentication, authorization, data protection): list inferred requirements with Evidence + Confidence
   - Reliability & Availability targets
   - Maintainability & Testability expectations
   - Portability & Compatibility
   - Usability & Accessibility (if inferable)
   - Each item should be specific and testable where possible

8. 6. System Features (If distinct from FRs, provide feature descriptions mapped to FRs)
   - For each feature: brief description, related FR IDs, priority, Evidence + Confidence

9. 7. Acceptance Criteria and Test Cases (Summary)
   - Provide a table with Test Case ID (TC-001 ...), Title, Linked FR IDs, Description, and Pass Criteria

10. 8. Requirements Traceability Matrix
    - Provide a table mapping FR ID → Feature → Source File(s) → Test Case IDs

11. 9. Appendix
    - A. Inferred file-to-feature mappings (list file names and the component/requirement they indicate)
    - B. Glossary (from section 1.3)
    - C. Notes on Confidence and Inference Methodology (brief sentence)

Final formatting requirements:
- Use Markdown headings (e.g., '#', '##', '###') and numbered lists for IEEE numbering.
- Use tables for traceability, entities, and test-case summaries. Keep table columns concise and readable.
- Keep paragraphs short (1–3 sentences) with clear bullet lists where helpful.
- Where the repository provides no evidence for a necessary requirement, explicitly mark it as an assumption with **Confidence: Low** and include the assumption text.
- Keep the total output thorough (comprehensive SRS), but avoid redundant speculation — prefer "Assumption" + "Confidence: Low" over inventing unsupported functionality.

Start the document now and output only the final SRS in Markdown.
`;

    console.log("📂 Repo structure received:", fileList.length, "files");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    await streamOllama(prompt, res);
  } catch (err) {
    console.error("Error during analysis:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🧠 Online Gemini SRS generation endpoint
app.post("/generateSRSOnline", async (req, res) => {
  try {
    const {
      repoOwner,
      repoName,
      authToken,
      projectTitle,
      projectDescription,
      techStack,
      diagramTypes,
    } = req.body;

    console.log(`⚡ Gemini request received for repo: ${repoOwner}/${repoName}`);

    const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_KEY });
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a senior software architect and IEEE documentation expert. Generate a comprehensive, detailed, and production-grade Software Requirements Specification (SRS) document in full compliance with the IEEE 830-1998 standard.

This SRS is to be written in a formal, technical, and professional tone and must be suitable for academic, enterprise, or government submission. The content should be highly structured, detailed, and elaborate — long enough to span at least 16–18 pages when properly formatted in Word or PDF (11–12 pt font, 1.5 spacing).

Project Title: ${projectTitle}
Project Description: ${projectDescription}
Technology Stack: ${techStack}
Required Diagrams: ${diagramTypes.join(", ")}

Important Formatting Instruction:
- Output must be in **pure Markdown format**, but **NOT enclosed in any code block fences (no triple backticks)**.
- Use proper #, ##, and ### headings so that Google Docs or Word automatically detect heading styles.
- Only use code blocks (like \`\`\`mermaid\`\`\`) for diagrams, not for the entire document.

Follow the full IEEE 830-1998 standard structure with all required sections (Introduction, Overall Description, System Features, External Interface Requirements, Non-Functional Requirements, Additional Requirements, Appendices).
Include detailed system features, 5–6 non-functional requirement categories, and at least one Mermaid diagram per diagram type.

Begin generating the final SRS document now.
`;

    const result = await model.generateContent(prompt);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ srs: result.response.text() });
  } catch (err) {
    console.error("❌ Error generating SRS (Gemini):", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Optimized server running on port 5000"));
