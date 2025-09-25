/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const { google } = require("googleapis");
const admin = require("firebase-admin");
const serviceAccount = require("./credentials/service-account.json");

admin.initializeApp();

const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: [
        "https://www.googleapis.com/auth/documents",
        "https://www.googleapis.com/auth/drive"
    ],
});

exports.createGoogleDoc = functions.https.onCall(async (data, context) => {
    const { srsContent, title } = data;

    try {
        const authClient = await auth.getClient();
        const docs = google.docs({ version: "v1", auth: authClient });
        const doc = await docs.documents.create({
            requestBody: {
                title: title || "Simplatic SRS Document",
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
        throw new functions.https.HttpsError("internal", "Failed to create Google Doc");
    }
});