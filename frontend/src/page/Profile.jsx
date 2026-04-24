import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import DashboardLayout from '../layouts/DashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api'

export default function Profile(){
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: 'admin',
    })
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchUser() {
            setLoading(true)
            try{
                const res = await api.get(`/users/${id}`)
                setForm(res.data.user)
                console.log(res.data.user)    
            }finally{
                setLoading(false)
            }
        }
        fetchUser()
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
        setError({})
        setSaving(true)
        try{
            await api.put(`/users/${id}`, {
                email: form.email,
                password: form.password,
                role: form.role,
            })
            location.reload()
        }catch(err){
            if(err.response.status == 422){
                setError(err.response.data.errors)
            }
        }finally{
            setSaving(false)
        }
    }

    return (
        <DashboardLayout>
            <main className="flex">
                    <div className="m-8 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Profile</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                            <form action="" className='p-4 rounded-xl shadow-md h-140 sm:h-125 w-full lg:w-190' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-3'>
                                        <label htmlFor="" className='font-bold'>Profile Picture:</label>
                                        <div className='flex gap-8 items-center flex-col sm:flex-row'>
                                            <div className='w-27 h-27 bg-gray-300 rounded-full'></div>
                                            <input type="file" className="block text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-[#7098a4] file:transition-all file:bg-[#60848f]" />   
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Email:</label>
                                        <input type="text" value={loading? 'Loading...' : form.email} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, email:e.target.value})}/>
                                        {error.email && <p className='text-red-500'>{error.email[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Password:</label>
                                        <input type="text" value={form.password} placeholder='Enter password' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, password:e.target.value})}/>
                                        {error.password && <p className='text-red-500'>{error.password[0]}</p>}
                                    </div>
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
        </DashboardLayout>
    )
}