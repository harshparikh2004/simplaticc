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
import { Link } from 'react-router-dom';

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
        switch (status?.toLowerCase()) {
            case 'inprogress':
            case 'in progress':
                return {
                    dot: 'bg-blue-400',
                    pill: 'bg-blue-400/30 text-blue-700',
                };
            case 'completed':
                return {
                    dot: 'bg-green-500/60',
                    pill: 'bg-green-400/30 text-green-700',
                };
            case 'failed':
                return {
                    dot: 'bg-red-400',
                    pill: 'bg-red-400/30 text-red-700',
                };
            default:
                return {
                    dot: 'bg-gray-400',
                    pill: 'bg-gray-400/30 text-gray-700',
                };
        }
    };

    const getStatusText = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'Completed';
            case 'inprogress':
                return 'In Progress';
            case 'draft':
                return 'Draft';
            default:
                return status || 'Unknown';
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
            <div className="mt-32 md:mt-24 h-[85vh] md:h-[87vh] flex flex-col rounded-md w-full px-4 md:px-8 lg:px-16">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-4">
                    <div>
                        <h1 className="font-bold text-2xl sm:text-3xl" style={{ fontFamily: 'Syne' }}>
                            Recent Activity
                        </h1>
                        <p className="font-semibold text-gray-600 text-sm sm:text-base" style={{ fontFamily: 'Quicksand' }}>
                            Latest updates on your projects
                        </p>
                    </div>
                    <Link
                        style={{ fontFamily: 'Quicksand' }}
                        to="/new-project"
                        className="border border-[#303030] cursor-pointer py-2 px-4 gap-1 items-center justify-center group bg-[#303030] rounded-md hover:rounded-xl transition-all duration-150 text-white text-sm sm:text-base"
                    >
                        Create Project
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <div className="text-gray-600 text-lg font-medium mb-2" style={{ fontFamily: 'Quicksand' }}>
                            No projects yet
                        </div>
                        <p className="text-gray-500 mb-4" style={{ fontFamily: 'Quicksand' }}>
                            Create your first project to get started
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-32 md:mt-24 h-[85vh] md:h-[87vh] flex flex-col rounded-md w-full px-4 md:px-8 lg:px-16">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-4">
                <div>
                    <h1 className="font-bold text-2xl sm:text-3xl" style={{ fontFamily: 'Syne' }}>
                        Recent Activity
                    </h1>
                    <p className="font-semibold text-gray-600 text-sm sm:text-base" style={{ fontFamily: 'Quicksand' }}>
                        Latest updates on your projects
                    </p>
                </div>
                <Link
                    style={{ fontFamily: 'Quicksand' }}
                    to="/new-project"
                    className="border border-[#303030] cursor-pointer py-2 px-4 gap-1 items-center justify-center group bg-[#303030] rounded-md hover:rounded-xl transition-all duration-150 text-white text-sm sm:text-base"
                >
                    Create Project
                </Link>
            </div>

            {/* Project Cards Section */}
            <div className="flex flex-col gap-3 overflow-y-auto pb-4 pr-1 md:pr-2 scrollbar-thin">
                <AnimatePresence>
                    {projects.map((project, index) => {
                        const { dot, pill } = getStatusColor(project.status);
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => handleProjectClick(project.id, project.status)}
                                className="w-full border bg-white/60 border-black/10 backdrop-blur-2xl px-4 py-3 rounded-md hover:rounded-lg transition-all ease-in-out duration-150 cursor-pointer"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                    {/* Status Dot */}
                                    <div className="hidden flex-shrink-0 sm:flex items-center justify-center">
                                        <div className={`h-4 w-4 rounded-full ${dot}`} />
                                    </div>

                                    {/* Project Info */}
                                    <div className="flex flex-col flex-grow gap-1">
                                        <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Syne' }}>
                                            {project.projectTitle || 'Untitled Project'}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600" style={{ fontFamily: 'Quicksand' }}>
                                            <span>{getStatusText(project.status)}</span>
                                            <span>•</span>
                                            <span>Created: {formatDate(project.createdAt)}</span>
                                        </div>
                                    </div>

                                    {/* Pill Status & Loading Indicator */}
                                    <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center">
                                        {project.status === 'inprogress' && (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Loader2 className="w-4 h-4 text-blue-500" />
                                            </motion.div>
                                        )}
                                        <p className={`text-xs sm:text-sm font-bold capitalize tracking-tight py-1 px-3 rounded-full ${pill}`} style={{ fontFamily: 'Quicksand' }}>
                                            {getStatusText(project.status)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default RecentActivity;