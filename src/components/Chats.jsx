import { useEffect } from "react"
import { useRef, useState } from "react"
import back from '../assets/arrBack.svg'
import axios from 'axios'


const Chats = ({ currContact, socket, isOnline, setIsOnline, toggelContactPage, contactPage, roomId, user }) => {
  const [message, setMessage] = useState('')
  const [messages, setmessages] = useState([])
  const chatContainer = useRef(null)

  console.log(messages)

    const getMessages  = async ()=>{
      try {
        const res = await axios.post('https://chat-app-backend-ojv8.onrender.com/message/get' , {roomId})
        // console.log(res.data)
        setmessages(res.data.messages)
      } catch (error) {
        console.log('Messages Error' , error.message)
      }
    }
  

  useEffect(() => {
    
    if(roomId){
      socket.emit('join-user', roomId)
      getMessages()
    }


    const handleUserJoined = (senderId, receiverId) => {
      // console.log({ senderId, receiverId })
    }

    const handleSendMsg = data => {
      console.log('send', data)
      setmessages(prev => [...prev, data])
    }

    const handleReceiveMsg = data => {
      console.log('receive', data)
      setmessages(prev => [...prev, data])
    }

    const handleOnline = () => {
      setIsOnline(true)
    }


    socket.on('online-user', handleOnline)
    socket.on('User-Join', handleUserJoined)
    socket.on('SendMsg', handleSendMsg)
    socket.on('ReceiveMsg', handleReceiveMsg)

    return () => {
      socket.off('online-user', handleOnline)
      socket.off('User-Join', handleUserJoined)
      socket.off('SendMsg', handleSendMsg)
      socket.off('ReceiveMsg', handleReceiveMsg)
    }
  }, [roomId, socket])

  const handleSendMessage = async () => {
    try {
      socket.emit('sendMessage', { senderId: user._id, receiverId: currContact.contactId, roomId, message: message })
      const res = await axios.post('https://chat-app-backend-ojv8.onrender.com/message/sendmessage', { senderId: user._id, roomId, receiverId: currContact.contactId, message: message })
      setMessage('')
    } catch (error) {
      console.log(error.message)
    }

  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message !== '') handleSendMessage()
  }




  return (
    <div className={`${contactPage ? 'hidden' : 'block w-full'} md:block relative md:w-[70%] text-white my-4 py-2`}>
      <div className='w-full '>
        <div className="ml-3 flex gap-3 items-center cursor-pointer">
          <img src={back} alt="back" onClick={toggelContactPage} className="cursor-pointer block sm:hidden" />
          <img src={currContact.avatar} className="rounded-full text-lg w-[35px] h-[35px]" alt="Avatar" />
          <span>{currContact.username}</span>
          {isOnline && <span className='p-1 rounded-full bg-green-400'></span>}
        </div>
        <hr className='text-slate-500 w-full mt-3' />
      </div>

      <div ref={chatContainer} className=' overflow-y-auto min-h-[580px] py-8 md:border-l border-slate-500 mx-1.5 flex flex-col gap-3'>

        {messages.map((item, idx) => {
          return (
            <div key={idx} className='w-full clear-both'>
              <span className={`${item.senderId === user._id ? 'float-left' : 'float-right'} bg-gray-600 rounded-xl mx-2 py-1.5 px-2`}>{item.message}</span>
            </div>
          )
        })}

      </div>
      <div className='absolute bg-gray-500 bottom-6 mx-6 w-[92%] rounded-4xl flex justify-between'>
        <input onKeyDown={handleKeyDown} type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Your Message' className='px-3 py-2.5 outline-none  w-full' />
        <button onClick={handleSendMessage} className='rounded-r-4xl px-3 bg-slate-900 font-semibold cursor-pointer'>Send</button>
      </div>
    </div>
  )
}

export default Chats
