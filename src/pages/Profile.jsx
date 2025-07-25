import React, { useContext, useState } from 'react'
import UserApi from '../api/UserApi'
import {Link} from 'react-router-dom'
import { GlobalState } from '../GlobalStates'

const Profile = () => {
  const states = useContext(GlobalState)
  const [user, setUser] = states.user
  console.log(user)

  return (
    <div className='flex w-[94%] lg:w-[92%] bg-slate-800 h-screen text-white'>
      <h1 className='font-bold text-2xl m-3 text-slate-200 fixed top-2 left-6 md:relative'>
        Profile
      </h1>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='sm:w-[500px] pt-24 sm:pt-0 sm:h-[550px] w-full h-full bg-slate-950 sm:rounded-2xl'>
          <div className='flex flex-col gap-5 items-center justify-center my-5 relative'>
            <img src={user.avatar} className='w-44 rounded-full' alt="DP" />
            <div className='flex flex-col items-start w-full px-7 text-md'>
              <span className='text-slate-400 mb-2'>Your Username</span>
              <div className='text-lg tracking-wide'>{user.username}</div>
              <span className='text-slate-400 mb-2 mt-6'>Your email</span>
              <div className='text-lg tracking-wide'>{user.email}</div>
              <span className='text-slate-400 mb-2 mt-6'>About</span>
              <div className='text-lg tracking-wide'>{user.about}</div>
            </div>
            <Link to={'/home/editprofile'}>
            <button className='px-6 py-1 tracking-wider absolute top-0 right-2 cursor-pointer bg-gray-600 rounded-2xl '>Edit</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
