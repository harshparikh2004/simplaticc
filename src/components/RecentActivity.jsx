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
        <div className='border-2 mt-8 md:mt-0 h-[82vh] md:h-[87vh] border-black/15 flex flex-col rounded-md w-full'>
            <div className='flex border-b border-gray-400/70 bg-white/50 p-4'>
                <div className='w-full flex flex-col items-start'>
                    <h1 className='font-bold text-xl md:text-3xl' style={{ fontFamily: 'Syne' }}>Recent Activity</h1>
                    <p className='font-semibold text-gray-600' style={{ fontFamily: 'Quicksand' }}>Latest updates on your projects</p>
                </div>
                <div className='w-full flex items-center justify-end'>
                    <Link
                        style={{ fontFamily: 'Quicksand' }}
                        to='/new-project'
                        className='border border-[#303030] cursor-pointer py-2 px-4 gap-1 items-center hover:rounded-xl justify-center group bg-[#303030] rounded-sm text-white duration-150 ease-in flex'
                    >
                        Create Project
                    </Link>
                </div>
            </div>
            <div className='flex flex-col cursor-pointer gap-y-2 justify-center px-4 pb-4 bg-white/50 max-h-fit overflow-y-auto pt-132 md:pt-76 scrollbar-thin'>
                {projects.map((project) => {
                    const { dot, pill } = getStatusColor(project.status);
                    return (
                        <div
                            key={project.id}
                            className="w-full hover:rounded-lg group border bg-white/60 border-black/10 backdrop-blur-2xl transition-all ease-in duration-150 px-4 py-2 rounded-sm"
                        >
                            <div className="flex gap-2">
                                <div className='w-13 flex items-center justify-center'>
                                    <div className={`h-[14px] w-[15px] rounded-full ${dot}`}></div>
                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="text-lg text-gray-800 font-bold" style={{ fontFamily: 'Syne' }}>{project.title}</h2>
                                    <div className='flex items-center justify-start gap-1'>
                                        <p className="text-gray-600 font-regular text-justify">
                                            {project.status || 'No status update available.'}
                                        </p>
                                        <p className='text-gray-600'>•</p>
                                        <p className='text-sm tracking-wide'>{project.date}</p>
                                    </div>
                                </div>
                                <div className='w-full flex items-center justify-end'>
                                    <p className={`text-sm capitalize font-bold tracking-tighter py-1 px-3 rounded-full ${pill}`} style={{ fontFamily: 'Quicksand' }}>
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
