import React, { useContext, useState } from 'react'
import { data, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { GlobalState } from '../GlobalStates'


const Login = () => {
    const navigate = useNavigate()
    const states  = useContext(GlobalState)
    const [refresh,setRefresh] = states.refresh
    const [dataform, setDataform] = useState({ id: '', password: '' })
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
            const res = await axios.post('https://chat-app-backend-ojv8.onrender.com/user/login', { ...dataform }, { withCredentials: true })
           
            console.log("result -> ", res.data)

            localStorage.setItem('accessToken' , res.data?.accessToken)
            localStorage.setItem('refreshToken' , res.data?.refreshToken)
            
            setDataform({ email: '', password: '' })
            toast('Login Successfully!')
            setRefresh(!refresh)
        } catch (error) {
            console.log(error.response?.data?.msg)
            toast(error.response?.data?.msg)
        }
    }


    return (
        <div className='bg-slate-800 md:bg-[#141414] text-white flex justify-center items-center min-h-screen '>
            <Toaster position="top-right" />
            <div className='text-2xl font-bold absolute top-1 left-2 cursor-pointer'>
                <Link to={'/'}>
                    <span className='text-purple-700'>{`<`}</span>Deku/<span className='text-slate-600'>{`>`}</span>
                </Link>
            </div>
            <div className='flex flex-col md:rounded-xl px-5 py-7 bg-slate-800 md:w-[450px] h-full w-full md:min-h-80'>
                <h1 className='font-semibold text-2xl mb-5'>Sign in to your account</h1>
                <form onSubmit={handleSubmit} >
                    <label className='block tracking-tight mb-3'>
                        Your email or Username
                    </label>
                    <input type="text" name='id' onChange={handleChange} value={dataform.id} className='outline-none px-2.5 py-1.5 bg-slate-600 rounded-lg w-full' placeholder='name@company.com or xyz_1234' required />
                    <label className='block tracking-tight mb-3'>
                        Password
                    </label>
                    <input type="password" name='password' onChange={handleChange} value={dataform.password} className='outline-none px-2.5 py-1.5 bg-slate-600 rounded-lg w-full' placeholder='********' required />
                    <div  >
                        <Link className='text-blue-600 text-sm py-4 cursor-pointer' to={'#'}>Forgot Password?</Link>
                        <button type='submit' className='w-full text-center py-2 rounded-lg bg-blue-400 cursor-pointer my-2.5 hover:bg-blue-500'>Sign in</button>
                        <div className='text-sm text-center mt-4'>
                            New to this site?<Link to={'/register'}><span className='text-blue-600 px-1'>Register</span></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
