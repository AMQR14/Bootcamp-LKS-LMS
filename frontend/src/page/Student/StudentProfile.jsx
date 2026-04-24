import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import StudentDashboardLayout from '../../layouts/StudentDashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../lib/api'

export default function StudentProfile(){
    const [form, setForm] = useState({
        name: '',
        email: '',
        nis: '',
        nisn: '',
        nik: '',
        date_of_birth: '',
        workshop_id: '',
        // password: '',
        role: 'student',
    })
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState({})
    const {id} = useParams()
    const [userid, setUserid] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchUser() {
            setLoading(true)
            try{
                const res = await api.get(`/users/${id}`)
                setUserid(res.data.user.student.id)
                setForm(res.data.user.student)
                console.log(res.data.user.student)    
            }finally{
                setLoading(false)
            }
        }
        fetchUser()
    }, [userid])


    async function handleSubmit(e) {
        e.preventDefault()
        setError({})
        setSaving(true)
        try{
            console.log(userid)
            await api.put(`/students/${userid}`, {
                name: form.name,
                email: form.email,
                nis: form.nis,
                nisn: form.nisn,
                nik: form.nik,
                date_of_birth: form.date_of_birth,
                workshop_id: form.workshop_id,
                // password: form.password,
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
        <StudentDashboardLayout>
            <main className="flex">
                    <div className="m-8 md:mx-20 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Profile</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                            <form action="" className='p-4 rounded-xl shadow-md h-full w-full lg:w-190' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-3'>
                                        <label htmlFor="" className='font-bold'>Profile Picture:</label>
                                        <div className='flex gap-8 items-center flex-col sm:flex-row'>
                                            <div className='w-27 h-27 bg-gray-300 rounded-full'></div>
                                            <input type="file" className="block text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-[#7098a4] file:transition-all file:bg-[#60848f]" />   
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Name:</label>
                                        <input type="text" value={loading? 'Loading...' : form.name} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, name:e.target.value})}/>
                                        {error.name && <p className='text-red-500'>{error.name[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Email:</label>
                                        <input type="text" value={loading? 'Loading...' : form.email} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, email:e.target.value})}/>
                                        {error.email && <p className='text-red-500'>{error.email[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIS:</label>
                                        <input type="text" value={loading? 'Loading...' : form.nis} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, nis:e.target.value})}/>
                                        {error.nis && <p className='text-red-500'>{error.nis[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NISN:</label>
                                        <input type="text" value={loading? 'Loading...' : form.nisn} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, nisn:e.target.value})}/>
                                        {error.nisn && <p className='text-red-500'>{error.nisn[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIK:</label>
                                        <input type="text" value={loading? 'Loading...' : form.nik} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, nik:e.target.value})}/>
                                        {error.nik && <p className='text-red-500'>{error.nik[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Date of Birth:</label>
                                        <input type="text" value={loading? 'Loading...' : form.date_of_birth} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, date_of_birth:e.target.value})}/>
                                        {error.date_of_birth && <p className='text-red-500'>{error.date_of_birth[0]}</p>}
                                    </div>
                                    {/* <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Password:</label>
                                        <input type="text" value={form.password} placeholder='Enter password' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, password:e.target.value})}/>
                                        {error.password && <p className='text-red-500'>{error.password[0]}</p>}
                                    </div> */}
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
        </StudentDashboardLayout>
    )
}