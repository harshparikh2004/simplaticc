import React from 'react'
import Logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className='fixed max-w-[1340px] w-full top-4 rounded-lg left-1/2 -translate-x-1/2 mx-auto bg-white/35 backdrop-blur-lg shadow-lg flex items-center justify-evenly px-8 py-2'>
        <div className='w-full' id='logo'>
            <img src={Logo} alt="logo" className='w-32' />     
        </div>
        <div className='w-full' id='links'>
            <ul className='flex  items-center justify-center gap-4'>
                <a href="/"><li className='curser-pointer after:content-[""] hover:after:content-[""] hover:after:w-full after:w-0 after:h-[2px] after:rounded-full after:bg-black after:block after:transition-all after:duration-200'>Home</li></a>
                <a href="/"><li className='curser-pointer after:content-[""] hover:after:content-[""] hover:after:w-full after:w-0 after:h-[2px] after:rounded-full after:bg-black after:block after:transition-all after:duration-200'>About</li></a>
                <a href="/"><li className='curser-pointer after:content-[""] hover:after:content-[""] hover:after:w-full after:w-0 after:h-[2px] after:rounded-full after:bg-black after:block after:transition-all after:duration-200'>Services</li></a>
                <a href="/"><li className='curser-pointer after:content-[""] hover:after:content-[""] hover:after:w-full after:w-0 after:h-[2px] after:rounded-full after:bg-black after:block after:transition-all after:duration-200'>Contact</li></a>
            </ul>
        </div>
        <div className='w-full flex items-center justify-end gap-2' id='login'>
            <button className='border-2 border-gray-400 rounded-md px-4 py-1 hover:bg-gray-600 hover-border-gray-600 hover:text-white transition duration-150 cursor-pointer ease-in'>Login</button>
        </div>
    </div>
  )
}

export default Navbar