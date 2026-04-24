import { useEffect, useState } from "react"
import StudentDashboardLayout from "../../layouts/StudentDashboardLayout"
import { useParams } from "react-router-dom"
import api from '../../lib/api'

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
                    <h1 className='font-bold text-2xl text-[#3f454c]'>{course.name}</h1>
                    <div className="min-h-screen my-5 gap-10 flex flex-col">
                        <div className="border-2 h-25"></div>
                        <div className="border-2 h-25"></div>
                        <div className="border-2 h-25"></div>
                    </div>
                </div>
            </main>
        </StudentDashboardLayout>
    )
}