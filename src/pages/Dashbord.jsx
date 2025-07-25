import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/img1.png';
import arrow from '../assets/arrow.svg';

const Dashbord = () => {
    return (
        <div className='bg-[#141414] text-white'>
            <div className='flex md:flex-row flex-col items-center justify-center w-screen min-h-screen'>
                <div className='md:w-[60%] w-full px-12'>
                    <div className='flex flex-col gap-7'>
                        <h1 className='md:text-7xl text-5xl font-bold'>
                            Deku Chat: Instant Connection, Effortless Conversations
                        </h1>
                        <p className='text-xl text-slate-300 '>
                            Connect Seamlessly, Chat Effortlessly: Elevate Your Conversations with Our Intuitive Chat Application!
                        </p>
                        <div className='flex gap-9'>
                            <Link to={'/login'}>
                                <button className='cursor-pointer bg-blue-600 border-0 px-5 p-2.5 rounded-lg text-xl'>
                                    <span className='flex gap-1 items-center'>Login<img className='pt-1' src={arrow} alt="arrow"/></span>
                                </button>
                            </Link>
                            <Link to={'/register'}>
                                <button className='cursor-pointer border border-slate-500 px-5 p-2.5 rounded-lg text-xl'>
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-[40%]'>
                    <img src={img1} alt="Image Description" className='object-cover hidden md:block md:w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default Dashbord
