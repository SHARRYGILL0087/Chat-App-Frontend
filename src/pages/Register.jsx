import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { use } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { GlobalState } from '../GlobalStates'

const Register = () => {
  const navigate = useNavigate()
  const states = useContext(GlobalState)
  const [refresh , setRefresh] = states.refresh
  const [dataform, setDataform] = useState({ email: '', firstname: '', lastname: '', username: '', password: '' })
  const checkbox = useRef(null)
  const handleChange = (e) => {
    const { name, value } = e.target
    setDataform(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/user/register', { ...dataform }, { withCredentials: true })
      console.log("result -> ", res.data)
      localStorage.setItem('accessToken', res.data?.accessToken)
      localStorage.setItem('refreshToken', res.data?.refreshToken)
      setDataform({ email: '', firstname: '', lastname: '', username: '', password: '' })
      checkbox.current.checked = false
      toast('Registered Successfully!')
      setRefresh(!refresh)
    } catch (error) {
      console.log('Error while Registering!', error.message)
    }
  }


  return (
    <div className='bg-slate-800 sm:bg-[#141414] text-white flex justify-center items-center min-h-screen '>
      <Toaster position="top-right" />
      <div className='text-2xl font-bold absolute top-1 left-2 cursor-pointer'>
        <Link to={'/'}>
          <span className='text-purple-700'>{`<`}</span>Deku/<span className='text-slate-600'>{`>`}</span>
        </Link>
      </div>
      <div className='flex flex-col rounded-xl px-5 py-7 bg-slate-800 w-full sm:w-[450px] min-h-80'>
        <h1 className='font-semibold text-2xl mb-5'>Create an account</h1>
        <form onSubmit={handleSubmit} >
          <label className='block tracking-tight'>
            Your email
          </label>
          <input type="email" onChange={handleChange} name='email' value={dataform.email} className='outline-none px-2.5 py-1.5 bg-slate-600 rounded-lg w-full' placeholder='name@company.com' required />
          <div className='flex sm:flex-row flex-col gap-3 my-2'>
            <div>
              <label className='block tracking-tight' >First Name</label>
              <input type="text" onChange={handleChange} name='firstname' value={dataform.firstname} className='outline-none px-2.5 py-1.5 bg-slate-600 rounded-lg w-full ' placeholder='John' required />
            </div>
            <div>
              <label className='block tracking-tight' >Last Name</label>
              <input type="text" onChange={handleChange} name='lastname' value={dataform.lastname} className='outline-none px-2.5 py-1.5 bg-slate-600 rounded-lg w-full ' placeholder='Doe' required />
            </div>
          </div>

          <label className='block tracking-tight'>
            Username
          </label>
          <input type="text" onChange={handleChange} name='username' value={dataform.username} className='outline-none px-2.5 py-1.5 bg-slate-600 rounded-lg w-full' placeholder='xyz_1234' required />

          <label className='block tracking-tight mb-3'>
            Password
          </label>
          <input type="password" onChange={handleChange} name='password' value={dataform.password} className='outline-none px-2.5 py-1.5 bg-slate-600 rounded-lg w-full' placeholder='********' required />
          <div  >
            <div className='flex gap-3 mt-3'>
              <input ref={checkbox} type="checkbox" className='cursor-pointer' required />
              <p>I accept the <span className='text-blue-500'>Terms and Conditions</span></p>
            </div>
            <button type='submit' className='w-full text-center py-2 rounded-lg bg-blue-400 cursor-pointer my-2.5 hover:bg-blue-500'>Sign up</button>
            <div className='text-sm text-center mt-4'>
              Already have an account?<Link to={'/login'}><span className='text-blue-600 px-1'>Login here</span></Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
