import React, { useState } from 'react';
import profile from '../assets/profile.jpg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiArrowRight, HiX } from 'react-icons/hi';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';
import { signOut } from 'firebase/auth';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out.', {
                position: 'top-left',
                duration: 1300,
            });
            setTimeout(() => {
                navigate('/login');
            }, 1700);
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout.', {
                position: 'top-left',
                duration: 1300,
            });
        }
    };

    return (
        <div className='relative z-40'>
            {/* Mobile Toggle Button */}
            <div className='fixed top-6 left-4 z-40 md:hidden mt-14'>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-black bg-white/70 backdrop-blur-md p-2 rounded-lg shadow-md'
                >
                    {isOpen ? <HiX size={24} /> : <HiArrowRight size={24} />}
                </button>
            </div>

            {/* Sidebar Container */}
            <div
                className={`fixed top-0 left-0 z-30 h-full w-[75%] sm:w-[60%] md:w-[110%] px-6 sm:px-8 py-6 bg-white/20 backdrop-blur-2xl border-r border-gray-300/30 rounded-r-2xl shadow-lg flex flex-col justify-between items-center transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:sticky md:top-0 md:h-screen`}
            >
                {/* Profile & Nav Links */}
                <div className='flex flex-col items-center w-full pt-24 md:pt-20 gap-8'>
                    <div className='w-40 h-40 overflow-hidden rounded-2xl border border-gray-200 shadow-md'>
                        <img src={profile} alt='Profile' className='w-full h-full object-cover' />
                    </div>

                    <nav className='w-full'>
                        <ul className='flex flex-col gap-3 text-black font-semibold' style={{ fontFamily: 'Quicksand' }}>
                            <li>
                                <Link
                                    to='/profile'
                                    className={`block w-full p-2 rounded-md transition duration-150 ${location.pathname === '/profile'
                                            ? 'bg-[#70abaf]/90 text-white'
                                            : 'hover:bg-[#70abaf]/90 hover:text-white'
                                        }`}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/projects'
                                    className={`block w-full p-2 rounded-md transition duration-150 ${location.pathname === '/projects'
                                            ? 'bg-[#70abaf]/90 text-white'
                                            : 'hover:bg-[#70abaf]/90 hover:text-white'
                                        }`}
                                >
                                    My Projects
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Logout Button */}
                <div className='w-full'>
                    <button
                        onClick={handleLogout}
                        className='w-full py-2 bg-red-500 text-white rounded-md hover:rounded-xl transition-all duration-150 hover:shadow-md hover:shadow-red-400 border border-white/50'
                    >
                        Logout
                    </button>
                </div>
                <Toaster />
            </div>
        </div>
    );
}

export default Sidebar;