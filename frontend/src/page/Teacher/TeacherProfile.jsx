'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import TeacherDashboardLayout from '../../layouts/TeacherDashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../lib/api'

export default function TeacherProfile(){
    const [form, setForm] = useState({
        name: '',
        email: '',
        nip: '',
        nidn: '',
        nik: '',
        date_of_birth: '',
        workshop_id: '',
        role: 'teacher',
        profile_picture: '',
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState({})
    const [userid, setUserid] = useState('')
    const [preview, setPreview] = useState(null)
    const [formData, setFormData] = useState(null)
    const [id, setId] = useState('')
    const navigate = useNavigate()
    const {user} = useAuth()
    const BASE_URL = import.meta.env.VITE_API_URL

    useEffect(()=>{
        async function fetchUser() {
            setId(user.user.id)
            try{
                const res = await api.get(`/users/${user.user.id}`)

                if(res.data.user.teacher?.profile_picture){
                    localStorage.setItem('profile_picture', `${res.data.user.teacher.pfp}`)
                }
                
                setUserid(res.data.user.teacher.id)
                setForm(res.data.user.teacher)
                console.log(res.data.user.teacher.pfp)

                if(res.data.user.teacher.profile_picture){
                    setPreview(`${res.data.user.teacher.pfp}`)
                }
            }finally{
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    function handleFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            setFormData(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError({})
        setSaving(true)


        const data = new FormData()
        data.append('_method', 'PUT')
        data.append('name', form.name)
        data.append('email', form.email)
        data.append('nip', form.nis)
        data.append('nidn', form.nisn)
        data.append('nik', form.nik)
        data.append('date_of_birth', form.date_of_birth)
        data.append('workshop_id', form.workshop_id)
        data.append('role', form.role)
        if (formData) data.append('profile_picture', formData)

        try{
            await api.post(`/teachers/${userid}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            location.reload()
        }catch(err){
            if(err.response?.status === 422){
                setError(err.response.data.errors)
            }
        }finally{
            setSaving(false)
        }
    }

    const profilePicSrc = preview 
        ? preview 
        : form.profile_picture 
            ? `${BASE_URL}/storage/profile_pictures/${form.profile_picture}` 
            : null

    return (
        <TeacherDashboardLayout>
            <main className="flex">
                    <div className="m-8 md:mx-20 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Profile</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                            <form action="" className='p-4 rounded-xl shadow-md h-full w-full lg:w-190' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                        <div className='flex gap-8 items-center flex-col sm:flex-row'>
                                            <div className='w-27 h-27 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center'>
                                                {profilePicSrc 
                                                    ? <img src={profilePicSrc} alt="Profile" className="w-full h-full object-cover" />
                                                    : <span className='text-gray-500 text-xs'>No Photo</span>
                                                }
                                            </div>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                className="block text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-white file:transition-all file:bg-[#60848f] hover:file:bg-[#7098a4]" 
                                                onChange={handleFileChange}
                                            />
                                            {error.profile_picture && <p className='text-red-500'>{error.profile_picture[0]}</p>}
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
                                        <label htmlFor="" className='font-bold'>NIP:</label>
                                        <input type="text" value={loading? 'Loading...' : form.nip} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, nip:e.target.value})}/>
                                        {error.nip && <p className='text-red-500'>{error.nip[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIDN:</label>
                                        <input type="text" value={loading? 'Loading...' : form.nidn} placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, nidn:e.target.value})}/>
                                        {error.nidn && <p className='text-red-500'>{error.nidn[0]}</p>}
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
        </TeacherDashboardLayout>
    )
}