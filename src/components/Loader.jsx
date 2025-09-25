import React from 'react'
import loader from '../assets/animation/Simplatic.mp4'

function Loader() {
    return (
        <div className='fixed inset-0 bg-white z-50 flex items-center justify-center'>
            <video autoPlay loop>
                <source src={loader}/>
            </video>
        </div>
    )
}

export default Loader
