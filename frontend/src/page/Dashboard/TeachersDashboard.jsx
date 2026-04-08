import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link} from 'react-router-dom'
import api from '../../lib/api'

export default function TeachersDashboard(){
    const [teacher, setTeacher] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        async function fetchTeachers() {
            setLoading(true)
            try{
                const res = await api.get('/teachers')
                setTeacher(res.data)
                console.log(res.data)
            }finally{
                setLoading(false)
            }
        }
        fetchTeachers()
    }, [])

    return (
        <DashboardLayout>
            <main className="flex">
                    <div className="m-8 md:mx-20 w-full overflow-hidden">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Teachers Dashboard</h1>
                        <div>
                            <div className='flex justify-end'>
                                <Link to={'/createteachers'} className='flex justify-center items-center w-24 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '>Create</Link>
                            </div>
                        </div>
                        <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                            <table className='min-w-200 w-full text-[#3f454c]'>
                                <thead className=''>
                                    <tr >
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Name</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>NIP</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Class</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Course</th>
                                        <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 '>1</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Course</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Teacher</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Class</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Date</td>
                                        <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                            <div className="flex justify-center items-center gap-5">
                                            <Link to={'/editteachers'} className='flex justify-center items-center w-24 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Edit</Link>
                                            <button className='flex justify-center items-center w-24 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border-e border-[#A3BAC2] p-2'>2</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Course</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Teacher</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Class</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Date</td>
                                        <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                            <div className="flex justify-center items-center gap-5">
                                            <Link to={'/editteachers'} className='flex justify-center items-center w-24 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Edit</Link>
                                            <button className='flex justify-center items-center w-24 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
        </DashboardLayout>
    )
}