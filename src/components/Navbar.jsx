import React from 'react'
import { GoArrowUpRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

function Navbar() {
    return (
        <div className='fixed z-50 lg:max-w-[1100px] w-full top-4 rounded-lg border border-gray-200/50 left-1/2 -translate-x-1/2 mx-auto bg-white/20 backdrop-blur-lg shadow-lg flex items-center justify-evenly px-8 py-2'>
            <div className='w-full' id='logo-div'>
                <Link to={'/'} id="logo">
                    <img className="w-[130px]" src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className='w-full' id='links'>
                <ul className='flex  items-center justify-center gap-4'>
                    <a href="/"><li className='cursor-pointer after:rounded-full relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Home</li></a>
                    <a href="/"><li className='cursor-pointer after:rounded-full relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>About</li></a>
                    <a href="/"><li className='cursor-pointer after:rounded-full relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Services</li></a>
                    <a href="/"><li className='cursor-pointer after:rounded-full relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Contact</li></a>
                </ul>
            </div>
            <div className='w-full flex items-center justify-end gap-2' id='login'>
                <Link to={'/login'} className='border border-black cursor-pointer md:flex w-[100px] h-10 gap-1 items-center hover:rounded-xl justify-center group bg-[#303030] rounded-lg text-white duration-150 ease-in'>Login <GoArrowUpRight size={22} className='group-hover:ml-1 group-hover:mb-1 transition-all' /></Link>
            </div>
        </div>
    )
}

export default Navbar