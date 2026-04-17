import { useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export default function Login(){
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const {login} = useAuth()
    

    async function handleLogin(e) {
        e.preventDefault()
        setError('')

            try{
                await login(form.email, form.password)
                navigate('/dashboard')
            }catch(err){
                if(err.response.status == 401){
                    setError(err.response.data.message || 'Failed to login')
                    console.log(error)
                }
            }
    }

    return (
        <div>
            <main>
                <div className="flex w-full min-h-screen justify-center ">
                    <div className="bg-[#60848f] w-1/2 min-h-screen hidden justify-center items-center md:flex">
                        <div className="max-w-150 text-center m-4">
                            <p className="text-center text-[#ffffff] font-semibold text-md">Organize your learning space</p>
                            <h1 className="font-bold text-5xl text-white">Welcome to Ipsum Learning Management System</h1>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full md:w-1/2">
                        <div className="flex flex-col max-w-110 w-full md:w-110 h-130 gap-8">
                            <div className="flex flex-col justify-center items-center">
                                <h2 className="font-bold text-3xl text-[#3f454c]">Welcome</h2>
                                <p className="text-[#7e8c9b]">Login into your account</p>

                            </div>
                            <form action="" className="flex flex-col m-5" onSubmit={handleLogin}>
                                <div className="flex flex-col w-full mb-10">
                                    <label className="text-[#3f454c] font-semibold mb-2">Email Address:</label>
                                    <input type="email" placeholder="Enter your Email" className="p-2 border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]"
                                    onChange={e=> setForm({...form, email:e.target.value})}
                                    />
                                </div>
                                <div className="flex flex-col w-full mb-9">
                                    <label className="text-[#3f454c] font-semibold mb-2">Password:</label>
                                    <input type="password" placeholder="Enter your Password" className="p-2 border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]"
                                    onChange={e=> setForm({...form, password:e.target.value})}
                                    />
                                </div>
                                <div className='text-center text-red-500 mb-9'>
                                    {error && <p>{error}</p>}
                                </div>
                                <button className="p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all" type='submit'>
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}