import { DeleteIcon, Edit, Plus, Trash } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../lib/api'

export default function Questions(){
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    async function fetchQuestion() {
        setLoading(true)
        try{
            const res = await api.get('/questions')
            setQuestions(res.data.questions)
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
                <h1 className='font-bold text-2xl text-[#3f454c]'>Questions Dashboard</h1>
                <div>
                    <div className='flex justify-end'>
                        <Link to={'/admin/dashboard/questions/create'} className='flex justify-center items-center w-14 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><Plus className='size-7 stroke-2'/></Link>
                    </div>
                </div>
                
                {loading ? <p>Loading...</p> :
                    <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                        <table className='min-w-200 w-full text-[#3f454c]'>
                            <thead className=''>
                                <tr >
                                    <th className='border-b-2 border-r-2 p-2 w-15 border-[#A3BAC2]'>No</th>
                                    <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2] text-wrap'>Question</th>
                                    <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question, index)=>(
                                    <tr key={question.id}>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 '>{index + 1}</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 text-wrap'>{question.question}</td>
                                        <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                            <div className="flex justify-center items-center gap-3">
                                                <Link to={`/admin/dashboard/questions/${question.id}/edit`} className='flex justify-center items-center w-10 h-8 bg-[#5ca3b8] hover:bg-[#66b2c9] transition-all text-white font-semibold rounded-md'><Edit/></Link>
                                                <button className='flex justify-center items-center w-10 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md' onClick={()=> handleDelete(question.id)}><Trash/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

                {/* <div className='h-screen my-5'>
                    <div className='gap-8 flex flex-col'>
                        <div className='border-2 border-[#A3BAC2] transition-all hover:border-[#60848f] h-full rounded-xl flex '>
                            <div className='m-4 mx-6 w-full'>
                                <div className='flex justify-between w-full mb-3'>
                                    <h2 className='text-sm'>Matematika | XI RPL 1</h2>
                                    <h2 className='text-sm'>Multiple Choice</h2>
                                </div>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='font-semibold text-xl'>Soal Ulangan Matematika Kelas XI RPL 1 </h1>
                                        <h1 className='text-sm'>OKTAVIANTO</h1>
                                    </div>
                                    <div className='flex flex-col ml-3 sm:ml-0 sm:flex-row items-center justify-center gap-4'>
                                        <div className='border-2 border-[#60848f] hover:border-[#77a2b0] bg-[#d2e1e5] p-0.5 rounded-lg' onClick={edit}>
                                            <Edit className='text-[#60848f] hover:text-[#739ca9]'/>
                                        </div>
                                        <div className='border-2 border-[#d25252] hover:border-[#ea5e5e] bg-[#fde7e7] p-0.5 rounded-lg'>
                                            <Trash className='text-[#d25252] hover:text-[#ea5e5e]'/>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='border-2 border-[#A3BAC2] transition-all hover:border-[#60848f] h-full rounded-xl flex '>
                            <div className='m-4 mx-6 w-full'>
                                <div className='flex justify-between w-full mb-3'>
                                    <h2 className='text-sm'>Bahasa Indonesia | XI RPL 1</h2>
                                    <h2 className='text-sm'>Essay</h2>
                                </div>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='font-semibold text-xl'>Soal Essay Bhs.Indonesia </h1>
                                        <h1 className='text-sm'>OKTAVIANTO</h1>
                                    </div>
                                    <div className='flex flex-col ml-3 sm:ml-0 sm:flex-row items-center justify-center gap-4'>
                                        <div className='border-2 border-[#60848f] hover:border-[#77a2b0] bg-[#d2e1e5] p-0.5 rounded-lg' onClick={navigate}>
                                            <Edit className='text-[#60848f] hover:text-[#739ca9]'/>
                                        </div>
                                        <div className='border-2 border-[#d25252] hover:border-[#ea5e5e] bg-[#fde7e7] p-0.5 rounded-lg'>
                                            <Trash className='text-[#d25252] hover:text-[#ea5e5e]'/>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </main>
        </DashboardLayout>
    )
}