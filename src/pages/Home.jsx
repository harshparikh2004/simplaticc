import React from 'react'
import hero from '../assets/Hero.png'
import '../index.css'

function Home() {
    return (
        <div className='lg:max-w-[1340px] mt-28 w-full mx-auto flex'>
            <div id='text' className='w-full flex flex-col justify-center px-8 leading-8'>
                <h1 className='text-lg md:text-3xl lg:text-5xl font-medium' style={{ fontFamily: 'Syne' }}>Welcome to <span className='lg:text-7xl text-amber-500' style={{ fontFamily: 'Oswald' }}>Simplatic !</span></h1>
                <br />
                <div className='flex flex-col gap-2'>
                    <p className='text-base lg:text-xl tracking-wide' style={{ fontFamily: 'Quicksand' }}>Your Ultimate Student Companion for Effortless SRS Generation. Simplatic transforms the tedious process of creating Software Requirement Specification (SRS) documents into a seamless, automated experience.</p>
                </div>
            </div>
            <div id='image' className='w-full'>
                <img src={hero} alt="Hero image" className='w-[90%]' />
            </div>
        </div>
    )
}

export default Home 