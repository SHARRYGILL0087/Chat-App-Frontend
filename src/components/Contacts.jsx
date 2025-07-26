import srch from '../assets/srch.png'
import { useContext, useState } from 'react'
import AddContact from './AddContact'
import axios from 'axios'
import { GlobalState } from '../GlobalStates'
import toast, { Toaster } from 'react-hot-toast'


const Contacts = ({ contacts, handleSelectContact, currContact, isOnline, contactPage }) => {
  const states = useContext(GlobalState)
  const [addContactPage, setAddContactPage] = useState(false)
  const [addContact, setAddContact] = useState('')
  const [userId, setUserId] = states.userId
  const [refreshContact, setRefreshContact] = states.refreshContact

  const handleAddContact = async (e) => {
    e.preventDefault()
    try {
      const contact = await axios.post('https://chat-app-backend-ojv8.onrender.com/user/findUser', { id: addContact })
      // console.log(contact.data.user)
      const contactInfo = contact.data.user
      if (!contactInfo) {
        console.error('No Contact Found!')
        return
      }
      console.log({ userId })
      console.log({ contactId: contactInfo._id, username: contactInfo.username, avatar: contactInfo.avatar })

      const res = await axios.post('https://chat-app-backend-ojv8.onrender.com/contact/add', {
        'userId': userId,
        'contact': { contactId: contactInfo._id, username: contactInfo.username, avatar: contactInfo.avatar }
      })


      console.log('Contact Added->', res.data)
      setRefreshContact(!refreshContact)

      setAddContact('')
      toast('Contact Added')

    } catch (error) {
      console.log('Finding User : ', error.message)
      toast(error.message)
    }
  }

  return (
    <div className={`${contactPage ? 'block w-full' : 'hidden'} md:w-[30%] md:block px-9 text-white relative`}>
      <Toaster position="top-right" />
      <div className='flex gap-3 my-4 py-2 px-2 bg-slate-700 rounded-2xl w-[full]'>
        <img src={srch} width={24} alt="Srch" />
        <input type="text" placeholder={`  Search...`} className=' placeholder:text-slate-400 outline-none w-full' />
      </div>
      <div className="flex flex-col py-3 gap-3 h-[600px] overflow-y-auto">

        {!contacts ? (
          <div className={`flex  items-center justify-between mt-3 cursor-pointer hover:bg-slate-700 transition-all duration-200 rounded-2xl px-2 py-2 ${currContact === item ? 'bg-slate-700' : ''}`}>
            <div className='flex items-center gap-2.5'>
              {/* <img src={item.avatar} width={40} className="rounded-2xl text-lg" alt="Avatar" /> */}
              <span>Please Add Contacts</span>
            </div>
          </div>
        ) : (

          contacts.map((item, idx) => {
            return (
              <div onClick={() => handleSelectContact(item)} key={idx} className={`flex  items-center justify-between mt-3 cursor-pointer hover:bg-slate-700 transition-all duration-200 rounded-2xl px-2 py-2 ${currContact === item ? 'bg-slate-700' : ''}`}>
                <div className='flex items-center gap-2.5'>
                  <img src={item.avatar} width={40} className="rounded-2xl text-lg" alt="Avatar" />
                  <span>{item.username}</span>
                </div>
              </div>
            )
          })
        )

        }
      </div>

      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${addContactPage ? 'visible' : 'hidden'} bg-slate-900 px-4 py-2.5 rounded-3xl min-h-[100px] flex flex-col items-end  sm:w-auto mx-6`}>
        <span onClick={() => { setAddContactPage(false) }} className='cursor-pointer'>X</span>
        <AddContact handleAddContact={handleAddContact} addContact={addContact} setAddContact={setAddContact} />
      </div>

      <div onClick={() => { setAddContactPage(true) }} className='absolute bottom-3 right-2 p-2 cursor-pointer border-2 border-cyan-300 bg-slate-900 rounded-xl'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>

      </div>
    </div>
  )
}

export default Contacts
