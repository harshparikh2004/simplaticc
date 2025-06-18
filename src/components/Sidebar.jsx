import React, { useState } from 'react';
import profile from '../assets/profile.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowRight, HiX } from 'react-icons/hi';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';
import { signOut } from 'firebase/auth';


function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out.', {
                position: "top-left",
                duration: 1300,
            });
            setTimeout(() => {
                navigate('/login');
            }, 1700);
        } catch (error) {
            console.error("Logout error:", error);
            toast.error('Failed to logout.', {
                position: "top-left",
                duration: 1300,
            });
        }
    };

    return (
        <>
            {/* Hamburger icon (only for small screens) */}
            <div className='fixed top-6 left-4 z-30 md:hidden'>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-black mt-13 bg-gray-200 p-2 rounded-lg shadow-md'
                >
                    {isOpen ? <HiX size={24} /> : <HiArrowRight size={24} />}
                </button>
            </div>

            {/* Sidebar container */}
            <div
                className={`fixed top-0 left-0 z-20 h-full w-[75%] sm:w-[60%] md:w-[20%] px-8 py-6 bg-white/20 backdrop-blur-3xl rounded-r-2xl border border-gray-400/30 border-b-0 flex flex-col justify-between items-center gap-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:sticky md:top-0 md:h-screen md:flex`}>
                <div className='flex flex-col w-full gap-8 items-center pt-28 md:pt-24'>
                    <div
                        id='PP'
                        className='overflow-hidden rounded-2xl border border-gray-300/20 shadow-xl shadow-black/30 w-[200px] h-[200px]'
                    >
                        <img src={profile} alt='Profile' />
                    </div>
                    <div className='w-full'>
                        <ul
                            className='flex flex-col items-start justify-between font-semibold gap-4 text-black'
                            style={{ fontFamily: 'Quicksand' }}
                        >
                            <Link to={'/profile'} className='w-full cursor-pointer rounded-md hover:bg-[#70abaf]/90 hover:text-white transition ease-in duration-150 p-2'>
                                <Link className='' to='/profile'>Profile</Link>
                            </Link>
                            <Link to={'/projects'} className='w-full cursor-pointer rounded-md hover:bg-[#70abaf]/90 hover:text-white transition ease-in duration-150 p-2'>
                                <Link to='/projects'>My Projects</Link>
                            </Link>
                            <Link to={'/settings'} className='w-full cursor-pointer rounded-md hover:bg-[#70abaf]/90 hover:text-white transition ease-in duration-150 p-2'>
                                <Link to='/settings'>Settings</Link>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className='w-full'>
                    <button
                        onClick={handleLogout}
                        className='w-full bg-red-500 rounded-md hover:shadow-sm py-2 border border-white/60 hover:shadow-red-400 hover:rounded-xl text-white transition-all cursor-pointer ease-in duration-150'
                    >
                        Logout
                    </button>
                </div>
                <Toaster/>
            </div>
        </>
    );
}

export default Sidebar;

