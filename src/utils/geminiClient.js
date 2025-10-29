import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const genAI = new GoogleGenerativeAI(API_KEY);

export const generateSRS = async (projectData) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const prompt = `You are an expert software engineer. Generate a complete IEEE SRS (Software Requirements Specification) document based on the following details: Project Title: ${projectData.projectTitle} Description: ${projectData.projectDescription} Tech Stack: ${projectData.techStack} Diagram Types: ${projectData.diagramTypes.join(', ')} Include standard IEEE SRS sections and generate diagram code using Mermaid or PlantUML where applicable. Format output in Markdown.`.trim();

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (err) {
        console.error("Gemini API error:", err);
        throw err;
    }
};

export default genAI;
