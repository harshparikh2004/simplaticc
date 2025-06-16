import Projects from '../components/Projects'
import Sidebar from '../components/Sidebar'
import React from 'react'



function Profile() {
  return (
    <div className='relative -z-10 w-full flex min-h-screen bg-gray-200/40'>
      <div className='absolute  md:block -z-20 top-1/5 left-1/3 md:left-1/18 w-[150px] h-[150px] md:w-[400px] md:h-[400px] blur-xl rounded-full md:blur-3xl bg-[#dba159]'></div>
      <Sidebar />
      <div className='bg-gray-200/40 py-1 w-full h-[89vh] mt-[81px]'>
        <Projects/>
      </div>
    </div>
  )
}

export default Profile