import { useEffect, useState } from "react"
import StudentDashboardLayout from "../../layouts/StudentDashboardLayout"
import { useParams } from "react-router-dom"
import api from '../../lib/api'
import { ArrowRight, BadgeQuestionMark, CircleQuestionMark, MoveLeft } from "lucide-react"
import {Link} from 'react-router-dom'

export default function StudentCourse(){
    const [course, setCourse] = useState([])
    const [loading , setLoading] = useState(false)
    const {courseid} = useParams()

    useEffect(()=>{
        async function fetchCourse() {
            setLoading(true)
            try{
                const res = await api.get(`/courses/${courseid}`)
                setCourse(res.data.course)
                console.log(res.data.course)
            }finally{
                setLoading(false)
            }
        }
        fetchCourse()
    }, [])

    return (
        <StudentDashboardLayout>
            <main className="flex ">
                <div className="m-8 md:mx-20  w-full ">
                    {loading ?
                        <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>
                    :
                        <div>
                            <h1 className='font-bold text-2xl text-[#3f454c]'>{course.name}</h1>
                            <div>
                                <div className='flex justify-end gap-2'>
                                    <Link to={'/student/dashboard'} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                                </div>
                            </div>
                            <div className="min-h-screen my-5 gap-10 flex flex-col">
                                <div className="border-l-20 border-[#9aa8b7] bg-gray-50 group/card h-25 rounded-xl shadow-sm flex justify-between overflow-hidden">
                                    <div className="mx-4 my-3 flex flex-col gap-1 w-full">
                                        <div className="flex items-center flex-row w-full justify-between">
                                            <div className="flex gap-2 ">
                                                <div className="flex items-center gap-1 text-sm text-[#84909e] border-r-2 pr-2">
                                                    <CircleQuestionMark className="size-5"/>
                                                    <p>{course.exam?.question.length} Question</p> 
                                                </div>
                                                <div className="flex  items-center gap-2">
                                                    <p className="text-sm text-[#84909e]">{course.exam?.start_time} - {course.exam?.end_time} </p>
                                                </div> 
                                            </div>  
                                            <div>
                                            <div className='text-[#5a767f] font-semibold text-xs bg-[#e0e8eb] rounded-md p-2 border border-[#b2cbd3] truncate'>Not Completed</div>
                                            </div>
                                        </div>
                                        <h2 className="font-bold text-[#3f454c] text-xl ">{course.exam?.name}</h2>

                                    </div>
                                    <div className="h-full transition-all">
                                        <div className="bg-[#9aa8b7] h-full group-hover/card:w-40 w-0 hover:bg-[#7e90a3] transition-all flex justify-center items-center">
                                            <ArrowRight className="size-10 text-white"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </StudentDashboardLayout>
    )
}