import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <>
        <div className='relative w-full'>
          <div className='absolute top-1/4 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 md:-translate-x-1/2 md:-translate-y-1/2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full bg-[#246a73]/70 blur-[40px] md:blur-[130px] -z-20'></div>
          <div className='absolute top-1/4 md:top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/4 md:-translate-x-1/2 md:-translate-y-1/2 w-[100px] h-[100px] md:w-[300px] md:h-[300px] rounded-full bg-[#dba159]/70 blur-[30px] md:blur-[100px] -z-10'></div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
          <Footer />
        </div>
    </>
  )
}

export default App
