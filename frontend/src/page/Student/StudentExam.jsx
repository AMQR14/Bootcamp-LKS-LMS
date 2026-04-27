import { useEffect, useState } from "react"
import StudentDashboardLayout from "../../layouts/StudentDashboardLayout"
import { useParams } from "react-router-dom"
import api from "../../lib/api"
import {Link} from 'react-router-dom'
import { MoveLeft } from "lucide-react"

export default function StudentExam(){
    const [question, setQuestion] = useState([])
    const [examName, setExamName] = useState('')
    const [loading, setLoading] = useState(false)
    const {courseid, examid} = useParams()
    
    useEffect(()=>{
        async function fetchQuestion(params) {
            setLoading(true)
            try{
                const res = await api.get(`/exams/${examid}`)
                setExamName(res.data.exam.name)
                setQuestion(res.data.exam.question)
                console.log(res.data.exam.question)
            }finally{
                setLoading(false)
            }
        }
        fetchQuestion()
    }, [])

    return (
        <StudentDashboardLayout>
            <main className="flex ">
                <div className="m-8 md:mx-20  w-full ">
                    {loading ?
                        <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>
                    :
                        <div>
                            <h1 className='font-bold text-2xl text-[#3f454c]'>{examName}</h1>
                            <div className="flex w-full gap-4 mt-2">
                                <div className="border border-gray-300 w-full bg-gray-100 rounded-md"></div>
                                <div className='flex justify-end gap-2'>
                                    <Link to={`/student/dashboard/course/${courseid}`} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                                </div>
                            </div>
                                {/* <div className="border border-gray-300 my-4 min-h-screen bg-gray-50 rounded-md"> */}
                                    <div className="my-4 min-h-screen gap-4 flex flex-col">
                                        <div className="border border-gray-300 bg-gray-100 rounded-md h-full">
                                            <div className="flex gap-2 w-full h-full p-3 text-[#3f454c]">
                                                <h1 className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md font-semibold text-[#3f454c]">1</h1>
                                                <div className="w-full gap-2 flex flex-col">
                                                    <div className="border border-gray-300 rounded-md bg-gray-50">
                                                        <p className="p-2 ">kadhadksahdk sdasjdashdk sdhkah kadhadksahdk sdasjdashdk sdhkah kadhadksahdk sdasjdashdk sdhkah kadhadksahdk sdasjdashdk sdhkah kadhadksahdk sdasjdashdk sdhkah</p>
                                                    </div>
                                                    <textarea type="text" placeholder="Enter Answer..." className="border border-gray-300 rounded-md bg-gray-50 w-full p-2"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-gray-300 bg-gray-100 rounded-md h-full">
                                            <div className="flex gap-2 w-full h-full p-3 text-[#3f454c]">
                                                <h1 className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md font-semibold text-[#3f454c]">1</h1>
                                                <div className="w-full gap-2 flex flex-col">
                                                    <div className="border border-gray-300 rounded-md bg-gray-50">
                                                        <p className="p-2 ">kadhadksahdk sdasjdashdk sdhkah kadhadksahdk sdasjdashdk sdhkah kadhadksahdk sdasjdashdk sdhkah kadhadksahdk sdasjdashdk sdhkah kadhadksahdk sdasjdashdk sdhkah</p>
                                                    </div>
                                                    <p>Pick one answer :</p>
                                                    <div className="gap-2 flex flex-col">
                                                        <div className="gap-2 flex bg-gray-50 rounded-md border border-gray-300 p-2 px-2">
                                                            <input type="radio" name="answer" placeholder=""/>
                                                            <label htmlFor="">hello</label>
                                                        </div>
                                                        <div className="gap-2 flex bg-gray-50 rounded-md border border-gray-300 p-2 px-2">
                                                            <input type="radio" name="answer" placeholder=""/>
                                                            <label htmlFor="">hello</label>
                                                        </div>
                                                        <div className="gap-2 flex bg-gray-50 rounded-md border border-gray-300 p-2 px-2">
                                                            <input type="radio" name="answer" placeholder=""/>
                                                            <label htmlFor="">hello</label>
                                                        </div>
                                                        <div className="gap-2 flex bg-gray-50 rounded-md border border-gray-300 p-2 px-2">
                                                            <input type="radio" name="answer" placeholder=""/>
                                                            <label htmlFor="">hello</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/* </div> */}
                        </div>
                    }
                </div>
            </main>
        </StudentDashboardLayout>
    )
}