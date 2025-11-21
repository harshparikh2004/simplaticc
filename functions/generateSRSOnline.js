import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchGitHubContext } from "./githubContext.js";

const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_KEY });

export const generateSRSOnline = async (req, res) => {
    const { repoOwner, repoName, authToken, projectTitle, projectDescription, techStack, diagramTypes } = req.body;

    try {
        // Step 1: Fetch lightweight metadata from GitHub
        const repoData = await fetchGitHubContext(repoOwner, repoName, authToken);

        // Step 2: Define the enhanced formal SRS prompt
        const prompt = `
You are a senior software architect and IEEE documentation expert. Generate a comprehensive, detailed, and production-grade Software Requirements Specification (SRS) document in full compliance with the IEEE 830-1998 standard.

This SRS is to be written in a formal, technical, and professional tone and must be suitable for academic, enterprise, or government submission. The content should be highly structured, detailed, and elaborate — long enough to span at least 16–18 pages when properly formatted in Word or PDF (11–12 pt font, 1.5 spacing).

Project Title: ${projectTitle}
Project Description: ${projectDescription}
Technology Stack: ${techStack}
Required Diagrams: ${diagramTypes.join(', ')}

Repository Context Summary (for AI reference only):
${JSON.stringify(repoData, null, 2)}

Important Formatting Instruction:
- Output must be in **pure Markdown format**, but **NOT enclosed in any code block fences (no triple backticks)**.
- Use proper #, ##, and ### headings so that Google Docs or Word automatically detect heading styles.
- Only use code blocks (like \`\`\`mermaid\`\`\`) for diagrams, not for the entire document.

Your responsibilities include:

Follow the full IEEE 830-1998 standard structure and elaborate extensively in each section:

Section 1. Introduction

1.1 Purpose — Explain the full scope and objective of the document
1.2 Document Conventions — Describe all formatting, naming, references, and units conventions
1.3 Intended Audience and Reading Suggestions — List primary and secondary stakeholders and their reading path
1.4 Project Scope — Define system boundaries, features, goals, benefits, out-of-scope features
1.5 References — Include standards, APIs, frameworks, academic papers, and system dependencies

Section 2. Overall Description

2.1 Product Perspective — Describe the system architecture, dependencies, modular design, external APIs
2.2 Product Functions — List and elaborate on all major functional modules (minimum 10), each explained with sub-points
2.3 User Classes and Characteristics — Detail 4–5 different user roles with characteristics and privileges
2.4 Operating Environment — Elaborate on browsers, OS, server/cloud stack, and DBMS
2.5 Design and Implementation Constraints — Discuss languages, libraries, frameworks, latency constraints, and regulations
2.6 User Documentation — List inline help, user guides, onboarding manuals, and video documentation
2.7 Assumptions and Dependencies — At least 6 well-thought-out assumptions and external dependencies

Section 3. System Features (Very Detailed)

Minimum 10 system features or modules. For each feature, provide:

- Name and ID
- Description
- Functional Requirements (Use FR-IDs like FR-1.1, FR-2.4)
- Preconditions
- Postconditions
- Exceptions and error handling
- Optional: Table format or flow diagram per feature

Section 4. External Interface Requirements

4.1 User Interfaces — Describe all UI components, pages, screens, responsive behaviors
4.2 Hardware Interfaces — List devices, sensors, or integrations (if applicable)
4.3 Software Interfaces — List all APIs, SDKs, and internal microservices (minimum 4)
4.4 Communication Interfaces — List protocols, ports, services, REST endpoints, JSON schemas, rate limits

Section 5. Non-Functional Requirements

- Performance, Security, Usability, Availability, Maintainability, Portability, Accessibility
- Minimum 5–6 detailed requirements under each category, written clearly

Section 6. Additional Requirements

- Legal, Regulatory, Privacy, Accessibility (WCAG), Internationalization, Licensing
- Example: GDPR, CCPA, FERPA, ISO27001, MIT License, multilingual support, mobile-first

Section 7. Appendices

- Appendix A: Glossary (Minimum 20 terms)
- Appendix B: Acronyms
- Appendix C: Future Work / Enhancements
- Appendix D: Change History Table

Diagrams (Embedded via Mermaid or PlantUML code blocks)
Include at least one high-quality, accurate diagram of each type where applicable:

- Use Case Diagram
- Entity Relationship Diagram (ERD)
- Data Flow Diagram (DFD) (Context, Level 1)
- Class Diagram
- Activity Diagram
- Sequence Diagram (optional)

Include code blocks using mermaid or plantuml with appropriate indentation

Markdown Formatting

- Use semantic headings with #, ##, and ### 
- Use bold, italics, bullet points, numbered lists, and tables as needed
- Use code blocks for all diagrams and example structures
- Ensure content renders well in Markdown viewers and HTML

Writing Instructions

- Write in a formal, academic, and technical tone
- Do not include commentary, instructional text, or meta information
- Include only the final SRS document content
- Ensure consistency, clarity, completeness, and modularity

Begin generating the SRS document now based on the provided project details.
`;

        // Step 3: Generate the document via Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);

        // Step 4: Respond with raw SRS text
        res.json({ srs: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
