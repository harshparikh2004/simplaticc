// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB27rEOcgCtHDqX0VFpS6ZQCI5bL8PGu5w",
    authDomain: "simplatic-1.firebaseapp.com",
    projectId: "simplatic-1",
    storageBucket: "simplatic-1.firebasestorage.app",
    messagingSenderId: "620832393436",
    appId: "1:620832393436:web:87896f1ca635633c534c19",
    measurementId: "G-D1C6CDJJPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Export the services you need
export { db, auth };
export const googleProvider = new GoogleAuthProvider();