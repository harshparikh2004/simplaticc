import React from 'react'

function Footer() {
  return (
    <div className='relative b-0 -z-10 w-full flex itemx-center justify-between px-16 py-8 bg-[#032224] rounded-t-[60px] md:rounded-t-[120px] mt-42'>
        <div className='absolute -z-[2] top-1/2 right-1/2 -translate-x-1/2  -translate-y-1/2 w-[120px] h-[120px] md:w-[300px] md:h-[300px] rounded-full bg-[#1d4483] blur-3xl md:blur-[130px] '></div>
        <div className='absolute -z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[250px] md:h-[250px] rounded-full bg-[#9dc7f2] blur-3xl md:blur-[130px] '></div>
        <div className='absolute -z-[2] top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] md:w-[190px] md:h-[190px] rounded-full bg-[#3ad7fa] blur-3xl md:blur-[130px] '></div>
        <div className='absolute -z-[2] top-1/2 left-1/2 translate-x-1/3 -translate-y-1/2 w-[60px] h-[60px] md:w-[190px] md:h-[190px] rounded-full bg-[#ffffff] blur-3xl md:blur-[90px] '></div>
        <div className='w-full md:h-[40vh] flex items-center justify-center'>
            <h1 className='text-white text-2xl md:text-3xl lg:text-5xl text-center leading-16 md:leading-20 ' style={{fontFamily:'Dastin'}}>Start your journey with <br /><span className='text-5xl lg:text-7xl font-bold text-white' style={{fontFamily:'Syne'}}>Simplatic!</span></h1>
        </div>
    </div>
  )
}

export default Footer