import { useEffect, useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import {Link, useNavigate, useParams} from 'react-router-dom'
import api from '../../../lib/api'

export default function EditCourses(){
    const[form, setForm] = useState({
            name: ''
        })
        const[error, setError] = useState({})
        const[loading, setLoading] = useState(true)
        const[saving, setSaving] = useState(false)
        const navigate = useNavigate()
        const {id} = useParams()
    
        useEffect(()=>{
            async function fetchCourse() {
                try{
                    const res = await api.get(`/courses/${id}`)
                    setForm(res.data.course)
                }finally{
                    setLoading(false)
                }
            }
            fetchCourse()
        }, [])

        async function handleSubmit(e) {
            e.preventDefault()
            setError({})
            setSaving(true)
            try{
                await api.put(`/courses/${id}`, {
                    name: form.name
                })
                navigate('/coursesdashboard')
            }catch(err){
                if(err.response.status == 422){
                    setError(err.response.data.errors)
                }
            }finally{
                setSaving(false)
            }
        }

    return (
        <>
            <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full md:w-150">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Edit Course</h1>
                        <div className='my-6 text-[#3f454c]'>
                            <form action="" className='p-4 rounded-xl shadow-md h-full w-full' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Course:</label>
                                        <input type="text" value={loading? 'loading...' : form.name} placeholder='Enter course name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, name:e.target.value})}/>
                                        {error.name && <p className='text-red-500'>{error.name[0]}</p>}
                                    </div>
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={saving}>{saving ? 'Saving...' : 'Edit'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}