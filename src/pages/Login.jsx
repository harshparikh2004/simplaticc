import React, { useState } from 'react';
import bg from '../assets/Login.png';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const toggleMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup && password !== confirmPassword) {
            toast.error("Passwords do not match.", {
                position: "top-center",
                duration: 1300,
            });
            return;
        }

        try {
            if (isSignup) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await userCredential.user.updateProfile({
                    displayName: name,
                });
                toast.success('Signup Successful.', {
                    position: "top-center",
                    duration: 1300,
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Signin Successful.', {
                    position: "top-center",
                    duration: 1300,
                });
            }
            setTimeout(() => {
                navigate('/');
            }, 1700);
        } catch (error) {
            toast.error('Failed to signup/signin', {
                position: "top-center",
                duration: 1300,
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success('Google login successful.', {
                position: "top-center",
                duration: 1300,
            });
            setTimeout(() => {
                navigate('/');
            }, 1700);
        } catch (err) {
            console.error("Google login error:", err);
            toast.error('Google login failed.', {
                position: "top-center",
                duration: 1300,
            });
        }
    };

    return (
        <div className='relative mx-auto flex items-center justify-center mt-32 md:px-16 md:py-8 mb-10'>
            <div className='absolute  md:block -z-20 top-1/5 left-1/3 md:left-1/4 w-[150px] h-[150px] md:w-[400px] md:h-[400px] blur-xl rounded-full md:blur-3xl bg-[#dba159] animate-blob-1'></div>
            <div className='absolute  md:block -z-20 top-[100px] md:top-[200px] left-[130px] md:left-[300px] w-[120px] h-[120px] md:w-[300px] md:h-[300px] blur-xl rounded-full md:blur-3xl bg-[#032224] animate-blob-2'></div>
            <div className='absolute  md:block -z-20 top-[120px] md:top-[240px] left-[190px] md:left-[450px] w-[90px] h-[90px] md:w-[200px] md:h-[200px] blur-xl rounded-full md:blur-3xl bg-[#1d4483] animate-blob-3'></div>

            <div className='flex items-center justify-center md:justify-between md:w-[80%] border border-gray-300/70 rounded-md mx-auto'>
                <div className='flex flex-col px-8 py-8 items-center justify-center gap-6 w-full md:h-[71vh] bg-white/35 md:rounded-tr-4xl md:rounded-br-4xl backdrop-blur-lg transition-all duration-300 ease-in-out'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold' style={{ fontFamily: 'Syne' }}>
                        {isSignup ? 'Signup' : 'Signin'}
                    </h1>

                    <form className='w-full flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSignup ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0'} flex flex-col gap-1`}>
                            <label htmlFor="name" className='font-medium' style={{ fontFamily: 'Quicksand' }}>Name</label>
                            <input
                                type="text"
                                id='name'
                                className='bg-white/40 border font-semibold border-black/30 px-2 outline-none py-1 rounded-sm'
                                style={{ fontFamily: 'Quicksand' }}
                                placeholder='John Doe'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className='font-medium' style={{ fontFamily: 'Quicksand' }}>Email</label>
                            <input
                                type="email"
                                id='email'
                                className='bg-white/40 border font-semibold border-black/30 px-2 outline-none py-1 rounded-sm'
                                style={{ fontFamily: 'Quicksand' }}
                                placeholder='sample@email.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className='font-medium' style={{ fontFamily: 'Quicksand' }}>Password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    className='w-full bg-white/40 border font-semibold border-black/30 px-2 outline-none py-1 rounded-sm'
                                    style={{ fontFamily: 'Quicksand' }}
                                    placeholder='••••••••'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {showPassword ? (
                                    <GoEyeClosed
                                        onClick={() => setShowPassword(false)}
                                        className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl'
                                    />
                                ) : (
                                    <GoEye
                                        onClick={() => setShowPassword(true)}
                                        className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl'
                                    />
                                )}
                            </div>
                        </div>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSignup ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0'} flex flex-col gap-1`}>
                            <label htmlFor="confirm-password" className='font-medium' style={{ fontFamily: 'Quicksand' }}>Confirm Password</label>
                            <div className='relative'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id='confirm-password'
                                    className='w-full bg-white/40 border font-semibold border-black/30 px-2 outline-none py-1 rounded-sm'
                                    style={{ fontFamily: 'Quicksand' }}
                                    placeholder='••••••••'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {showConfirmPassword ? (
                                    <GoEyeClosed
                                        onClick={() => setShowConfirmPassword(false)}
                                        className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl'
                                    />
                                ) : (
                                    <GoEye
                                        onClick={() => setShowConfirmPassword(true)}
                                        className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl'
                                    />
                                )}
                            </div>
                        </div>

                        <div className={`${isSignup ? 'mt-4' : 'mt-2'}`}>
                            <button
                                type='submit'
                                className='w-full bg-[#303030] p-2 rounded-sm text-white hover:rounded-xl font-semibold transition-all duration-150 ease-in cursor-pointer tracking-wider'
                                style={{ fontFamily: 'Syne' }}
                            >
                                {isSignup ? 'Signup' : 'Signin'}
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white border border-gray-300 font-semibold text-gray-700 rounded-md shadow-sm hover:shadow-md transition-all hover:rounded-xl  duration-150 ease-in cursor-pointer tracking-wider"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span style={{ fontFamily: 'Syne' }}>{isSignup ? 'Sign up with Google' : 'Sign in with Google'}</span>
                        </button>

                        <div className='flex items-center justify-start gap-2'>
                            <p style={{ fontFamily: 'Quicksand' }}>
                                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                            </p>
                            <button
                                onClick={toggleMode}
                                type='button'
                                className='cursor-pointer after:rounded-full relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full text-[#032224] text-lg'
                                style={{ fontFamily: 'Syne' }}
                            >
                                {isSignup ? 'Signin' : 'Signup'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className='w-full hidden md:block'>
                    <img src={bg} alt="Login Section" className='w-full object-contain' />
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;