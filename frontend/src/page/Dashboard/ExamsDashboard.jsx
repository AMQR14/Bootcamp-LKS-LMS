import DashboardLayout from '../../layouts/DashboardLayout'
import {Link, useParams} from 'react-router-dom'
import api from '../../lib/api'
import { useEffect, useState } from 'react'
import { Edit, Eye, MoveLeft, Plus, Trash } from 'lucide-react'

export default function ExamsDashboard(){
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchClases() {
        setLoading(true)
        try{
            const res = await api.get(`/exams`)
            setExams(res.data.exams)
            console.log(res.data.exams)
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
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Exam Dashboard</h1>
                        <div>
                            <div className='flex justify-end gap-2'>
                                <Link to={`/admin/dashboard/exams/create`} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><Plus className='size-7 stroke-2'/></Link>
                            </div>
                        </div>
                        {loading ? <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div> : exams.length == 0 ? <div className='text-[#5a767f] font-semibold text-md bg-[#e0e8eb] mt-6 rounded-xl p-4 border border-[#b2cbd3]'>There is no exams</div> :
                        <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                            <table className='w-full text-[#3f454c]'>
                                <thead className='text-[#5a767f] bg-[#e0e8eb]'>
                                    <tr >
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Name</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Start Time</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>End Time</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Class</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Course</th>
                                        <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exams.map((exam, index)=>(
                                        <tr key={exam.id}>
                                            <td className='border-e border-[#A3BAC2] border-b p-2 w-15 '>{index +1}</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{exam.name}</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{exam.start_time}</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{exam.end_time}</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{exam.course.workshop.name}</td>
                                            <td className='border-e border-[#A3BAC2] border-b p-2'>{exam.course.name}</td>
                                            <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                                <div className='flex justify-center items-center gap-3'>
                                                    <Link to={`/admin/dashboard/classes/${exam.course.workshop_id}/courses/${exam.course.id}/exams/${exam.id}/questions`} className='flex justify-center items-center w-10 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'><Eye/></Link>
                                                    <Link to={`/admin/dashboard/classes/${exam.course.workshop_id}/courses/${exam.course.id}/exams/${exam.id}/edit`} className='flex justify-center items-center w-10 h-8 bg-[#5ca3b8] hover:bg-[#66b2c9] transition-all text-white font-semibold rounded-md'><Edit/></Link>
                                                    <button className='flex justify-center items-center w-10 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(exam.id)}><Trash/></button>
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
    )
}