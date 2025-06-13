import React from 'react'

function Footer() {
  return (
    <div className='relative -z-10 w-full flex itemx-center justify-between px-16 py-8 bg-[#032224] rounded-t-[120px] mt-16'>
        <div className='absolute -z-[2] top-1/2 right-1/2 -translate-x-1/2  -translate-y-1/2  w-[300px] h-[300px] rounded-full bg-[#1d4483] blur-[130px] '></div>
        <div className='absolute -z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[250px] h-[250px] rounded-full bg-[#9dc7f2] blur-[130px] '></div>
        <div className='absolute -z-[2] top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2  w-[190px] h-[190px] rounded-full bg-[#3ad7fa] blur-[130px] '></div>
        <div className='absolute -z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[190px] h-[190px] rounded-full bg-[#ffffff] blur-[130px] '></div>
        <div className='w-full h-[40vh] flex items-center justify-center'>
            <h1 className='text-white text-lg md:text-3xl lg:text-5xl text-center leading-20 ' style={{fontFamily:'Dastin'}}>Start your journey with <br /><span className='text-xl md:text-5xl lg:text-7xl font-bold text-white' style={{fontFamily:'Syne'}}>Simplatic!</span></h1>
        </div>
    </div>
  )
}

export default Footer