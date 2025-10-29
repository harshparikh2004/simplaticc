import axios from "axios";
import es from "event-stream";

export async function streamOllama(prompt, res) {
    try {
        const response = await axios({
            method: "post",
            url: "http://localhost:11434/api/generate",
            data: { model: "mistral:7b-instruct", prompt, stream: true },
            responseType: "stream",
        });

        return new Promise((resolve, reject) => {
            response.data
                .pipe(es.split())
                .pipe(
                    es.mapSync(line => {
                        if (!line.trim()) return;
                        try {
                            const data = JSON.parse(line);
                            if (data.response) res.write(data.response);
                        } catch (err) {
                            console.error("Streaming parse error:", err.message);
                        }
                    })
                );

            response.data.on("end", () => {
                res.end(); // ✅ finalize the HTTP response
                resolve();
            });

            response.data.on("error", (err) => {
                console.error("Stream error:", err.message);
                res.end();
                reject(err);
            });
        });
    } catch (err) {
        console.error("Streaming request failed:", err.message);
        res.status(500).json({ error: err.message });
    }
}
