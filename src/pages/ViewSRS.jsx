import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Toaster, toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        <div className="max-w-5xl mt-20 mx-auto p-6">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4">SRS Document</h2>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none bg-white/50 p-6 rounded-md border backdrop-blur-md max-h-[80vh] overflow-y-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {srs || 'No SRS content available'}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}

export default ViewSRS;
