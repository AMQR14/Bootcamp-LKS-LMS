import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link} from 'react-router-dom'
import api from '../../lib/api'

export default function UserDashboard(){
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchAllUsers() {
        setLoading(true)
        try{
            const res = await api.get('/users')
            setUsers(res.data.users)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllUsers()
    }, [])

    async function handleDelete(id) {
        try{
           await api.delete(`/users/${id}`)
           fetchAllUsers();
        }finally{

        }   
    }

return (
        <DashboardLayout>
            <main className="flex">
                    <div className="m-8 md:mx-20 w-full overflow-hidden">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Users Dashboard</h1>
                        <div>
                            <div className='flex justify-end'>
                                <Link to={'/createusers'} className='flex justify-center items-center w-24 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '>Create</Link>
                            </div>
                        </div>
                        {loading ? 
                            <div>Loading...</div>
                        :
                        <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                            <table className='min-w-200 w-full text-[#3f454c]'>
                                <thead className=''>
                                    <tr >
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>email</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>role</th>

                                        <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) =>(
                                        <tr key={user.id}>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 '>{index+1}</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>{user.email}</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>{user.role}</td>
                                        <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                            <div className="flex justify-center items-center gap-5">
                                            <Link to={`/editusers/${user.id}`} className='flex justify-center items-center w-24 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Edit</Link>
                                            <button className='flex justify-center items-center w-24 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(user.id)}>Delete</button>
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