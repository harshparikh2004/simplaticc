import { genAI } from './geminiClient';

export const generateSRS = async (projectData) => {
    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

    const {
        projectTitle = 'Untitled Project',
        projectDescription = 'No description provided.',
        techStack = 'Not specified',
        diagramTypes = [],
    } = projectData;

    // Format the prompt
    const prompt = `You are a professional software engineer. Generate a detailed IEEE-compliant Software Requirements Specification (SRS) document. Project Title: ${projectTitle} Description: ${projectDescription} Tech Stack: ${techStack} Required Diagrams: ${diagramTypes.join(', ')} Your task is to: Follow standard IEEE SRS sections (Introduction, Functional Requirements, Non-functional Requirements, System Features, etc.) Include relevant diagrams like Use Case, ER, or DFD using Mermaid or PlantUML where applicable Use Markdown formatting Do NOT include any commentary outside the SRS document.`.trim();

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (err) {
        console.error('Gemini API Error:', err);
        throw new Error('Failed to generate SRS document.');
    }
};