import React, { useContext } from 'react'
import Contacts from '../components/Contacts'
import Chats from '../components/Chats'
import io from 'socket.io-client'
import { useEffect } from 'react'
import { useState } from 'react'
import { GlobalState } from '../GlobalStates'


const socket = io('https://chat-app-backend-ojv8.onrender.com', {
  withCredentials: true,
  transports: ['websocket']
})


const ChatPage = () => {
  const states = useContext(GlobalState)
  // const [contacts, setContacts] = useState(contactsdata)
  // const [currContact, setCurrContact] = useState(contactsdata[0])
  const contactsList = states.contactsList[0]
  const [contacts, setContacts] = useState([])
  const [currContact, setCurrContact] = useState({})
  const [isOnline, setIsOnline] = useState(false)
  const [contactPage, setContactPage] = useState(true)
  const [user, setUser] = states.user
  const [roomId, setRoomId] = useState('')


  // console.log('sdf',contactsList)
  // console.log(contacts)

  useEffect(() => {
    if (contactsList.length !== 0) {
      console.log(contactsList)
      setContacts(contactsList)
      setCurrContact(contactsList[0])
    }
  }, [contactsList])


  // console.log('ussr', user._id)
  // console.log('cont', currContact.contantId)
  // console.log(roomId)


  const getroomId = () => {
    const roomid = [user._id, currContact.contactId].sort().join('_')
    console.log(roomid)
    setRoomId(roomid)
  }

  useEffect(() => {
    if (user?._id && currContact?.contactId) getroomId()
  }, [user, currContact])


  const toggelContactPage = () => {
    setContactPage(!contactPage)
  }

  const handleSelectContact = (item) => {
    setCurrContact(item)
    toggelContactPage()
  }


  return (
    <div className='flex w-[94%] lg:w-[92%] bg-slate-800 h-screen'>
      <Contacts contacts={contacts} handleSelectContact={handleSelectContact} currContact={currContact} isOnline={isOnline} contactPage={contactPage} />
      <Chats currContact={currContact} user={user} roomId={roomId} socket={socket} isOnline={isOnline} setIsOnline={setIsOnline} toggelContactPage={toggelContactPage} contactPage={contactPage} />
    </div>
  )
}

export default ChatPage
