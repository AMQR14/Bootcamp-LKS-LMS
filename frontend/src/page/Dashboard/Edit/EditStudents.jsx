import { useEffect, useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import {Link, useNavigate, useParams} from 'react-router-dom'
import api from '../../../lib/api'

export default function EditTeachers(){
    const [form , setForm] = useState({
        name: '',
        email: '',
        nis: '',
        nisn: '',
        nik: '',
        date_of_birth: '',
        workshop_id: '',
    })
    const [classes, setClasses] = useState([])
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const {id} = useParams()

    async function fetchClass() {
        try{
            const res = await api.get('/workshops')
            setClasses(res.data.classes)
        }finally{
            setLoading(false)
        }
    }

    async function fetchStudent() {
        try{
            const res = await api.get(`/students/${id}`)
            setForm(res.data.student)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchClass()
        fetchStudent()
    },[])

    async function handleSubmit(e) {
        e.preventDefault()
        setError({})
        setSaving(true)
        try{
            await api.put(`/students/${id}`, {
                name: form.name,
                email: form.email,
                nis: form.nis,
                nisn: form.nisn,
                nik: form.nik,
                date_of_birth: form.date_of_birth,
                workshop_id: form.workshop_id,
            })
            navigate('/admin/dashboard/students')
        }catch(err){
            if(err.response.status == 422){
                setError(err.response.data.errors)
            }
        }finally{
            setSaving(false)
        }
    }

    const navigate = useNavigate()

    return (
        <>
            <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full md:w-150">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Edit Students</h1>
                        <div className='my-6 text-[#3f454c]'>
                        <form action="" className='p-4 rounded-xl shadow-md h-full w-full' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Name:</label>
                                        <input type="text" value={loading ? 'Loading...' : form.name} placeholder='Enter name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, name:e.target.value})}/>
                                        {error.name && <p className='text-red-500'>{error.name[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Email:</label>
                                        <input type="text" value={loading ? 'Loading...' : form.email} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, email:e.target.value})}/>
                                        {error.email && <p className='text-red-500'>{error.email[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIS:</label>
                                        <input type="text" value={loading ? 'Loading...' : form.nis} placeholder='Enter NIS' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, nis:e.target.value})}/>
                                        {error.nis && <p className='text-red-500'>{error.nis[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NISN:</label>
                                        <input type="text" value={loading ? 'Loading...' : form.nisn} placeholder='Enter NISN' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, nisn:e.target.value})}/>
                                        {error.nisn && <p className='text-red-500'>{error.nisn[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIK:</label>
                                        <input type="text" value={loading ? 'Loading...' : form.nik} placeholder='Enter NIK' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, nik:e.target.value})}/>
                                        {error.nik && <p className='text-red-500'>{error.nik[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Class:</label>
                                        <select name="" value={loading ? 'Loading... ' : form.workshop_id} id="" className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, workshop_id:e.target.value})}>
                                            {classes.map((classe)=>(
                                                <option key={classe.id} value={classe.id}>{classe.name}</option>
                                            ))}
                                        </select>
                                        {error.workshop_id && <p className='text-red-500'>{error.workshop_id[0]}</p>}
                                    </div>
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={saving}>{saving? 'Saving...' : 'Edit'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}