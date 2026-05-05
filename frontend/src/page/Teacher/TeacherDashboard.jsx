import { use, useEffect, useState } from "react"
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout"
import { useAuth } from "../../contexts/AuthContext"
import api from '../../lib/api'
import {Link} from 'react-router-dom'
import { Search, User } from "lucide-react"

export default function TeacherDashboard(){
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const {user} = useAuth()

    const workshopid = user.user.teacher.workshop_id

    async function fetchClass() {
        setLoading(true)
        try{
            setCourses(user.user.teacher.teacher_course)
            console.log(user.user.teacher.teacher_course)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchClass()
    }, [])

    const handleSearch = (e) =>{
        setSearch(e.target.value)
        // console.log(e.target.value)
    } 

    const filter = courses.filter((course)=>
        course.course?.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <TeacherDashboardLayout>
            <main className="flex ">
                    <div className="m-8 md:mx-20  w-full ">
                        <div className="flex flex-col sm:flex-row gap-8 md:items-center mb-8 md:justify-between">
                            <h1 className='font-bold text-2xl text-[#3f454c]'>Dashboard</h1>
                            <div className="border border-gray-300 w-full md:w-[60%] lg:w-120 h-10 rounded-md bg-gray-100 focus:outline-none hover:border-[#9aa8b7] text-[#3f454c] flex items-center">
                                <input className="w-full focus:outline-none p-2" value={search} onChange={handleSearch} />
                                <Search className="mr-2 text-[#9aa8b7]"/>
                            </div>
                        </div>
                        
                        <div className="min-h-screen mb-5">
                            {loading ?  <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div> :
    
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filter.map((course)=>(
                                    <Link to={`/teacher/dashboard/course/${course.course.id}`} key={course.id}>
                                        <div className="group/card w-full h-60 shadow-md rounded-md bg-[#9aa8b7] overflow-hidden" >
                                            <div className="flex flex-col justify-end  bottom-0 h-full -z-1">
                                                <div className="h-20 max-h-100 group-hover/card:h-32  w-full bg-white transition-all">
                                                    <div className="m-3">
                                                        <div className="flex justify-between items-center text-sm gap-2 text-[#84909e]">
                                                            <div className="flex gap-2">
                                                                <p className="pr-2">{course.course?.workshop?.name}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <User className="size-4 stroke-2"/>
                                                                <p>{course.course?.workshop.students?.length}</p>
                                                            </div>
                                                        </div>
                                                        <h2 className="text-[#3f454c] font-semibold py-2 truncate">{course.course?.name.toUpperCase()}</h2>
                                                        <div className="h-full w-full flex mt-6">
                                                            <h2 className="flex justify-end text-sm text-[#84909e]">Created At. {course.course?.created_at.slice(0, 10)}</h2>
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
        </TeacherDashboardLayout>
    )
}