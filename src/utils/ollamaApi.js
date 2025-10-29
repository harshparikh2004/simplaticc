export async function callOllama(model, prompt) {
    try {
        const res = await fetch("http://localhost:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, code: prompt }),
        });

        if (!res.ok) throw new Error(`Ollama API error: ${res.status}`);
        const data = await res.json();
        return data.output || data.response || "No response from Ollama.";
    } catch (err) {
        console.error("Ollama call failed:", err);
        throw err;
    }
}
