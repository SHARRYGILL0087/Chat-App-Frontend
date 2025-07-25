import React from 'react'

const AddContact = ({handleAddContact,addContact,setAddContact}) => {
  return (
    <div >
        <form onSubmit={handleAddContact} className='flex items-center justify-center flex-col gap-3 w-full'> 
            <input required type="text" value={addContact} onChange={(e)=> {setAddContact(e.target.value)}} placeholder='Enter Username or UserID ' className='outline-none bg-slate-600 px-2 py-1.5 rounded-2xl w-[300px] sm:w-[500px]' />
            <button type="submit" className='bg-cyan-400 text-white rounded-xl px-4 py-2 text-center cursor-pointer '>Add</button>
        </form>
    </div>
  )
}

export default AddContact
