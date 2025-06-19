import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function GeneratePrompt() {
    const { projectId } = useParams(); // Make sure your route includes /generate/:projectId
    const [projectData, setProjectData] = useState(null);
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const docRef = doc(db, 'projects', projectId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProjectData(data);
                    generatePrompt(data); // Step 2
                } else {
                    console.log('No such document!');
                }
            } catch (err) {
                console.error('Error fetching document:', err);
            }
        };

        fetchProject();

    }, [projectId]);

    const generatePrompt = (data) => {
        const promptString = `You are an expert in software engineering. Generate a complete IEEE Standard SRS (Software Requirements Specification) document for the following project: Project Title: ${data.projectTitle} Description: ${data.projectDescription} Tech Stack: ${data.techStack} Diagram Types: ${data.diagramTypes.join(', ')} Please include all standard IEEE SRS sections like Introduction, Overall Description, Specific Requirements, External Interface Requirements, and also generate code for diagrams using Mermaid or PlantUML format where applicable. Return the output in markdown format with section-wise separation. `.trim();
        setPrompt(promptString);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Generated AI Prompt</h1>
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md">
                {prompt}
            </pre>
        </div>
    );
}