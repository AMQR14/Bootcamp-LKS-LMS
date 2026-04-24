import { DeleteIcon, Edit, MoveLeft, Plus, Trash } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { use, useEffect, useState } from 'react'
import api from '../../lib/api'

export default function Questions(){
    const [questions, setQuestions] = useState([])
    const [exam, setExam] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {classid, courseid, examid, questionid} = useParams()
    
    async function fetchQuestion() {
        setLoading(true)
        try{
            const res = await api.get(`/exams/${examid}`)
            setQuestions(res.data.exam.question)
            setExam(res.data.exam)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchQuestion()
    }, [])

    async function handleDelete(id) {
        setLoading(true)
        try{
            await api.delete(`/questions/${id}`)
            fetchQuestion()
        }finally{
            setLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <main className="m-8 md:mx-20 text-[#3f454c]">
                <h1 className='font-bold text-2xl text-[#3f454c]'>{exam.name} Questions Dashboard</h1>
                <div>
                    <div className='flex justify-end gap-2'>
                        <Link to={`/admin/dashboard/exams`} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                        <Link to={`/admin/dashboard/classes/${classid}/courses/${courseid}/exams/${examid}/questions/create`} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><Plus className='size-7 stroke-2'/></Link>
                    </div>
                </div>
                {loading ? <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div> : questions.length == 0 ? <div className='text-[#5a767f] font-semibold text-md bg-[#e0e8eb] mt-6 rounded-xl p-4 border border-[#b2cbd3]'>There is no questions</div> :
                    <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                        <table className='min-w-200 w-full text-[#3f454c]'>
                            <thead className='text-[#5a767f] bg-[#e0e8eb]'>
                                <tr >
                                    <th className='border-b-2 border-r-2 p-2 w-15 border-[#A3BAC2]'>No</th>
                                    <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2] text-wrap'>Question</th>
                                    <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2] text-wrap'>Type</th>
                                    <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question, index)=>(
                                    <tr key={question.id}>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 '>{index + 1}</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 text-wrap'>{question.question}</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 text-wrap'>{question.multiple_choice.length == 0 ? 'Essay' : 'Multiple Choice'}</td>
                                        <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                            <div className="flex justify-center items-center gap-3">
                                                <Link to={`/admin/dashboard/classes/${classid}/courses/${courseid}/exams/${examid}/questions/${question.id}/edit`} className='flex justify-center items-center w-10 h-8 bg-[#5ca3b8] hover:bg-[#66b2c9] transition-all text-white font-semibold rounded-md'><Edit/></Link>
                                                <button className='flex justify-center items-center w-10 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(question.id)}><Trash/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </main>
        </DashboardLayout>
    )
}