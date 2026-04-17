import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link} from 'react-router-dom'
import api from '../../lib/api'
import { Delete, DeleteIcon, Edit, Eye, EyeIcon, Plus, Trash } from 'lucide-react'

export default function TeachersDashboard(){
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchTeachers() {
        setLoading(true)
        try{
            const res = await api.get('/teachers')
            setTeachers(res.data.teachers)
            console.log(res.data)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{        
        fetchTeachers()
    }, [])

    async function handleDelete(id) {
        try{
            await api.delete(`/teachers/${id}`)
            fetchTeachers()
        }finally{

        }
    }

    return (
        <DashboardLayout>
            <main className="flex">
                    <div className="m-8 md:mx-20 w-full overflow-hidden">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Teachers Dashboard</h1>
                        <div>
                            <div className='flex justify-end'>
                                <Link to={'/admin/dashboard/teachers/create'} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><Plus className='size-7 stroke-2'/></Link>
                            </div>
                        </div>
                        {
                            loading ? 
                            <div>Loading...</div>:
                            <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                                <table className='min-w-200 w-full text-[#3f454c]'>
                                    <thead className=''>
                                        <tr >
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Name</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>NIK</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2] text-nowrap'>Date of Birth</th>
                                            <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2] text-nowrap'>Class</th>
                                            <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teachers.map((teacher, index)=>(
                                            <tr key={teacher.id}>
                                                <td className='border-e border-[#A3BAC2] border-b p-2 '>{index+1}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2'>{teacher.name}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2'>{teacher.nik}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2 text-nowrap'>{teacher.date_of_birth}</td>
                                                <td className='border-e border-[#A3BAC2] border-b p-2 text-nowrap'>{teacher.workshop.name}</td>
                                                <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                                    <div className="flex justify-center items-center gap-3">
                                                        <Link to={`/admin/dashboard/teachers/${teacher.id}/detail`} className='flex justify-center items-center w-10 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'><Eye/></Link>
                                                        <Link to={`/admin/dashboard/teachers/${teacher.id}/edit`} className='flex justify-center items-center w-10 h-8 bg-[#5ca3b8] hover:bg-[#66b2c9] transition-all text-white font-semibold rounded-md'><Edit/></Link>
                                                        <button className='flex justify-center items-center w-10 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(teacher.id)}><Trash/></button>
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