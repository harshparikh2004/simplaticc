import React from 'react'
import './index.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <div className='relative w-full h-screen bg-white'>
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[#246a73] blur-[130px]'></div>
        <Navbar />
      </div>
    </>
  )
}

export default App
