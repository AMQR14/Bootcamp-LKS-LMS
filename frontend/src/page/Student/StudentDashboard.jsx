import { Search, User } from "lucide-react"
import UserDashboardLayout from "../../layouts/StudentDashboardLayout"
import { useEffect, useState } from "react"
import api from '../../lib/api'
import {Link} from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"

export default function StudentDashboard(){
    const [completedExam, setCompletedExam] = useState([])
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useAuth()
    const [search, setSearch] = useState('')

    const userId = user.user.student.id
    const workshopId = user.user.student.workshop.id

    async function fetchClass() {
        setLoading(true)
        try{
            const res = await api.get(`/workshops/${workshopId}`)
            setCourse(res.data.class.courses)
            console.log(res.data.class.courses)
            
        }finally{
            setLoading(false)
        }
    }

    async function fetchCompletedExam() {
        setLoading(true)
        try{
            const res = await api.get(`/exam/completed/${userId}`)
            setCompletedExam(res.data.answer)
            // console.log(res.data.answer)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCompletedExam()
    },[])

    useEffect(()=>{
        
            fetchClass();
        
    }, [])

    const handleSearch = (e) =>{
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    const filter = course.filter((cours)=>
        cours.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <UserDashboardLayout>
                <main className="flex ">
                    <div className="m-8 md:mx-20  w-full ">
                        <div className="flex flex-col sm:flex-row gap-8 md:items-center mb-8 md:justify-between">
                            <h1 className='font-bold text-2xl text-[#3f454c]'>Dashboard</h1>
                            <div className="border border-gray-300 w-full md:w-[60%] lg:w-120 h-10 rounded-md bg-gray-100 focus:outline-none hover:border-[#9aa8b7] text-[#3f454c] flex items-center">
                                <input className="w-full focus:outline-none p-2" placeholder="Search..." value={search} onChange={handleSearch}/>
                                <Search className="mr-2 text-[#9aa8b7]"/>
                            </div>
                        </div>
                        <div className="min-h-screen my-5">
                            {loading ?  <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div> :

                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filter.map((course)=>(
                                    <Link to={`/student/dashboard/course/${course.id}`} key={course.id}>
                                            {<div className={`justify-end flex flex-row w-full absolute fit -translate-x-3 -translate-y-3 ${course.exam.filter(e => !completedExam.some(c => c.id === e.id)).length == 0 ? 'hidden' : 'block'}`}>
                                                <div className="h-5 w-5 bg-[#2c3e52] inset-2 rounded-full absolute animate-ping duration-1000">                                                
                                                </div>
                                            </div>}
                                        <div className="group/card w-full h-60 shadow-md rounded-md bg-[#9aa8b7] overflow-hidden" >
                                            <div className="flex flex-col justify-end  bottom-0 h-full -z-1">
                                                <div className="h-24 max-h-100 group-hover/card:h-36 w-full bg-white transition-all">
                                                    <div className="m-3">
                                                        <div className="flex justify-between items-center text-sm gap-2 text-[#84909e]">
                                                            <div className="flex gap-2">
                                                                <p className="pr-2">{course.workshop.name}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <User className="size-4 stroke-2"/>
                                                                <p>{course.workshop.students.length}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h2 className="text-[#3f454c] font-semibold pt-2 truncate">{course.name.toUpperCase()}</h2>
                                                            <h2 className="text-sm text-[#84909e]">{course.teacher_course[0]?.teacher.name}</h2>
                                                        </div>
                                                        <div className="hidden group-hover/card:block transition-all pt-2">
                                                            <div className='text-[#5a767f] font-semibold text-md bg-[#e0e8eb] rounded-md m-auto p-2 border border-[#b2cbd3] truncate'>
                                                                {(() => {
                                                                    const unfinished = course.exam.filter(e => !completedExam.some(c => c.id === e.id))
                                                                    if (course.exam.length === 0) return 'There is no exam'
                                                                    if (unfinished.length === 0) return 'All exams completed'
                                                                    if (unfinished.length === 1) return unfinished[0].name
                                                                    return `${unfinished[0].name} + ${unfinished.length - 1} more`
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            }
                            
                        </div>
                    </div>
                </main>
        </UserDashboardLayout>
    )
}