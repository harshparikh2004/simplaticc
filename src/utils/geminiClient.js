import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}

main();