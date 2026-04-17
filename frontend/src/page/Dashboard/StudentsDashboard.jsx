import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link} from 'react-router-dom'
import api from '../../lib/api'
import { Delete, Edit, Plus, Trash } from 'lucide-react'

export default function StudentsDashboard(){
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchAllStudents() {
        setLoading(true)
        try{
            const res = await api.get('/students')
            setStudents(res.data.students)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllStudents()
    }, [])

    async function handleDelete(id) {
        setLoading(true)
        try{
            await api.delete(`/students/${id}`)
            fetchAllStudents()
        }finally{
            setLoading(false)
        }
    }

    return (
            <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full overflow-hidden">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Students Dashboard</h1>
                        <div>
                            <div className='flex justify-end'>
                                <Link to={'/admin/dashboard/students/create'} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><Plus className='size-7 stroke-2'/></Link>
                            </div>
                        </div>
                        {loading ? <div>Loading....</div> :
                            <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                                <table className='w-full text-[#3f454c]'>
                                    <thead className=''>
                                        <tr>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Name</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Email</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>NIS</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>NISN</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>NIK</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2] text-nowrap'>Date of Birth</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2] text-nowrap'>Joined At</th>
                                            <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {students.map((student, index)=>(
                                            <tr key={student.id}> 
                                                <td className='border-e border-[#A3BAC2] border-b p-2'>{index+1}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2'>{student.name}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2'>{student.email}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2'>{student.nis}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2'>{student.nisn}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2'>{student.nik}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2 text-nowrap'>{student.date_of_birth}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2 text-nowrap'>{student.joined_at}</td>
                                                <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                                    <div className="flex justify-center items-center gap-3">
                                                        <Link to={`/admin/dashboard/students/${student.id}/edit`} className='flex justify-center items-center w-10 h-8 bg-[#5ca3b8] hover:bg-[#66b2c9] transition-all text-white font-semibold rounded-md'><Edit/></Link>
                                                        <button className='flex justify-center items-center w-10 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(student.id)}><Trash/></button>
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