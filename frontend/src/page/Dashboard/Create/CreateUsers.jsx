import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import api from '../../../lib/api'

export default function CreateUsers(){
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: 'Admin',
    })
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({})

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setError({})
        setLoading(true)
        try{
            await api.post('/users', {
                email: form.email,
                password: form.password,
                role: form.role,
            })
            console.log('hello')
            navigate('/dashboardusers')
        }catch(err){
            if(err.response?.status == 422){
                setError(err.response.data.errors)
            }
            
        }finally{
            setLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <main className="flex">
                    <div className="m-8 md:mx-20 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Create Users</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                            <form action="" className='p-4 rounded-xl shadow-md h-full w-full' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Email:</label>
                                        <input type="text" placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={  e=>  setForm({...form, email:e.target.value})}/>
                                        {error.email && <p className='text-red-500'>{error.email[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Password:</label>
                                        <input type="text" placeholder='Enter password' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e=> setForm({...form, password:e.target.value})}/>
                                        {error.password && <p className='text-red-500'>{error.password[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Role:</label>
                                        <select name="" id="" value={form.role} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e=> setForm({...form, role: e.target.value})}>
                                            <option value="" disabled> Select Role </option>
                                            <option value="Admin" className='rounded-2xl'>Admin</option>
                                        </select>
                                        {error.role && <p className='text-red-500'>{error.role[0]}</p>}
                                    </div>
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={loading} >{loading ? 'Creating...' : 'Create'}</button>
                                </div>
                            </form>
                            <div className='w-full h-auto border-5 border-dashed border-[#E0E8EB] rounded-2xl flex justify-center items-center hover:border-[#c8ced1] transition-all text-[#E0E8EB] hover:text-[#c8ced1]'>
                                <Plus size={200} className=''/>
                            </div>
                        </div>
                    </div>
                </main>
        </DashboardLayout>
    )
}