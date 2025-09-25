const functions = require("firebase-functions");
const { google } = require("googleapis");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials/service-account.json");

admin.initializeApp();

const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/documents", "https://www.googleapis.com/auth/drive"],
});

exports.createGoogleDoc = functions.https.onCall(async (data, context) => {
    const { srsContent, title } = data;

    try {
        const authClient = await auth.getClient();
        const docs = google.docs({ version: "v1", auth: authClient });
        const doc = await docs.documents.create({
            requestBody: {
                title: title || "Simplatic SRS",
            },
        });

        await docs.documents.batchUpdate({
            documentId: doc.data.documentId,
            requestBody: {
                requests: [
                    {
                        insertText: {
                            location: { index: 1 },
                            text: srsContent,
                        },
                    },
                ],
            },
        });

        const docUrl = `https://docs.google.com/document/d/${doc.data.documentId}/edit`;
        return { docUrl };
    } catch (error) {
        console.error("Error creating Google Doc:", error);
        throw new functions.https.HttpsError("internal", "Google Docs API failed.");
    }
});