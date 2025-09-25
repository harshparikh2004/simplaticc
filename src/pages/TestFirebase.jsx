import React, { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function TestFirebase() {
    useEffect(() => {
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, "test"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        }

        fetchData();
    }, []);

    return <div>Check the console for Firestore output</div>;
}

export default TestFirebase;
