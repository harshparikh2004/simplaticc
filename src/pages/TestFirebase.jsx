import React, { useEffect } from "react";
import { db } from "../firebase"; // Adjust the path if your firebase.js file is elsewhere
import { collection, addDoc } from "firebase/firestore";

function TestFirebase() {
    useEffect(() => {
        const testAdd = async () => {
            try {
                await addDoc(collection(db, "test"), { hello: "world" });
                console.log("✅ Test document written to Firestore");
            } catch (err) {
                console.error("❌ Error writing test doc:", err);
            }
        };
        testAdd();
    }, []);

    return (
        <div className="p-4 text-center">
            <h1 className="text-xl font-bold">Testing Firebase...</h1>
            <p>Check the console for results.</p>
        </div>
    );
}

export default TestFirebase;
