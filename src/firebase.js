// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUIMtPDu5jpvaY0gXLcEgc_B67voxQ53M",
    authDomain: "simplatic-8fb74.firebaseapp.com",
    projectId: "simplatic-8fb74",
    storageBucket: "simplatic-8fb74.firebasestorage.app",
    messagingSenderId: "55550131338",
    appId: "1:55550131338:web:1da107bf1398efeb764173",
    measurementId: "G-LYXCWGBJF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);