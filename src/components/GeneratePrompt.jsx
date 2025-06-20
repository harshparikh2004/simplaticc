// src/pages/GeneratePrompt.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { generateSRS } from '../utils/generateSRS';
import { Toaster, toast } from 'react-hot-toast';
import { createGoogleDoc } from '../utils/createGoogleDoc';

function GeneratePrompt() {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [srsText, setSrsText] = useState('');
    const [loading, setLoading] = useState(false);

    // STEP 1: Fetch project from Firestore
    useEffect(() => {
        const fetchProject = async () => {
            if (!projectId) {
                toast.error('Invalid project ID');
                return;
            }
            try {
                const docRef = doc(db, 'projects', projectId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProjectData(docSnap.data());
                } else {
                    toast.error('Project not found');
                }
            } catch (err) {
                console.error('Error fetching project:', err);
                toast.error('Failed to load project');
            }
        };

        fetchProject();
    }, [projectId]);

    // STEP 2: Generate SRS and save to Firestore
    const handleGenerate = async () => {
        if (!projectData || !projectId) {
            toast.error('Missing project data');
            return;
        }
        setLoading(true);

        try {
            const srs = await generateSRS(projectData);
            setSrsText(srs);

            await updateDoc(doc(db, 'projects', projectId), {
                srsContent: srs,
                status: 'completed',
                lastUpdated: serverTimestamp(),
            });

            toast.success('SRS generated and saved to Firestore');
        } catch (error) {
            console.error('Error generating SRS:', error);
            toast.error('Failed to generate SRS');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Syne' }}>
                Generate SRS
            </h1>
            {!srsText && (
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-60"
                >
                    {loading ? 'Generating...' : 'Generate SRS'}
                </button>
            )}

            {srsText && (
                <div className="mt-6 p-4 bg-white border rounded-lg whitespace-pre-wrap font-mono text-sm max-h-[70vh] overflow-y-auto">
                    {srsText}
                </div>
            )}
            <Link to={`/srs/${projectId}`} className="text-blue-600 underline mt-4 block"> View Full SRS </Link>
            <button
                onClick={async () => {
                    try {
                        const docUrl = await createGoogleDoc(srsText, projectData?.projectTitle);
                        window.open(docUrl, "_blank");
                    } catch (err) {
                        toast.error("Failed to create Google Doc");
                        console.error(err);
                    }
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Export to Google Docs
            </button>
        </div>
    );
}

export default GeneratePrompt;