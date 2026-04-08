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
    const [error, setError] = useState({})
    const auth = useAuth();

    const validate = () => {
        let isValid = true;
        const newErrors = {}

        if(!form.email){
            newErrors.email = 'Email is required'
            isValid = false
        }
        // else if(form.email != auth.user.email){
        //     newErrors.email = 'Invalid email'
        //     isValid = false
        // }

        if(!form.password){
            newErrors.password = 'password is required'
            isValid = false
        }
        // else if(form.password != auth.user.password){
        //     newErrors.password = 'Invalid password'
        //     isValid = false
        // }

        setError(newErrors)
        console.log(form)
        console.log(error)
        return isValid;
    }

    async function handleLogin(e) {
        e.preventDefault()
        setError('')

        if(validate()){
            try{
                await auth.login(form.email, form.password)
                navigate('/dashboard')
            }catch(err){
                setError(err.response?.data?.message || 'Failed to login')
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
                    <div className="flex justify-center items-center md:w-1/2">
                        <div className="flex flex-col w-110 h-130 gap-8">
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
                                    {error.email && <div className='text-red-500'>{error.email}</div>}
                                </div>
                                <div className="flex flex-col w-full mb-14">
                                    <label className="text-[#3f454c] font-semibold mb-2">Password:</label>
                                    <input type="password" placeholder="Enter your Password" className="p-2 border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]"
                                    onChange={e=> setForm({...form, password:e.target.value})}
                                    />
                                    {error.password && <div className='text-red-500'>{error.password}</div>}
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