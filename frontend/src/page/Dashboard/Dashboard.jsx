import { useEffect, useState } from 'react'
import Dashboardlayout from '../../layouts/DashboardLayout'
import api from '../../lib/api'
import Chart from 'chart.js/auto'
import StatsChart from '../../components/StatsChart'

export default function Dashboard(){
    const [stats, setStats] = useState([])
    const [students, setStudents] = useState([]) 

    useEffect(()=>{
        async function fetchStats() {
            const res = await api.get('/stats')
            setStats(res.data.stats)

            const resS = await api.get('/stats/students-by-year')
            setStudents(resS.data)
            console.log(resS.data)
        }
        fetchStats()
    }, [])

    return (
        <Dashboardlayout>
            <main className="flex ">
                <div className="m-8 md:mx-20  w-full ">
                    <h1 className='font-bold text-2xl text-[#3f454c]'>Dashboard</h1>
                    <div className='flex gap-6 flex-col'>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
                            <div className="w-full h-full bg-[#E0E8EB] rounded-xl border border-[#b2cbd3] items-center justify-center">
                                <div className='flex flex-col m-5 gap-5'> 
                                    <h1 className='text-[#3f454c] font-bold text-xl bg-white w-full text-center rounded-md p-2'>Users</h1>
                                    <p className='text-[#3f454c] font-bold text-xl bg-white w-full text-center rounded-md p-2'>{stats.users}</p>
                                </div>
                            </div>
                            <div className="w-full h-full bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]">
                                <div className='flex flex-col m-5 gap-5'> 
                                    <h1 className='text-[#3f454c] font-bold text-xl bg-white w-full text-center rounded-md p-2'>Teachers</h1>
                                    <p className='text-[#3f454c] font-bold text-xl bg-white w-full text-center rounded-md p-2'>{stats.teachers}</p>
                                </div>
                            </div>
                            <div className="w-full h-full bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]">
                                <div className='flex flex-col m-5 gap-5'> 
                                    <h1 className='text-[#3f454c] font-bold text-xl bg-white w-full text-center rounded-md p-2'>Students</h1>
                                    <p className='text-[#3f454c] font-bold text-xl bg-white w-full text-center rounded-md p-2'>{stats.students}</p>
                                </div>
                            </div>
                            <div className="w-full h-full bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]">
                                <div className='flex flex-col m-5 gap-5'> 
                                    <h1 className='text-[#3f454c] font-bold text-xl bg-white w-full text-center rounded-md p-2'>Courses</h1>
                                    <p className='text-[#3f454c] font-bold text-xl bg-white w-full text-center rounded-md p-2'>{stats.courses}</p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:flex w-full gap-6'>
                            <div className="lg:h-full w-full shadow-current-xl rounded-xl lg:w-[70%] mb-6">
                                <div className="flex justify-end items-center w-full h-full p-4 sm:h-120 bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]">
                                    <div className='flex items-center w-full h-full'>
                                        <StatsChart data={students} />
                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[30%] w-full'>
                                <div className='w-full h-120 bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]'>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Dashboardlayout>
    )
}