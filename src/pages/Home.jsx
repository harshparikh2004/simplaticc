import React, { useEffect, useState } from 'react';
import hero from '../assets/Hero.png';
import { GoArrowUpRight } from 'react-icons/go';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Home() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsub();
    }, []);

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate('/new-project');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className='lg:max-w-[1340px] mt-44 w-full mx-auto flex'>
            <div id='text' className='w-full flex flex-col justify-center px-8 leading-8'>
                <h1 className='text-5xl lg:text-5xl font-medium' style={{ fontFamily: 'Syne' }}>
                    Welcome to <span className='text-6xl lg:text-7xl text-amber-500 font-extrabold' style={{ fontFamily: 'adam' }}>Simplatic!</span>
                </h1>
                <br />
                <div className='flex flex-col gap-2'>
                    <p className='text-base font-semibold lg:text-xl tracking-wide' style={{ fontFamily: 'Quicksand' }}>
                        Your Ultimate Student Companion for Effortless SRS Generation. Simplatic transforms the tedious process of creating Software Requirement Specification (SRS) documents into a seamless, automated experience.
                    </p>
                </div>
                <button
                    onClick={handleGetStarted}
                    className='md:w-1/2 lg:w-1/3 mt-4 bg-[#303030] cursor-pointer text-white gap-2 flex items-center justify-center p-2 rounded-lg hover:rounded-xl transition-all duration-150 ease-in group'
                >
                    Get Started <GoArrowUpRight size={18} className='group-hover:ml-1 group-hover:mb-1 transition-all' />
                </button>
            </div>
            <div id='image' className='hidden md:block w-full pointer-events-none'>
                <img src={hero} alt="Hero image" className='w-[90%]' />
            </div>
        </div>
    );
}

export default Home;
