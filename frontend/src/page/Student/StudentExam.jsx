import { useEffect, useState } from "react"
import StudentDashboardLayout from "../../layouts/StudentDashboardLayout"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../lib/api"
import {Link} from 'react-router-dom'
import { MoveLeft } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

export default function StudentExam(){
    const [essays, setEssays] = useState({})
    const [muls, setMuls] = useState({})
    const [question, setQuestion] = useState([])
    const [examName, setExamName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const {courseid, examid} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    console.log(essays)
    console.log(muls)
    // console.log(question.length)
    
    useEffect(()=>{
        async function fetchQuestion() {
            setLoading(true)
            try{
                const res = await api.get(`/exams/${examid}`)
                setExamName(res.data.exam.name)
                setQuestion(res.data.exam.question)
            }finally{
                setLoading(false)
            }
        }
        fetchQuestion()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError({})

        try{

            // await Promise.all(
            //     Object.entries(essays).map(([question_id, answer]) =>
            //         api.post(`/answers`, {
            //             answer,
            //             question_id,
            //             student_id: user.user.student.id,
            //         })
            //     )
            // )

            // await Promise.all(
            //     Object.entries(muls).map(([question_id, multiple_choice_id]) =>
            //         api.post(`/answer-mul`, {
            //             multiple_choice_id,
            //             question_id,
            //             student_id: user.user.student.id,
            //         })
            //     )

            if(Object.entries(muls).length + Object.entries(essays).length != question.length){
                setError(['Complete All The Questions'])
                console.log(error)
                return;
            }else{
                await api.post('/answer/bulk', {
                    student_id: user.user.student.id,
                    essays: Object.entries(essays).map(([question_id, answer])=>({
                        question_id,
                        answer,
                    })),
                    muls: Object.entries(muls).map(([question_id, multiple_choice_id])=>({
                        question_id,
                        multiple_choice_id,
                    })) 
                })
            }
            navigate(`/student/dashboard/course/${courseid}`)
        }finally{
            setLoading(false)
        }
    }

    return (
        <StudentDashboardLayout>
            <main className="flex ">
                <div className="m-8 md:mx-20  w-full ">
                    {loading ?
                        <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>
                    :
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <h1 className='font-bold text-2xl text-[#3f454c]'>{examName}</h1>
                            <div className="flex w-full gap-4 mt-2">
                                <div className="border border-gray-300 w-full bg-gray-100 rounded-md"></div>
                                
                                <div className='flex justify-end gap-2'>
                                    <Link to={`/student/dashboard/course/${courseid}`} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <button className='flex justify-center items-center w-24 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md ' type="submit" disabled={loading}>{loading? 'Loading...' : 'Submit'}</button>
                                </div>
                            </div>
                            <div className="my-4 min-h-screen gap-4 flex flex-col">
                                {error && <p className="text-red-500">{error[0]}</p>}
                                {question.map((question, index)=>(
                                    <div className="border border-gray-300 bg-gray-100 rounded-md h-full" key={question.id}>
                                        <div className="flex gap-2 w-full h-full p-3 text-[#3f454c]">
                                            <h1 className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md font-semibold text-[#3f454c]">{index + 1}</h1>
                                            <div className="w-full gap-2 flex flex-col">
                                                <div className="border border-gray-300 rounded-md bg-gray-50">
                                                    <p className="p-2 ">{question.question}</p>
                                                </div>
                                                {question.multiple_choice.length == 0 ?
                                                <div>
                                                    <textarea 
                                                        type="text" 
                                                        placeholder="Enter Answer..." 
                                                        className="border border-gray-300 rounded-md bg-gray-50 w-full p-2 hover:border-gray-400 transition-all focus:outline-none focus:border-gray-400" 
                                                        onChange={e => setEssays(prev => ({
                                                            ...prev,
                                                            [question.id]: e.target.value
                                                        }))}
                                                    />
                                                </div>
                                                :
                                                <div>
                                                    <p className="mb-2">Pick one answer :</p>
                                                    <div className="gap-2 flex flex-col">
                                                        {question.multiple_choice.map((choice)=>(
                                                            <label key={choice.id}>
                                                                <div className="gap-2 flex bg-gray-50 rounded-md border border-gray-300 p-2 px-2 hover:border-gray-400 transition-all has-checked:border-[#60848f] has-checked:border-2">
                                                                    <input 
                                                                        type="radio" 
                                                                        name={question.id}
                                                                        value={choice.id}
                                                                        onChange={() => setMuls(prev => ({
                                                                            ...prev,
                                                                            [question.id]: choice.id
                                                                        }))}
                                                                        className=""
                                                                    />
                                                                    <label htmlFor="">{choice.choice_text}</label>
                                                                </div>
                                                            </label>  
                                                        ))}
                                                    </div>
                                                    {error.multiple_choice_id && <p className="text-red-500">{error.multiple_choice_id[0]}</p>}
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))} 
                            </div>
                        </form>
                    }
                </div>
            </main>
        </StudentDashboardLayout>
    )
}