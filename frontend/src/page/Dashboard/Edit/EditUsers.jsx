import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../../../lib/api'

export default function EditUsers(){
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: '',
    })
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        async function fetchUser() {
            try{
                const res = await api.get(`/users/${id}`)
                setForm(res.data.user)
            }finally{
                setLoading(false)
                console.log(loading)
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
                role: form.role
            })
            navigate('/admin/dashboard/users')
        }catch(err){
            if(err.response?.status == 422){
                setError(err.response.data.errors)
            }
        }finally{
            setSaving(false)
        }
    }

    return (
        <DashboardLayout>
            <main className="flex">
                    <div className="m-8 md:mx-20 w-full md:w-150">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Edit Users</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                        <form action="" className='p-4 rounded-xl shadow-md h-full w-full' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Email:</label>
                                        <input type="text" value={loading ? 'loading...' : form.email} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={  e=>  setForm({...form, email:e.target.value})}/>
                                        {error.email && <p className='text-red-500'>{error.email[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Password:</label>
                                        <input type="text" value={form.password} placeholder='Enter password' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e=> setForm({...form, password:e.target.value})}/>
                                        {error.password && <p className='text-red-500'>{error.password[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Role:</label>
                                        <select name="" id="" value={form.role} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e=> setForm({...form, role: e.target.value})}>
                                            <option value="" disabled> Select Role </option>
                                            <option value="admin" className=''>Admin</option>

                                        </select>
                                        {error.role && <p className='text-red-500'>{error.role[0]}</p>}
                                    </div>
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={saving} >{saving ? 'Saving...' : 'Edit'}</button>
                                </div>
                            </form>                            
                        </div>
                    </div>
                </main>
        </DashboardLayout>
    )
}