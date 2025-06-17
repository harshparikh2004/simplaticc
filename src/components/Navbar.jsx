import React, { useState, useEffect } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';


function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleProfileClick = () => {
        closeMenu();
        navigate('/profile');
    };

    return (
        <nav className='fixed z-50 w-full top-4 px-4'>
            <div className='max-w-[1100px] mx-auto rounded-lg border border-gray-300/30 bg-white/40 backdrop-blur-lg shadow-lg flex items-center justify-between px-6 py-3'>

                {/* Logo */}
                <div>
                    <Link to='/' onClick={closeMenu}>
                        <img className="w-[120px]" src={Logo} alt="Logo" />
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className='hidden md:flex items-center justify-center gap-6 text-sm font-semibold' style={{ fontFamily: 'Quicksand' }}>
                    <Link to='/' className='relative cursor-pointer after:rounded-full after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Home</Link>
                    <Link to='/about' className='relative cursor-pointer after:rounded-full after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>About</Link>
                    <Link to='/services' className='relative cursor-pointer after:rounded-full after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Services</Link>
                    <Link to='/contact' className='relative cursor-pointer after:rounded-full after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Contact</Link>
                </div>

                {/* Desktop Auth */}
                <div className='hidden md:flex items-center justify-end'>
                    {isLoggedIn ? (
                        <button onClick={handleProfileClick} className='text-2xl text-black hover:text-[#032224] transition'>
                            <FaUserCircle />
                        </button>
                    ) : (
                        <Link
                            to='/login'
                            className='border border-[#303030] cursor-pointer w-[100px] h-10 gap-1 items-center hover:rounded-xl justify-center group bg-[#303030] rounded-lg text-white duration-150 ease-in flex'
                        >
                            Login
                            <GoArrowUpRight size={20} className='group-hover:ml-1 group-hover:mb-1 transition-all' />
                        </Link>
                    )}
                </div>

                {/* Hamburger */}
                <button onClick={toggleMenu} className='md:hidden text-2xl text-black'>
                    {isMobileMenuOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'} bg-white/30 backdrop-blur-lg rounded-lg mt-2 shadow-lg`}>
                <ul className='flex flex-col items-center gap-4 font-medium'>
                    <li><Link to='/' onClick={closeMenu} className='block w-full text-center py-1'>Home</Link></li>
                    <li><Link to='/about' onClick={closeMenu} className='block w-full text-center py-1'>About</Link></li>
                    <li><Link to='/services' onClick={closeMenu} className='block w-full text-center py-1'>Services</Link></li>
                    <li><Link to='/contact' onClick={closeMenu} className='block w-full text-center py-1'>Contact</Link></li>
                    <li>
                        {isLoggedIn ? (
                            <button onClick={handleProfileClick} className='text-xl text-black'>
                                <FaUserCircle />
                            </button>
                        ) : (
                            <Link
                                to='/login'
                                onClick={closeMenu}
                                className='border border-black cursor-pointer w-[100px] h-10 gap-1 items-center hover:rounded-xl justify-center group bg-[#303030] rounded-lg text-white duration-150 ease-in flex'
                            >
                                Login
                                <GoArrowUpRight size={20} className='group-hover:ml-1 group-hover:mb-1 transition-all' />
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

