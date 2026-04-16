import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link} from 'react-router-dom'
import api from '../../lib/api'

export default function CoursesDashboard(){
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchCourses() {
        setLoading(true)
        try{
            const res = await api.get('/courses')
            setCourses(res.data.courses)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCourses()
    }, [])

    async function handleDelete(id) {
        setLoading(true)
        try{
            await api.delete(`/courses/${id}`)
            fetchCourses()
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full overflow-hidden">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Courses Dashboard</h1>
                        <div>
                            <div className='flex justify-end'>
                                <Link to={'/createcourses'} className='flex justify-center items-center w-24 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '>Create</Link>
                            </div>
                        </div>
                        {loading ? <div>Loading...</div> : 
                        <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                            <table className='w-full text-[#3f454c]'>
                                <thead className=''>
                                    <tr >
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Name</th>
                                        <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course,index)=>(
                                        <tr key={course.id}>
                                            <td className='border-e border-[#A3BAC2] border-b p-2 w-15 '>{index+1}</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{course.name}</td>
                                            <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                                <div className='flex justify-center items-center gap-5'>
                                                    <Link to={`/editcourses/${course.id}`} className='flex justify-center items-center w-24 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Edit</Link>
                                                    <button className='flex justify-center items-center w-24 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(course.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        }
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}