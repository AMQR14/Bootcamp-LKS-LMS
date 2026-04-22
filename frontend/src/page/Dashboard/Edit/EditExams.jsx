import DashboardLayout from '../../../layouts/DashboardLayout'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Plus} from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../../../lib/api'

export default function CreateExams(){
    const {classid, courseid, examid} = useParams() 
    const[form, setForm] = useState({
        name: '',
        course_id: ``,
        start_time: '',
        end_start_time: ''
    })
    const [workshops, setWorkshops] = useState([])
    const [courses, setCourses] = useState([])
    const[error, setError] = useState({})
    const[loading, setLoading] = useState(false)
    const[saving, setSaving] = useState(false)
    const navigate = useNavigate()
    const [workshopid, setWorkshopId] = useState(classid)
    const [exam, setExam] = useState([])

    const getWorkId = (e) =>{
        setWorkshopId(e.target.value)
        console.log(workshopid)
    }

    async function fetchExam() {
        setLoading(true)
        try{
            const res = await api.get(`/exams/${examid}`)
            setForm(res.data.exam)
            console.log(res.data.exam)
        }finally{
            setLoading(false)
        }
    }

    async function fetchClass() {
        const res = await api.get('/workshops')
        setWorkshops(res.data.classes)
        // console.log(res.data.classes)
    }

    async function fetchCourse() {
        const res = await api.get(`/workshops/${workshopid}`)
        setCourses(res.data.class.courses)
    }

    useEffect(()=>{
        fetchClass();
    }, [])

    useEffect(()=>{
        fetchExam();
    }, [])
    
    useEffect(()=>{
        if(workshopid){
            fetchCourse();
        }
    }, [workshopid])

    async function handleSubmit(e) {
        e.preventDefault()
        setError({})
        setSaving(true)
        try{
            await api.put(`/exams/${examid}`, {
                name:form.name,
                course_id: form.course_id,
                start_time:form.start_time,
                end_time:form.end_time
            })
            navigate(`/admin/dashboard/exams`)
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
                    <div className="m-8 md:mx-20 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Edit Exam</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                            <form action="" className='p-4 rounded-xl shadow-md h-full w-full' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Name:</label>
                                        <input type="text" value={loading ? 'Loading...' : form.name} placeholder='Enter exam name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, name:e.target.value})}/>
                                        {error.name && <p className='text-red-500'>{error.name[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Start Time:</label>
                                        <input type="time" value={form.start_time} placeholder='Enter description' step={1} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, start_time:e.target.value})}/>
                                        {error.start_time && <p className='text-red-500'>{error.start_time[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>End Time:</label>
                                        <input type="time" value={form.end_time} placeholder='Enter description' step={1} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, end_time:e.target.value})}/>
                                        {error.end_time && <p className='text-red-500'>{error.end_time[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Class:</label>
                                        <select name="" id="" className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' value={workshopid} onChange={getWorkId}>
                                                <option value="" disabled>Select Class</option>
                                            {workshops.map((workshop)=>(
                                                <option value="" key={workshop.id} value={workshop.id}>{workshop.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {workshopid == '' ? '' :
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="" className='font-bold'>Course:</label>
                                            <select name="" id="" value={form.course_id} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, course_id:e.target.value})}>
                                                <option value="">{courses.length == 0 ? 'Class have no course' : 'Select course'}</option>
                                                {courses.map((course)=>(
                                                    <option value={course.id} key={course.id}>{course.name}</option>
                                                ))}
                                            </select>
                                            {error.course_id && <p className='text-red-500'>{error.course_id[0]}</p>}
                                        </div>
                                    }
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                                </div>
                            </form>
                            <div className='w-full border-5 border-dashed border-[#E0E8EB] rounded-2xl flex justify-center items-center hover:border-[#c8ced1] transition-all text-[#E0E8EB] hover:text-[#c8ced1]'>
                                <Plus size={200} className=''/>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}