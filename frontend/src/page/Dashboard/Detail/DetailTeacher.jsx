import { useEffect, useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import api from '../../../lib/api'
import { useParams } from 'react-router-dom'
import { AlignLeft, ArrowBigLeft, ArrowLeft, ArrowLeftCircle, ArrowLeftToLine, MouseLeft, MoveLeft, MoveLeftIcon } from 'lucide-react'
import {Link} from 'react-router-dom'

export default function DetailTeachers(){
    const [datas, setDatas] = useState([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    const fetchData = async () => {
        try{
            const res = await api.get(`/teachers/${id}`)
            setDatas(res.data.teacher)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    }, [])

    return (
        <DashboardLayout>
            <main className="flex">
                    <div className="m-8 md:mx-20 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Detail Teacher</h1>
                        <div>
                            <div className='flex justify-end'>
                                <Link to={'/admin/dashboard/teachers'} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 w-full  mt-6  rounded-xl p-8 text-[#3f454c] border-[#A3BAC2] border-2'>
                                <div className='flex gap-1 bg-gray-100 p-3 px-5 rounded-md flex-col'>
                                    <label className='font-semibold text-sm'>Name :</label>
                                    <p className=''>{loading ? 'Loading...' : datas.name}</p>
                                </div>

                                <div className='flex gap-1 bg-gray-100 p-3 px-5 rounded-md flex-col'>
                                    <label className='font-semibold text-sm'>Email :</label>
                                    <p>{loading ? 'Loading...' : datas.email}</p>
                                </div>
                                
                                <div className='flex gap-1 bg-gray-100 p-3 px-5 rounded-md flex-col'>
                                    <label className='font-semibold text-sm'>NIP :</label>
                                    <p>{loading ? 'Loading...' : datas.nip}</p>
                                </div>

                                <div className='flex gap-1 bg-gray-100 p-3 px-5 rounded-md flex-col'>
                                    <label className='font-semibold text-sm'>NIK :</label>
                                    <p>{loading ? 'Loading...' : datas.nik}</p>
                                </div>

                                <div className='flex gap-1 bg-gray-100 p-3 px-5 rounded-md flex-col'>
                                    <label className='font-semibold text-sm'>NIDN :</label>
                                    <p>{loading ? 'Loading...' : datas.nidn}</p>
                                </div>

                                <div className='flex gap-1 bg-gray-100 p-3 px-5 rounded-md flex-col'>
                                    <label className='font-semibold text-sm'>Date of Birth :</label>
                                    <p>{loading ? 'Loading...' : datas.date_of_birth}</p>
                                </div>
                                
                                <div className='flex gap-1 bg-gray-100 p-3 px-5 rounded-md flex-col'>
                                    <label className='font-semibold text-sm'>Joined at :</label>
                                    <p>{loading ? 'Loading...' : datas.joined_at}</p>
                                </div>

                                <div className='flex gap-1 bg-gray-100 p-3 px-5 rounded-md flex-col'>
                                    <label className='font-semibold text-sm'>Class :</label>
                                    <p>{loading ? 'Loading...' : datas.workshop?.name}</p>
                                </div>
                        </div>
                    </div>
                </main>
        </DashboardLayout>
    )
}