import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Toaster, toast } from 'react-hot-toast';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import MermaidRenderer from '../components/MermaidRenderer';
import { encodePlantUML } from '../utils/encodePlantUML';
import { createRoot } from 'react-dom/client';
import { createGoogleDoc } from '../utils/createGoogleDoc';

function ViewSRS() {
    const { projectId } = useParams();
    const [srs, setSrs] = useState('');
    const [exporting, setExporting] = useState(false);
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

    const handleExportToDocs = async () => {
        const accessToken = localStorage.getItem('google_access_token');

        if (!accessToken) {
            toast.error("Please log in with Google to use this feature.");
            return;
        }

        if (!srs) {
            toast.error("No SRS content to export.");
            return;
        }

        try {
            setExporting(true);
            const docUrl = await createGoogleDoc(accessToken, "Simplatic SRS Document", srs);
            window.open(docUrl, '_blank');
            toast.success("Document exported successfully!");
        } catch (err) {
            toast.error("Failed to export to Google Docs.");
            console.error(err);
        } finally {
            setExporting(false);
        }
    };

    const components = {
        code({ className = '', children }) {
            const language = className.replace('language-', '').trim().toLowerCase();

            if (language === 'mermaid') {
                return <MermaidRenderer chart={String(children).trim()} />;
            }

            if (language === 'plantuml') {
                const encoded = encodePlantUML(children);
                const src = `https://www.plantuml.com/plantuml/svg/~1${encoded}`;
                return (
                    <div className="my-4">
                        <img src={src} alt="PlantUML Diagram" className="rounded border shadow" />
                    </div>
                );
            }

            return (
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm">
                    <code>{children}</code>
                </pre>
            );
        }
    };

    const handleCopy = async () => {
        if (!srs) return;
        
        try {
            await navigator.clipboard.writeText(srs);
            toast.success('SRS copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error('Failed to copy to clipboard');
        }
    };

    const handleCopyAsHTML = () => {
        if (!srs) return;

        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.whiteSpace = 'pre-wrap';
        document.body.appendChild(tempDiv);

        const root = createRoot(tempDiv);
        root.render(
            <div className="prose prose-sm md:prose-base lg:prose-lg">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                    {srs}
                </ReactMarkdown>
            </div>
        );

        setTimeout(() => {
            const range = document.createRange();
            range.selectNodeContents(tempDiv);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);

            try {
                const successful = document.execCommand('copy');
                toast.success(successful ? 'Copied as HTML!' : 'Copy failed');
            } catch (err) {
                toast.error('Unable to copy as HTML');
                console.error('Copy as HTML failed:', err);
            }

            selection?.removeAllRanges();
            root.unmount();
            document.body.removeChild(tempDiv);
        }, 100);
    };

    return (
        <div className="max-w-5xl mt-20 mx-auto p-6">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4">SRS Document</h2>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading...</div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Export button */}
                    <div className="flex justify-end">
                        {!exporting ? (
                            <button
                                onClick={handleExportToDocs}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Edit in Google Docs
                            </button>
                        ) : (
                            <div className="text-gray-600 px-4 py-2">
                                Exporting to Google Docs...
                            </div>
                        )}
                    </div>

                    {/* Document content */}
                    <div className="relative">
                        <div className="absolute top-2 right-8 flex gap-2 z-10">
                            <button
                                onClick={handleCopy}
                                className="bg-[#303030] text-white text-sm px-4 py-1 rounded-md hover:bg-black transition"
                            >
                                Copy
                            </button>
                            <button
                                onClick={handleCopyAsHTML}
                                className="bg-[#70abaf] text-white text-sm px-4 py-1 rounded-md hover:bg-[#5c97a0] transition"
                            >
                                Copy as HTML
                            </button>
                        </div>

                        <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none bg-white/50 p-6 rounded-md border backdrop-blur-md max-h-[80vh] overflow-y-auto whitespace-pre-wrap">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                                {srs || 'No SRS content available'}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewSRS;