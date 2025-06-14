import React from 'react'
import bg from '../assets/Login.png'


function Login() {
    return (
        <div className='flex items-center justify-center mt-32 border md:px-16 md:py-8'>
            <div className='flex items-center justify-between md:w-[77%] border mx-auto'>
                <div className='flex flex-col items-center w-full '>
                    <h1>Login</h1>
                    <form>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name'/>
                    </form>
                </div>
                <div className='w-full'>
                    <img src={bg} alt="Login Sectiuon" />
                </div>
            </div>
        </div>
    )
}

export default Login