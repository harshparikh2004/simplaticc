import React from 'react'
import Logo from '../assets/logo.png'

function Navbar() {
    return (
        <div className='fixed z-50 lg:max-w-[1100px] w-full top-4 rounded-lg border border-gray-200 left-1/2 -translate-x-1/2 mx-auto bg-white/20 backdrop-blur-lg shadow-lg flex items-center justify-evenly px-8 py-2'>
            <div className='w-full' id='logo'>
                <img src={Logo} alt="logo" className='w-32' />
            </div>
            <div className='w-full' id='links'>
                <ul className='flex  items-center justify-center gap-4'>
                    <a href="/"><li className='cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Home</li></a>
                    <a href="/"><li className='cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>About</li></a>
                    <a href="/"><li className='cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Services</li></a>
                    <a href="/"><li className='cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full'>Contact</li></a>
                </ul>
            </div>
            <div className='w-full flex items-center justify-end gap-2' id='login'>
                <button className='border-2 border-gray-200 rounded-md px-4 py-1 hover:bg-gray-800 hover-border-gray-800 hover:text-white transition duration-150 cursor-pointer ease-in'>Login</button>
            </div>
        </div>
    )
}

export default Navbar