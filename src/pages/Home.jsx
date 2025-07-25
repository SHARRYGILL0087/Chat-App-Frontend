import React from 'react'
import {Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ChatPage from './ChatPage'
import Profile from './Profile'

const Home = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <Outlet />
    </div>
  )
}

export default Home
