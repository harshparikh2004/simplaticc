import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const createUserDocument = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            fullName: user.displayName || "No Name",
            email: user.email,
            createdAt: serverTimestamp(),
            authProvider: user.providerData[0]?.providerId || "email"
        });
    }
};