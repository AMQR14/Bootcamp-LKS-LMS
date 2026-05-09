import { useEffect, useState } from "react"
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout"
import {Link, useParams} from 'react-router-dom'
import api from '../../lib/api'
import { ArrowRight, CircleQuestionMark, Edit, MoveLeft, Plus, Trash, User, X } from "lucide-react"
import ModelBox from "../../components/ModelBox"

export default function TeacherCourse(){
    const[form, setForm] = useState({
        name: '',
        course_id: '',
        start_time: '',
        end_start_time: '',
    })
    const [error, setError] = useState({}) 
    const [loading, setLoading] = useState(false) 
    const [courses, setCourses] = useState('')
    const [exams, setExams] = useState([])
    const [students, setStudents] = useState([])
    const {courseid} = useParams()
    const [opened, setOpened] = useState(false)
    const [edited, setEdited] = useState(false)
    const [saving, setSaving] = useState(false)
    const [examid, setExamid] = useState('') 

    async function fetchExam() {
        setLoading(true)
        try{
            const res = await api.get(`/courses/${courseid}`)
            setStudents(res.data.course.workshop.students)
            setCourses(res.data.course)
            setExams(res.data.course.exam)
            console.log(res.data.course)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        // if(students){
        //     console.log(students)
        // }

        fetchExam();
    },[])

    const answer = students.map(student => [
        ...student.answer.filter(val => val.question?.exam_id == examid),
        ...student.answer_mul.filter(val => val.question?.exam_id == examid)
    ]);   

    const open = () => {
        setOpened(!opened)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError({})
        setLoading(true)
        try{
            await api.post('/exams', {
                name:form.name,
                course_id: courseid,
                start_time:form.start_time,
                end_time:form.end_time
            })
            open()
            fetchExam()
        }catch(err){
            if(err.response.status == 422){
                setError(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }

    async function handleDelete(id) {
        setLoading(true)
        try{
            await api.delete(`/exams/${id}`)
            fetchExam()
        }finally{
            setLoading(false)
        }
    }

    //EDIT
    const edit = (id) => {
        setEdited(!edited)
        setExamid(id)
    }

    async function fetchExamEdit() {
        setLoading(true)
        try{
            const res = await api.get(`/exams/${examid}`)
            setForm(res.data.exam)
            console.log(res.data.exam)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(examid){
            fetchExamEdit();
        }
    }, [examid])

    async function handleSubmitEdit(e) {
        e.preventDefault()
        setError({})
        setSaving(true)
        try{
            await api.put(`/exams/${examid}`, {
                name:form.name,
                course_id: form.course_id,
                start_time:form.start_time,
                end_time:form.end_time
            })
            edit()
            fetchExam()
        }catch(err){
            if(err.response.status == 422){
                setError(err.response.data.errors)
            }
        }finally{
            setSaving(false)
        }
    }


    return (
        <>
            <TeacherDashboardLayout>
                <main className="flex ">
                    <div className="min-h-screen">
                        {opened == false ? '' :
                            <ModelBox>
                                <form action="" className='text-[#3f454c]' onSubmit={handleSubmit}>
                                        <div className="flex flex-row justify-end">
                                            <X className="" onClick={()=> open()}/>
                                        </div>
                                    <div className='flex flex-col justify-center gap-5'>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="" className='font-bold'>Name:</label>
                                            <input type="text" placeholder='Enter exam name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                            onChange={e => setForm({...form, name:e.target.value})}/>
                                            {error.name && <p className='text-red-500'>{error.name[0]}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="" className='font-bold'>Start Time:</label>
                                            <input type="time" placeholder='Enter description' step={1} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                            onChange={e => setForm({...form, start_time:e.target.value})}/>
                                            {error.start_time && <p className='text-red-500'>{error.start_time[0]}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="" className='font-bold'>End Time:</label>
                                            <input type="time" placeholder='Enter description' step={1} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                            onChange={e => setForm({...form, end_time:e.target.value})}/>
                                            {error.end_time && <p className='text-red-500'>{error.end_time[0]}</p>}
                                        </div>
                                        <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={loading}>{loading ? 'Loading...' : 'Create'}</button>
                                    </div>
                                </form>
                            </ModelBox>
                        }
                        {edited == false ? '' :
                            <ModelBox>
                                <form action="" className='text-[#3f454c]' onSubmit={handleSubmitEdit}>
                                        <div className="flex flex-row justify-end">
                                            <X className="" onClick={()=> edit()}/>
                                        </div>
                                    <div className='flex flex-col justify-center gap-5'>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="" className='font-bold'>Name:</label>
                                            <input type="text" value={loading ? 'Loading...' : form?.name} placeholder='Enter exam name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                            onChange={e => setForm({...form, name:e.target.value})}/>
                                            {error.name && <p className='text-red-500'>{error.name[0]}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="" className='font-bold'>Start Time:</label>
                                            <input type="time" value={form?.start_time} placeholder='Enter description' step={1} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                            onChange={e => setForm({...form, start_time:e.target.value})}/>
                                            {error.start_time && <p className='text-red-500'>{error.start_time[0]}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="" className='font-bold'>End Time:</label>
                                            <input type="time" value={form?.end_time} placeholder='Enter description' step={1} className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                            onChange={e => setForm({...form, end_time:e.target.value})}/>
                                            {error.end_time && <p className='text-red-500'>{error.end_time[0]}</p>}
                                        </div>
                                        <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                                    </div>
                                </form>
                            </ModelBox>
                        }
                    </div>
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
                                {exams.length == 0 ?
                                
                                <div className="gap-6 flex flex-col">
                                    <div className='text-[#5a767f] font-semibold text-md bg-[#e0e8eb] mt-6 rounded-xl p-4 border border-[#b2cbd3]'>There is no exams</div> 
                                    <div className="group/create hover:scale-101 border-4 border-dashed border-gray-200 hover:border-gray-300 h-25 rounded-xl flex justify-center items-center transition-all" onClick={()=> open()}>
                                            <Plus className="size-24 text-gray-200 group-hover/create:text-gray-300 transition-all stroke-2"/>
                                    </div>
                                </div>
                                
                                :
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
                                                            <div className="flex items-center gap-2">
                                                                {/* <div className="text-[#84909e] text-sm text-nowrap flex items-center">Finished:  <User className="text-[#84909e] size-4 ml-1"/> 20</div> */}
                                                                <div className="flex gap-1 text-sm bg-green-200 p-1 px-2 rounded-md w-fit items-center justify-center text-green-600 border border-green-600">
                                                                    <h1 className="">Finished</h1>
                                                                    <div className="flex h-full w-2 items-center justify-center">
                                                                        <div className="w-[0.8px] h-4 bg-green-400"></div>
                                                                    </div>
                                                                    <p className="flex items-center">
                                                                        {students.map(student => [
                                                                                ...student.answer.filter(val => val.question?.exam_id == exam.id),
                                                                                ...student.answer_mul.filter(val => val.question?.exam_id == exam.id)
                                                                            ]).filter(e=> e.length != 0).length   
                                                                        } <User className="size-5"/></p>
                                                                </div>
                                                                <div className="flex gap-1 text-sm bg-red-200 p-1 px-2 rounded-md w-fit items-center justify-center text-red-600 border border-red-600">
                                                                    <h1 className="text-nowrap">Not Finished</h1>
                                                                    <div className="flex h-full w-2 items-center justify-center">
                                                                        <div className="w-[0.8px] h-4 bg-red-400"></div>
                                                                    </div>
                                                                    <p className="flex items-center">
                                                                        {students.map(student => [
                                                                                ...student.answer.filter(val => val.question?.exam_id == exam.id),
                                                                                ...student.answer_mul.filter(val => val.question?.exam_id == exam.id)
                                                                            ]).filter(e=> e.length == 0).length   
                                                                        } <User className="size-5"/></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between my-auto mt-2">
                                                            <h2 className="font-bold text-[#3f454c] sm:text-lg text-md my-auto">{exam.name}</h2>
                                                            <div className="flex opacity-0 flex-row justify-center items-center gap-2 text-white group-hover/card:opacity-100 transition-all">
                                                                    <button className="bg-[#5ca3b8] hover:bg-[#66b2c9] p-1 rounded-md" onClick={()=> edit(exam.id)}>
                                                                        <Edit className="text-"/>
                                                                    </button>
                                                                    <button className=" bg-[#d25252] hover:bg-[#ea5e5e] p-1 rounded-md" onClick={()=> handleDelete(exam.id)}>
                                                                        <Trash/>
                                                                    </button>
                                                                </div>
                                                        </div>
                                                        <Link to={`/teacher/dashboard/course/${courseid}/exam/${exam.id}`}>
                                                            <div className={`h-0 group-hover/card:h-10 group-hover/card:my-1 bg-[#9aa8b7] hover:bg-[#7e90a3] rounded-md flex justify-center items-center sm:hidden transition-all`}>
                                                                <ArrowRight className="size-0 group-hover/card:size-8 text-white"/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="h-full transition-all hidden sm:block">
                                                        <Link to={`/teacher/dashboard/course/${courseid}/exam/${exam.id}`}>
                                                            <div className={`bg-[#9aa8b7] h-full group-hover/card:w-40 w-0 hover:bg-[#7e90a3] transition-all flex justify-center items-center`}>
                                                                <ArrowRight className="size-10 text-white"/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="group/create hover:scale-101 border-4 border-dashed border-gray-200 hover:border-gray-300 h-25 rounded-xl flex justify-center items-center transition-all" onClick={()=> open()}>
                                            <Plus className="size-24 text-gray-200 group-hover/create:text-gray-300 transition-all stroke-2"/>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </main>
            </TeacherDashboardLayout>
        </>
    )
}