import { Link } from 'react-router-dom'
import logo from '../assets/ChatLogo.png'
import svg1 from '../assets/profile.svg'
import svg2 from '../assets/chat.svg'
import svg3 from '../assets/logout.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { GlobalState } from '../GlobalStates'

const Sidebar = () => {
  const states = useContext(GlobalState)
  const [refresh, setRefresh] = states.refresh
  const [user, setUser] = states.user


  const handleLogout = async () => {
    localStorage.clear()
    setRefresh(!refresh)
  }

  return (
    <div className=' bg-gray-950 text-white w-[8%] sm:w-[6%] lg:w-[8%] h-screen flex flex-col py-4 px-1.5'>
      <div className='flex items-center gap-2'>
        <img src={logo} alt="Logo" className='w-10 rounded-2xl' />
        <span className='hidden lg:block text-white font-bold text-lg'>Deku</span>
      </div>
      <hr className='text-slate-500 mt-5' />
      <div className='flex flex-col gap-3 mt-6'>
        <Link to={'/home/profile'} >
          <div className='flex items-center gap-3'>
            <img src={svg1} alt="Profile" className='w-5' />
            <span className='hidden lg:block tracking-wide'>Profile</span>
          </div>
        </Link>
        <Link to={'/home/chatpage'} >
          <div className='flex items-center gap-3'>
            <img src={svg2} alt="Chat" className='w-5' />
            <span className='hidden lg:block'>Chats</span>
          </div>
        </Link>
      </div>

      <div className='fixed bottom-5'>
        <Link to={'/home/profile'}>
        <img src={user.avatar} alt="pic" className='w-8 my-1.5 hidden sm:block border-2 border-black mx-auto cursor-pointer rounded-full' />
        </Link>
        <button onClick={handleLogout} className='flex items-center gap-2 cursor-pointer '>
          <img src={svg3} alt="Logout" className='w-5' />
          <span className='hidden lg:block'>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
