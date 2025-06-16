import React from 'react'
import { GoArrowUpRight } from 'react-icons/go'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='relative bottom-0 z-10 w-full flex items-center justify-between px-16 py-8 bg-[#032224] rounded-t-[60px] md:rounded-t-[80px]'>
      <div className='absolute -z-[3] top-1/3 right-1/2 -translate-x-1/2  -translate-y-1/2 w-[120px] h-[120px] md:w-[300px] md:h-[300px] rounded-full bg-[#1d4483] blur-3xl md:blur-[130px] '></div>
      <div className='absolute -z-[3] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[250px] md:h-[250px] rounded-full bg-[#9dc7f2] blur-3xl md:blur-[130px] '></div>
      <div className='absolute -z-[3] top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] md:w-[190px] md:h-[190px] rounded-full bg-[#3ad7fa] blur-3xl md:blur-[130px] '></div>
      <div className='absolute -z-[3] top-1/3 left-1/2 translate-x-1/3 -translate-y-1/2 w-[60px] h-[60px] md:w-[190px] md:h-[190px] rounded-full bg-[#ffffff] blur-3xl md:blur-[100px] '></div>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='w-full md:h-[45vh] mt-24 flex items-center justify-center'>
          <h1 className='text-white text-2xl md:text-3xl lg:text-6xl text-center leading-16 md:leading-20 ' style={{ fontFamily: 'Dastin' }}>Start your journey with <br /><span className='text-5xl lg:text-8xl font-bold text-white' style={{ fontFamily: 'Syne' }}>Simplatic!</span></h1>
        </div>
        <div className='hidden'>
          <Link
            to='/login'
            className='border border-white cursor-pointer px-12 py-4 font-semibold gap-1 items-center hover:rounded-xl justify-center group bg-[#ffffff] rounded-lg text-black  duration-150 ease-in flex shadow-xl shadow-white/20'
          >
            Get Started
            <GoArrowUpRight size={20} className='group-hover:ml-1 group-hover:mb-1 transition-all' />
          </Link>
        </div>
        <div className='flex flex-col gap-10 md:gap-0 md:flex-row items-center md:items-start md:justify-evenly px-16 py-8 mx-auto w-11/12 mt-22 mb-16'>
          <div className='text-white flex flex-col items-center justify-center md:items-start' style={{fontFamily:'Quicksand'}}>
            <h3 className='text-2xl md:text-lg font-black tracking-wider' style={{fontFamily:'dastin'}}>Product</h3>
            <ul className='flex flex-col gap-4 mt-8'>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>Features</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>Pricing</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>Integrations</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>API</Link></li>
            </ul>
          </div>
          <div className='text-white flex flex-col items-center justify-center md:items-start' style={{fontFamily:'Quicksand'}}>
            <h3 className='text-2xl md:text-lg font-black tracking-wider' style={{fontFamily:'dastin'}}>Company</h3>
            <ul className='flex flex-col gap-4 mt-8'>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>About</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>Careers</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>Blog</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>Press</Link></li>
            </ul>
          </div>
          <div className='text-white flex flex-col items-center justify-center md:items-start' style={{fontFamily:'Quicksand'}}>
            <h3 className='text-2xl md:text-lg font-black tracking-wider' style={{fontFamily:'dastin'}}>Docs</h3>
            <ul className='flex flex-col gap-4 mt-8'>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>Getting started</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>api references</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>tutorials</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>examples</Link></li>
            </ul>
          </div>
          <div className='text-white flex flex-col items-center justify-center md:items-start' style={{fontFamily:'Quicksand'}}>
            <h3 className='text-2xl md:text-lg font-black tracking-wider' style={{fontFamily:'dastin'}}>Resources</h3>
            <ul className='flex flex-col gap-4 mt-8'>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>help centers</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>community</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>webinars</Link></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>downloads</Link></li>
            </ul>
          </div>
          <div className='text-white flex flex-col items-center justify-center md:items-start' style={{fontFamily:'Quicksand'}}>
            <h3 className='text-2xl md:text-lg font-black tracking-wider' style={{fontFamily:'dastin'}}>Connect</h3>
            <ul className='flex flex-col gap-4 mt-8'>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><a href='https://www.youtube.com' target="_blank">linkedin</a></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><a href='https://www.youtube.com' target="_blank">github</a></li>
              <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><a href='https://www.youtube.com' target="_blank">twitter</a></li>
            </ul>
          </div>
        </div>
        <div className='capitalize flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-12 text-white' style={{fontFamily:'syne'}}>
          <p className='text-2xl lg:text-sm font-semibold mb-4 md:mb-0'>© 2025 Simplatic</p>
          <p className='text-xl lg:text-sm font-medium opacity-70 hover:opacity-100 transition'>privacy policy</p>
          <p className='text-xl lg:text-sm font-medium opacity-70 hover:opacity-100 transition'>terms</p>
          <p className='text-xl lg:text-sm font-medium opacity-70 hover:opacity-100 transition'>legal notice</p>
        </div>
      </div>
    </div>
  )
}

export default Footer