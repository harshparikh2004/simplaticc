import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, auth } from '../firebase';
import { 
    collection, 
    query, 
    where, 
    orderBy, 
    onSnapshot,
    limit 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Clock, FileText, Loader2 } from 'lucide-react';

function RecentActivity() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (authLoading) return; // Wait for auth to load
        
        if (!user) {
            setLoading(false);
            setError('Please log in to view your projects');
            return;
        }

        // Create a real-time listener for user's projects
        const projectsQuery = query(
            collection(db, 'projects'),
            where('createdByUid', '==', user.uid),
            orderBy('createdAt', 'desc'),
            limit(10) // Limit to recent 10 projects
        );

        const unsubscribe = onSnapshot(
            projectsQuery,
            (snapshot) => {
                const projectsData = [];
                snapshot.forEach((doc) => {
                    projectsData.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                
                setProjects(projectsData);
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error('Error fetching projects:', err);
                setError('Failed to load projects');
                setLoading(false);
            }
        );

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, [user, authLoading]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'No date';
        
        // Handle Firestore timestamp
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        
        // Format as dd/mm/yyyy
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'inprogress':
                return 'bg-yellow-500';
            case 'draft':
                return 'bg-gray-500';
            default:
                return 'bg-blue-500';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Completed';
            case 'inprogress':
                return 'In Progress';
            case 'draft':
                return 'Draft';
            default:
                return 'Unknown';
        }
    };

    const handleProjectClick = (projectId, status) => {
        if (status === 'completed') {
            navigate(`/srs/${projectId}`);
        } else {
            // Handle in-progress or draft projects
            navigate(`/project/${projectId}`);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <Loader2 className="w-8 h-8 text-blue-500" />
                </motion.div>
                <span className="ml-3 text-gray-600" style={{ fontFamily: 'Quicksand' }}>
                    Loading your projects...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-lg font-medium mb-2" style={{ fontFamily: 'Quicksand' }}>
                        {error}
                    </div>
                    {!user && (
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            style={{ fontFamily: 'Quicksand' }}
                        >
                            Go to Login
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-600 text-lg font-medium mb-2" style={{ fontFamily: 'Quicksand' }}>
                        No projects yet
                    </div>
                    <p className="text-gray-500 mb-4" style={{ fontFamily: 'Quicksand' }}>
                        Create your first project to get started
                    </p>
                    <button
                        onClick={() => navigate('/new-project')}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        style={{ fontFamily: 'Quicksand' }}
                    >
                        Create Project
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-6" style={{ fontFamily: 'Quicksand' }}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            onClick={() => handleProjectClick(project.id, project.status)}
                            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {project.projectTitle || 'Untitled Project'}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                                            <span className="text-xs font-medium text-gray-600">
                                                {getStatusText(project.status)}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>Created: {formatDate(project.createdAt)}</span>
                                    </div>
                                </div>
                                
                                <div className="ml-4">
                                    {project.status === 'inprogress' && (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Loader2 className="w-4 h-4 text-yellow-500" />
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {projects.length >= 10 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/projects')}
                        className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        View All Projects →
                    </button>
                </div>
            )}
        </div>
    );
}

export default RecentActivity;