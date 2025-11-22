export async function createGoogleDoc(accessToken, title, content) {
    try {
        // Step 1: Create empty doc
        const createResponse = await fetch(
            "https://docs.googleapis.com/v1/documents",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            }
        );

        const createData = await createResponse.json();
        if (!createResponse.ok) {
            console.error("Create failed:", createData);
            throw new Error("Failed to create document");
        }

        const documentId = createData.documentId;

        // Step 2: Insert SRS content
        await fetch(
            `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requests: [
                        {
                            insertText: {
                                location: { index: 1 },
                                text: content
                            }
                        }
                    ]
                }),
            }
        );

        return `https://docs.google.com/document/d/${documentId}/edit`;
    } catch (err) {
        console.error("createGoogleDoc error:", err);
        return null;
    }
}
