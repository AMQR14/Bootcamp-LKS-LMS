import { useEffect, useState } from "react"
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout"
import {Link, useParams} from 'react-router-dom'
import api from '../../lib/api'
import { ArrowRight, CircleQuestionMark, MoveLeft, User } from "lucide-react"

export default function TeacherCourse(){
    const [courses, setCourses] = useState('')
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(false)
    const {courseid} = useParams()

    async function fetchExam() {
        setLoading(true)
        try{
            const res = await api.get(`/courses/${courseid}`)
            setCourses(res.data.course)
            setExams(res.data.course.exam)
            console.log(res.data.course.exam)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchExam();
    },[])

    return (
        <TeacherDashboardLayout>
            <main className="flex ">
                <div className="m-8 md:mx-20  w-full ">
                    {loading ?
                        <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>
                    :
                        <div>
                            <h1 className='font-bold text-2xl text-[#3f454c]'>{courses.name}</h1>
                            <div>
                                <div className='flex justify-end gap-2'>
                                    <Link to={'/teacher/dashboard'} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                                </div>
                            </div>
                            {exams.length == 0 ? <div className='text-[#5a767f] font-semibold text-md bg-[#e0e8eb] mt-6 rounded-xl p-4 border border-[#b2cbd3]'>There is no exams</div> :
                                <div className="min-h-screen gap-6 my-5 flex flex-col">
                                    {exams.map((exam)=>(
                                        <div key={exam.id}>
                                            <div className="border-l-20 overflow-hidden border-[#9aa8b7] bg-gray-50 group/card h-full sm:h-25 rounded-xl shadow-sm flex justify-between" >
                                                <div className="mx-4 my-2 sm:my-3 flex flex-col gap-1 w-full">
                                                    <div className="flex sm:items-center flex-col sm:flex-row w-full sm:justify-between gap-2">
                                                        <div className="flex gap-2 ">
                                                            <div className="flex items-center gap-1 text-sm text-[#84909e] border-r-2 pr-2">
                                                                <CircleQuestionMark className="size-5"/>
                                                                <p className="text-sm text-nowrap">{exam.question.length} Question</p> 
                                                            </div>
                                                            <div className="flex  items-center gap-2">
                                                                <p className="sm:text-sm text-[#84909e] text-xs text-nowrap">{exam.start_time} - {exam.end_time} </p>
                                                            </div> 
                                                        </div>  
                                                        <div className="flex items-center jus">
                                                            <div className="text-[#84909e] text-sm text-nowrap flex items-center">Complete:  <User className="text-[#84909e] size-4 ml-1"/> 20</div>
                                                        
                                                        </div>
                                                    </div>
                                                    <h2 className="font-bold text-[#3f454c] sm:text-lg text-md my-auto">{exam.name}</h2>
                                                    <Link to={`/student/dashboard/course/${courseid}/exam/${exam.id}`}>
                                                        <div className={`h-0 group-hover/card:h-10 group-hover/card:my-1 bg-[#9aa8b7] hover:bg-[#7e90a3] rounded-md flex justify-center items-center sm:hidden transition-all`}>
                                                            <ArrowRight className="size-0 group-hover/card:size-8 text-white"/>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="h-full transition-all hidden sm:block">
                                                    <Link to={`/student/dashboard/course/${courseid}/exam/${exam.id}`}>
                                                        <div className={`bg-[#9aa8b7] h-full group-hover/card:w-40 w-0 hover:bg-[#7e90a3] transition-all flex justify-center items-center`}>
                                                            <ArrowRight className="size-10 text-white"/>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    }
                </div>
            </main>
        </TeacherDashboardLayout>
    )
}