import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Toaster, toast } from 'react-hot-toast';

function ViewSRS() {
    const { projectId } = useParams();
    const [srs, setSrs] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSRS = async () => {
            if (!projectId) {
                toast.error('Invalid Project ID');
                setLoading(false);
                return;
            }
            
            console.log('Fetching project with ID:', projectId);

            try {
                const docRef = doc(db, 'projects', projectId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setSrs(data?.srsContent || '');
                } else {
                    toast.error('Project not found');
                }
            } catch (err) {
                console.error('Error loading SRS:', err);
                toast.error('Error loading SRS');
            } finally {
                setLoading(false);
            }
        };

        fetchSRS();
    }, [projectId]);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4">SRS Document</h2>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div className="bg-white p-4 border rounded-md whitespace-pre-wrap font-mono text-sm max-h-[80vh] overflow-y-auto">
                    {srs || 'No SRS content available'}
                </div>
            )}
        </div>
    );
}

export default ViewSRS;