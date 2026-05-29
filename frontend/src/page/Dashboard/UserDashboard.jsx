import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link} from 'react-router-dom'
import api from '../../lib/api'
import { Edit, MoveLeft, MoveRight, Plus, Trash } from 'lucide-react'

export default function UserDashboard(){
    const [users, setUsers] = useState([])
    const [lastPage, setLastPage] = useState()
    const [loading, setLoading] = useState(false)

    const [page, setPage]  = useState(1)

    async function fetchAllUsers() {
        setLoading(true)
        try{
            const res = await api.get(`/users?page=${page}`)
            setUsers(res.data.users.data)
            setPage(res.data.users.current_page)
            setLastPage(res.data.users.last_page)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(page){
            fetchAllUsers()
        }
    }, [page])

    async function handleDelete(id) {
        try{
           await api.delete(`/users/${id}`)
           window.confirm('hello')
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
                                <Link to={'/admin/dashboard/users/create'} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><Plus className='size-7 stroke-2'/></Link>
                            </div>
                        </div>
                        {loading ? <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div> : users.length == 0 ? <div className='text-[#5a767f] font-semibold text-md bg-[#e0e8eb] mt-6 rounded-xl p-4 border border-[#b2cbd3]'>There is no users</div> :
                        <div className='mt-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                            <table className='min-w-200 w-full text-[#3f454c]'>
                                <thead className='text-[#5a767f] bg-[#e0e8eb]'>
                                    <tr >
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Email</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Role</th>

                                        <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) =>(
                                        <tr key={user.id}>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 '>{index+1}</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>{user.email}</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>
                                            {user.role[0].toUpperCase() + user.role.slice(1)}
                                        </td>
                                        <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                            <div className="flex justify-center items-center gap-3">
                                            <Link to={`/admin/dashboard/users/${user.id}/edit`} className='flex justify-center items-center w-10 h-8 bg-[#5ca3b8] hover:bg-[#66b2c9] transition-all text-white font-semibold rounded-md'><Edit/></Link>
                                            <button className='flex justify-center items-center w-10 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(user.id)}><Trash/></button>
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        }     
                        <div className='border-2 mt-2 border-[#A3BAC2] h-10 rounded-md flex w-fit text-[#5a767f] '>
                            <div className='h-full flex items-center w-fit px-2 bg-[#e0e8eb] hover:bg-[#cdd9de] transition-all' onClick={()=> page > 1 ? setPage(page-1) : ''}>
                                <MoveLeft/>
                            </div>
                            <div className='flex items-center'>
                                {[...Array(lastPage)].map((e,index)=>(
                                    <div className={`${page == index+1 ? 'bg-gray-100 font-semibold' : ''}  px-4 hover:bg-gray-100 transition-all h-full flex items-center`} onClick={()=> page != index+1 ? setPage(index+1) : ''}>{index+1}</div>
                                ))}
                            </div>
                            <div className='h-full flex items-center w-fit px-2 bg-[#e0e8eb] hover:bg-[#cdd9de] transition-all ' onClick={()=> setPage(page+1)}>
                                <MoveRight/>
                            </div>
                        </div>                   
                    </div>
                </main>
        </DashboardLayout>
    )
}