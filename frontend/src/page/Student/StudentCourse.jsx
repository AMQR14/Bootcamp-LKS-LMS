import { useEffect, useState } from "react"
import StudentDashboardLayout from "../../layouts/StudentDashboardLayout"
import { useParams } from "react-router-dom"
import api from '../../lib/api'
import { ArrowRight, BadgeQuestionMark, CircleQuestionMark, MoveLeft, User } from "lucide-react"
import {Link} from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"

export default function StudentCourse(){
    const [course, setCourse] = useState([])
    const [exam, setExam] = useState([])
    const [loading , setLoading] = useState(false)
    const {courseid} = useParams()
    const [completedExamId, setCompletedExamId] = useState([])
    const {user} = useAuth()

    async function fetchCompletedExam() {
        setLoading(true)
        const studentid = user.user.student.id
        try{
            const res = await api.get(`/students/${studentid}`)

            // const answer = res.data.student.answer.map(a => a.question.exam_id)
            // const answermul = res.data.student.answer_mul.map(a => a.question.exam_id)

            // setCompletedExamId([
            //     ...answer,
            //     ...answermul,
            // ])

            setCompletedExamId([
                ...res.data.student.answer.map(a => a.question.exam_id), 
                ...res.data.student.answer_mul.map(a => a.question.exam_id)
            ])

            // setCompletedExamId(prev => [...prev, ...res.data.student.answer_mul.map(a => a.question.exam_id)])
        }finally{
            setLoading(false)
        }
    }

    async function fetchCourse() {
        setLoading(true)
        try{
            const res = await api.get(`/courses/${courseid}`)
            setCourse(res.data.course)
            setExam(res.data.course.exam)
            // console.log(res.data.course.exam)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCourse()
    }, [])

    useEffect(()=>{
        // if(completedExamId){
        //     console.log(completedExamId)
        // }
        
        fetchCompletedExam()
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
                            {exam.length == 0 ? <div className='text-[#5a767f] font-semibold text-md bg-[#e0e8eb] mt-6 rounded-xl p-4 border border-[#b2cbd3]'>There is no exams</div> :
                                <div className="min-h-screen gap-6 my-5 flex flex-col">
                                    {exam.map((exam)=>(
                                        <div key={exam.id}>
                                            <div className="border-l-20 overflow-hidden border-[#9aa8b7] bg-gray-50 group/card h-full sm:h-25 rounded-xl shadow-sm flex justify-between" >
                                                <div className="mx-4 my-2 sm:my-3 flex flex-col gap-1 w-full">
                                                    <div className="flex sm:items-center flex-col sm:flex-row w-full sm:justify-between gap-2">
                                                        <div className="flex gap-2 ">
                                                            <div className="flex items-center gap-1 text-sm text-[#84909e] border-r-2 pr-2">
                                                                <CircleQuestionMark className="size-5"/>
                                                                <p className="text-xs sm:text-sm text-nowrap">{exam.question.length} Question</p> 
                                                            </div>
                                                            <div className="flex  items-center gap-2">
                                                                <p className="sm:text-sm text-[#84909e] text-xs text-nowrap">{exam.start_time} - {exam.end_time} </p>
                                                            </div> 
                                                        </div>  
                                                        {/* <div> */}
                                                        {/* <div className='text-[#5a767f] font-semibold text-xs bg-[#e0e8eb] rounded-md p-2 border border-[#b2cbd3] truncate w-fit'>{completedExamId.includes(exam?.id) ? 'Completed' : 'Not Completed'}</div>
                                                        </div> */}
                                                        {completedExamId.includes(exam?.id) ?
                                                            <div className="flex gap-1 text-sm bg-green-200 p-1 px-2 rounded-md w-fit items-center justify-center text-green-600 border border-green-600">
                                                                <h1 className="">Completed</h1>
                                                            </div>:
                                                            <div className="flex gap-1 text-sm bg-red-200 p-1 px-2 rounded-md w-fit items-center justify-center text-red-600 border border-red-600">
                                                                <h1 className="text-nowrap">Not Completed</h1>
                                                            </div>
                                                        }
                                                    </div>
                                                    <h2 className="font-bold text-[#3f454c] sm:text-lg text-md ">{exam.name}</h2>
                                                    <Link to={`/student/dashboard/course/${courseid}/exam/${exam.id}`}>
                                                        <div className={`h-0 ${completedExamId.includes(exam.id) ? 'group-hover/card:h-0' : 'group-hover/card:h-10 group-hover/card:my-1'}  bg-[#9aa8b7] hover:bg-[#7e90a3] rounded-md flex justify-center items-center sm:hidden transition-all`}>
                                                            <ArrowRight className="size-0 group-hover/card:size-8 text-white"/>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="h-full transition-all hidden sm:block">
                                                    <Link to={`/student/dashboard/course/${courseid}/exam/${exam.id}`}>
                                                        <div className={`bg-[#9aa8b7] h-full ${completedExamId.includes(exam.id) ? 'group-hover/card:w-0' : 'group-hover/card:w-40'} w-0 hover:bg-[#7e90a3] transition-all flex justify-center items-center`}>
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
        </StudentDashboardLayout>
    )
}