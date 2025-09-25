// No Firebase imports needed for this function

export const createGoogleDoc = async (accessToken, title = "Simplatic SRS Document", content = "Welcome to your SRS!") => {
    try {
        // 1. Create the document
        const createResponse = await fetch("https://docs.googleapis.com/v1/documents", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });

        const createData = await createResponse.json();

        if (!createData.documentId) {
            throw new Error("Failed to create document");
        }

        const documentId = createData.documentId;

        // 2. Insert content into the document
        await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
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
                            text: content,
                        },
                    },
                ],
            }),
        });

        // 3. Return the document link
        return `https://docs.google.com/document/d/${documentId}/edit`;
    } catch (err) {
        console.error("Error creating Google Doc:", err);
        throw err;
    }
};