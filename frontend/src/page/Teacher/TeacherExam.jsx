import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDownIcon, Check, MoveDown, MoveLeft, MoveRightIcon, Plus, Search, User, X } from "lucide-react"
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout"
import {Link, useParams} from 'react-router-dom'
import { use, useEffect, useState } from "react"
import api from '../../lib/api'

export default function TeacherExam(){
    const [exam, setExam] = useState()
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const {courseid, examid} = useParams()
    const [finished, setFinished] = useState()
    const [search, setSearch] = useState('')


    //Flatmap all the data on one array

    // const fin = [
    //     ...students.flatMap(student => student.answer.filter(val => val.question?.exam_id == examid)),
    //     ...students.flatMap(student => student.answer_mul.filter(val => val.question?.exam_id == examid))
    // ]; 

    // console.log(fin)

    const answer = students.map(student => [
        ...student.answer.filter(val => val.question?.exam_id == examid),
        ...student.answer_mul.filter(val => val.question?.exam_id == examid)
      ]);   

    // console.log(answer)

    async function fetchExam() {
        setLoading(true)
        try{
            const res = await api.get(`/exams/${examid}`)
            setExam(res.data.exam)
            
            const stud = res.data.exam.course.workshop.students;
            
            const sortedStudents = [...stud].sort((a, b) => {
                const aFinished = a.answer.filter((e) => e.question?.exam_id == examid).length !== 0 || 
                                  a.answer_mul.filter((e) => e.question?.exam_id == examid).length !== 0;
                const bFinished = b.answer.filter((e) => e.question?.exam_id == examid).length !== 0 || 
                                  b.answer_mul.filter((e) => e.question?.exam_id == examid).length !== 0;
            return bFinished - aFinished})

            setStudents(sortedStudents)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{                
            fetchExam();
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const filter = students.filter((student)=>
        student.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <TeacherDashboardLayout>
            <main className="flex text-[#3f454c]">
                <div className="m-8 md:mx-20 w-full">
                    <div className="@container min-h-screen gap-4 flex flex-col">
                        <div className="flex w-full gap-4">
                            <div className="border border-gray-300 h-auto bg-gray-100 rounded-md w-full flex items-center">
                                <h1 className="ml-4 font-semibold ">{exam?.name}</h1>
                            </div>
                            <div className='flex justify-end'>
                                <Link to={`/teacher/dashboard/course/${courseid}`} className='flex justify-center items-center w-14 h-12 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                            </div>
                        </div>
                        <div className="border border-gray-300 h-fit bg-gray-100 rounded-md p-4  gap-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-semibold">Exam name:</h1>
                                    <p className="rounded-md p-2 bg-gray-200 border border-gray-300 h-full">{loading? 'Loading...' : exam?.name}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-semibold">Class Name:</h1>
                                    <p className="rounded-md p-2 bg-gray-200 border border-gray-300 h-full">{loading? 'Loading...' : exam?.course.workshop.name}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-semibold">Start Time:</h1>
                                    <p className="rounded-md p-2 bg-gray-200 border border-gray-300 h-full">{loading? 'Loading...' : exam?.start_time}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-semibold">Course name:</h1>
                                    <p className="rounded-md p-2 bg-gray-200 border border-gray-300 h-full">{loading? 'Loading...' : exam?.course.name}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-semibold">End Time:</h1>
                                    <p className="rounded-md p-2 bg-gray-200 border border-gray-300 h-full">{loading? 'Loading...' : exam?.end_time}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-semibold">Question Amount:</h1>
                                    <p className="rounded-md p-2 bg-gray-200 border border-gray-300 h-full">{loading? 'Loading...' : exam?.question.length}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-semibold">Teacher Name:</h1>
                                    <p className="rounded-md p-2 bg-gray-200 border border-gray-300 h-full">{loading? 'Loading...' : exam?.course.teacher_course.teacher.name}</p>
                                </div>
                                <Link to={`questions`}>
                                    <div className="flex flex-col gap-1 h-full">
                                        <div className="h-full rounded-md bg-[#9aa8b7] hover:bg-[#91a1af] transition-all p-2 flex justify-center items-center">
                                            <h1 className=" text-white font-semibold text-md flex items-center gap-1">Questions <Plus/></h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="border border-gray-300 w-full min-h-screen bg-gray-100 rounded-md flex flex-col">
                            <div className="m-4 h-full @container flex flex-col gap-4">
                                <div className="flex flex-col @3xl:flex-row gap-4 ">
                                    <div className="w-full rounded-md border border-gray-300 bg-gray-50 h-auto flex items-center p-2">
                                        <input type="text" placeholder="Search..." className="focus:outline-none w-full" onChange={handleSearch} value={search}/>
                                        <Search className="text-[#9aa8b7] mx-2"/>
                                    </div>
                                    <div className="rounded-md border border-gray-300 bg-gray-200 h-fit flex flex-col @lg:flex-row @lg:items-center p-2 w-fit text-gray-500  gap-2 px-2">
                                        <div className="flex gap-1 bg-gray-300 p-1 px-2 rounded-md w-fit items-center justify-center border border-gray-400">
                                            <h1 className="text-nowrap text-sm">All Students</h1>
                                            <div className="flex h-full w-2 items-center justify-center">
                                                <div className="w-[0.8px] h-4 bg-gray-400"></div>
                                            </div>
                                            <p className="flex items-center text-sm">{exam?.course.workshop.students.length} <User className="size-4"/></p>
                                        </div>
                                        <div className="flex gap-1 bg-green-200 p-1 px-2 rounded-md w-fit items-center justify-center text-green-600 border border-green-600">
                                            <h1 className="text-sm">Finished</h1>
                                            <div className="flex h-full w-2 items-center justify-center">
                                                <div className="w-[0.8px] h-4 bg-green-400"></div>
                                            </div>
                                            <p className="flex items-center text-sm">{answer.filter(e=> e.length != 0).length} <User className="size-4"/></p>
                                        </div>
                                        <div className="flex gap-1 bg-red-200 p-1 px-2 rounded-md w-fit items-center justify-center text-red-600 border border-red-600">
                                            <h1 className="text-nowrap text-sm">Not Finished</h1>
                                            <div className="flex h-full w-2 items-center justify-center">
                                                <div className="w-[0.8px] h-4 bg-red-400"></div>
                                            </div>
                                            <p className="flex items-center text-sm">{answer.filter(e=> e.length == 0).length} <User className="size-4"/></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 overflow-auto ">
                                    {filter.map((student)=> (
                                        <div className="border border-gray-300 hover:border-[#9aa8b7] hover:border-[1.2px] transition-all h-fit rounded-md bg-gray-200 p-2 px-3 @container" key={student.id}>
                                            <div className="w-full flex flex-col @xs:flex-row gap-2 @xs:justify-between">
                                                <div className="flex gap-1 items-center ">
                                                    <div className="text-gray-400 text-nowrap">{exam.question.length} Question</div>
                                                    <div className="w-2 flex justify-center items-center">
                                                        <div className="w-[1.3px] h-5 bg-gray-400"></div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center">
                                                            <p className="text-gray-400">0</p>
                                                            <Check className="size-4 text-gray-400 translate-y-px"/>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="text-gray-400">0</p>
                                                            <X className="size-4 text-gray-400 translate-y-px"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {student.answer.filter((e)=>e.question.exam_id == examid).length != 0 || student.answer_mul.filter((e)=>e.question.exam_id == examid).length != 0 ?
                                                        <div className="flex gap-1 text-sm bg-gray-300 p-1 px-2 rounded-md w-fit  justify-center text-gray-500 border border-gray-400">
                                                        <h1 className="">Not Graded</h1>
                                                        </div>
                                                    :
                                                        ''
                                                    }
                                                    
                                                    {student.answer.filter((e)=>e.question.exam_id == examid).length != 0 || student.answer_mul.filter((e)=>e.question.exam_id == examid).length != 0 ? 
                                                        <div className="flex gap-1 text-sm bg-green-200 p-1 px-2 rounded-md w-fit  justify-center text-green-600 border border-green-600">
                                                            <h1 className="">Finished</h1>
                                                        </div>
                                                    :

                                                        <div className="flex gap-1 text-sm bg-red-200 p-1 px-2 rounded-md w-fit  justify-center text-red-600 border border-red-600">
                                                            <h1 className="">Not Finished</h1>
                                                        </div>
                                                    
                                                    }
                                                    
                                                    
                                                </div>
                                            </div>
                                            <div className="my-2">
                                                <h1 className="font-semibold1">{student.name.toUpperCase()}</h1>
                                                <p className="text-gray-400 text-sm">NIS. {student.nis}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* //dummy */}

                                    {/* <div className="border border-gray-300 hover:border-[#9aa8b7] hover:border-[1.2px] transition-all h-fit rounded-md bg-gray-200 p-2 px-3 @container">
                                        <div className="w-full flex flex-col @xs:flex-row gap-2 @xs:justify-between">
                                            <div className="flex gap-1 items-center ">
                                                <div className="text-gray-400 text-nowrap">10 Question</div>
                                                <div className="w-2 flex justify-center items-center">
                                                    <div className="w-[1.3px] h-5 bg-gray-400"></div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        <p className="text-gray-400">0</p>
                                                        <Check className="size-4 text-gray-400 translate-y-px"/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="text-gray-400">0</p>
                                                        <X className="size-4 text-gray-400 translate-y-px"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex gap-1 text-sm bg-gray-300 p-1 px-2 rounded-md w-fit  justify-center text-gray-500 border border-gray-400">
                                                    <h1 className="">Not Graded</h1>
                                                </div>
                                                <div className="flex gap-1 text-sm bg-green-200 p-1 px-2 rounded-md w-fit  justify-center text-green-600 border border-green-600">
                                                    <h1 className="">Finished</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-2">
                                            <h1 className="font-semibold1">STUDENT NAME</h1>
                                            <p className="text-gray-400 text-sm">NIS. 544241094</p>
                                        </div>
                                    </div>
                                    <div className="border border-gray-300 hover:border-[#9aa8b7] hover:border-[1.2px] transition-all h-fit rounded-md bg-gray-200 p-2 px-3 @container">
                                        <div className="w-full flex flex-col @xs:flex-row gap-2 @xs:justify-between">
                                            <div className="flex gap-1 items-center ">
                                                <div className="text-gray-400 text-nowrap">10 Question</div>
                                                <div className="w-2 flex justify-center items-center">
                                                    <div className="w-[1.3px] h-5 bg-gray-400"></div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        <p className="text-gray-400">8</p>
                                                        <Check className="size-4 text-gray-400 translate-y-px"/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="text-gray-400">2</p>
                                                        <X className="size-4 text-gray-400 translate-y-px"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex gap-1 text-sm bg-green-200 p-1 px-2 rounded-md w-fit  justify-center text-green-600 border border-green-600">
                                                    <h1 className="">80%</h1>
                                                </div>
                                                <div className="flex gap-1 text-sm bg-green-200 p-1 px-2 rounded-md w-fit  justify-center text-green-600 border border-green-600">
                                                    <h1 className="">Finished</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-2">
                                            <h1 className="font-semibold1">STUDENT NAME</h1>
                                            <p className="text-gray-400 text-sm">NIS. 544241094</p>
                                        </div>
                                    </div>
                                    <div className="border border-gray-300 hover:border-[#9aa8b7] hover:border-[1.2px] transition-all h-fit rounded-md bg-gray-200 p-2 px-3 @container">
                                        <div className="w-full flex flex-col @xs:flex-row gap-2 @xs:justify-between">
                                            <div className="flex gap-1 items-center ">
                                                <div className="text-gray-400 text-nowrap">10 Question</div>
                                                <div className="w-2 flex justify-center items-center">
                                                    <div className="w-[1.3px] h-5 bg-gray-400"></div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        <p className="text-gray-400">0</p>
                                                        <Check className="size-4 text-gray-400 translate-y-px"/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="text-gray-400">0</p>
                                                        <X className="size-4 text-gray-400 translate-y-px"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex gap-1 text-sm bg-red-200 p-1 px-2 rounded-md w-fit  justify-center text-red-600 border border-red-600">
                                                    <h1 className="">Not Finished</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-2">
                                            <h1 className="font-semibold1">STUDENT NAME</h1>
                                            <p className="text-gray-400 text-sm">NIS. 544241094</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </TeacherDashboardLayout>
    )
}