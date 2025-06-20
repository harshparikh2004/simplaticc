import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase"; // your firebase app config

export const createGoogleDoc = async (srsContent, title) => {
    const functions = getFunctions(app);
    const generateDoc = httpsCallable(functions, "createGoogleDoc");

    const result = await generateDoc({ srsContent, title });
    return result.data.docUrl;
};