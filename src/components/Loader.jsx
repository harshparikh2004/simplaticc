import React from 'react'
import loader from '../assets/animation/simplatic_animation.gif'

function Loader() {
    return (
        <div className='fixed inset-0 bg-white z-50 flex items-center justify-center'>
            <img src={loader} alt="Loading..." />
        </div>
    )
}

export default Loader
