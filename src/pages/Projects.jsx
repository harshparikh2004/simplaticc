import React from 'react'
import RecentActivity from '../components/RecentActivity'
import Sidebar from '../components/Sidebar'

function Projects() {

    return (
        <div className='flex relative -z-10 w-full min-h-screen bg-gray-200/40'>
            <div className='absolute  md:block -z-20 top-1/5 left-1/3 md:left-1/18 w-[150px] h-[150px] md:w-[400px] md:h-[400px] blur-xl rounded-full md:blur-3xl bg-[#246a73]'></div>
            <Sidebar/>
            <RecentActivity />
        </div>
    )
}

export default Projects