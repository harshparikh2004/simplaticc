import React from 'react';
import { projects } from './../data/Constant';
import { Link } from 'react-router-dom';

function RecentActivity() {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'in progress':
                return {
                    dot: 'bg-blue-400',
                    pill: 'bg-blue-400/30 text-blue-700',
                };
            case 'completed':
                return {
                    dot: 'bg-green-400',
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

    return (
        <div className="mt-32  md:mt-24 h-[85vh] md:h-[87vh] flex flex-col rounded-md w-full px-4 md:px-8 lg:px-16">
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
                {projects.map((project) => {
                    const { dot, pill } = getStatusColor(project.status);
                    return (
                        <div
                            key={project.id}
                            className="w-full border bg-white/60 border-black/10 backdrop-blur-2xl px-4 py-3 rounded-md hover:rounded-lg transition-all ease-in-out duration-150"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                {/* Status Dot */}
                                <div className="hidden flex-shrink-0 sm:flex items-center justify-center">
                                    <div className={`h-4 w-4 rounded-full ${dot}`} />
                                </div>

                                {/* Project Info */}
                                <div className="flex flex-col flex-grow gap-1">
                                    <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Syne' }}>
                                        {project.title}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600" style={{ fontFamily: 'Quicksand' }}>
                                        <span>{project.status || 'No status update available.'}</span>
                                        <span>•</span>
                                        <span>{project.date}</span>
                                    </div>
                                </div>

                                {/* Pill Status */}
                                <div className="flex-shrink-0 self-start sm:self-center">
                                    <p className={`text-xs sm:text-sm font-bold capitalize tracking-tight py-1 px-3 rounded-full ${pill}`} style={{ fontFamily: 'Quicksand' }}>
                                        {project.status || 'No status'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RecentActivity;
