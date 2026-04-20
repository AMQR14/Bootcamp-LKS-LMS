import DashboardLayout from '../../layouts/DashboardLayout'
import {Link, useParams} from 'react-router-dom'
import api from '../../lib/api'
import { useEffect, useState } from 'react'
import { Edit, MoveLeft, Plus, Trash } from 'lucide-react'

export default function ExamsDashboard(){
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(false)
    const {classid, courseid, examid} = useParams()

    async function fetchClases() {
        setLoading(true)
        try{
            const res = await api.get(`/courses/${courseid}`)
            setExams(res.data.course.exam)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchClases()
    }, [])

    async function handleDelete(id) {
        setLoading(true)
        try{
            await api.delete(`/exams/${id}`)
            fetchClases()
        }finally{
            setLoading(false)
        }
    }

    return (
        <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full overflow-hidden">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Exams Dashboard</h1>
                        <div>
                            <div className='flex justify-end gap-2'>
                                <Link to={`/admin/dashboard/classes/${classid}/courses`} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                                <Link to={'/admin/dashboard/exams/create'} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><Plus className='size-7 stroke-2'/></Link>
                            </div>
                        </div>
                        {loading ? <div>Loading...</div> : exams == null ? <div className='text-[#5a767f] font-semibold text-md bg-[#e0e8eb] mt-6 rounded-xl p-4 border border-[#b2cbd3]'>There is no exams</div> :
                        <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                            <table className='w-full text-[#3f454c]'>
                                <thead className='text-[#5a767f] bg-[#e0e8eb]'>
                                    <tr >
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Name</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Start Time</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>End Time</th>
                                        <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr key={exams.id}>
                                            <td className='border-e border-[#A3BAC2] border-b p-2 w-15 '>1</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{exams.name}</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{exams.start_time}</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{exams.end_time}</td>
                                            <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                                <div className='flex justify-center items-center gap-3'>
                                                    <Link to={`/admin/dashboard/exams/${exams.id}/edit`} className='flex justify-center items-center w-10 h-8 bg-[#5ca3b8] hover:bg-[#66b2c9] transition-all text-white font-semibold rounded-md'><Edit/></Link>
                                                    <button className='flex justify-center items-center w-10 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(exam.id)}><Trash/></button>
                                                </div>
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                        }
                    </div>
                </main>
        </DashboardLayout>    
    )
}