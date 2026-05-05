import DashboardLayout from '../../../layouts/DashboardLayout'
import {Link, useNavigate} from 'react-router-dom'
import {Plus} from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../../../lib/api'

export default function CreateTeachers(){
    const [form, setForm] = useState({
        name: '',
        email: '',
        nip: '',
        nik: '',
        nidn: '',
        date_of_birth: '',
        workshop_id: '',
        course_id: [],
    })
    const [classes, setClasses] = useState([])
    const [courses, setCourses] = useState([])
    const [workshopId, setWorkshopId] = useState([])
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState([])
    const navigate = useNavigate()

    async function getWorkId(e) {
        setWorkshopId(e.target.value)
        console.log(workshopId)
    }

    async function fetchClasses() {
        const res =await api.get('/workshops')
        setClasses(res.data.classes)
    }

    async function fetchCourse() {
        const res = await api.get(`/workshops/${workshopId}`)
        setCourses(res.data.class.courses)
        console.log(res.data.class.courses)
    }

    useEffect(()=>{
        if(workshopId){
            fetchCourse()
        }
    }, [workshopId])
    
    useEffect(()=>{
        fetchClasses()
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    const filter = courses.filter((course)=>
        course.name.toLowerCase().includes(search.toLowerCase())
    )

    const addCourseId = (id) =>{
        setForm(prev => ({
            ...prev, course_id: [...prev.course_id, id]
        }))
    }

    const select = (id) =>{
        setSelected(prev => prev.includes(id) ? prev.filter((i)=> i !== id) : [...prev, id])
    }

    const selectedCourse = courses.filter((course)=>
        selected.includes(course.id)
    )
    
    console.log(selectedCourse)

    console.log(selected)

    async function handleSubmit(e) {
        e.preventDefault()
        setError({})
        setLoading(true)
        try{
            await api.post('/teachers', {
                name: form.name,
                email: form.email,
                nip: form.nip,
                nik: form.nik,
                nidn: form.nidn,
                date_of_birth: form.date_of_birth,
                workshop_id: workshopId,
                course_id: selected,
            });

            navigate('/admin/dashboard/teachers')
        }catch(err){
            if(err.response.status = 422){
                setError(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }

        
    }

    return (
        <>
            <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Create Teacher</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                            <form action="" className='p-4 rounded-xl shadow-md h-full w-full' onSubmit={handleSubmit}>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Name:</label>
                                        <input type="text" placeholder='Enter name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, name: e.target.value})}/>
                                        {error.name && <p className='text-red-500'>{error.name[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Email:</label>
                                        <input type="text" placeholder='Enter email' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, email: e.target.value})}/>
                                        {error.email && <p className='text-red-500'>{error.email[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIK:</label>
                                        <input type="text" placeholder='Enter NIK' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, nik: e.target.value})}/>
                                        {error.nik && <p className='text-red-500'>{error.nik[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIP:</label>
                                        <input type="text" placeholder='Enter NIP' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, nip: e.target.value})}/>
                                        {error.nip && <p className='text-red-500'>{error.nip[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIDN:</label>
                                        <input type="text" placeholder='Enter NIDN' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, nidn: e.target.value})}/>
                                        {error.nidn && <p className='text-red-500'>{error.nidn[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Date of Birth:</label>
                                        <input type="date" placeholder='Enter NIDN' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' onChange={e => setForm({...form, date_of_birth: e.target.value})}/>
                                        {error.date_of_birth && <p className='text-red-500'>{error.date_of_birth[0]}</p>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Class:</label>
                                        <select name="" id="" className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' value={workshopId} onChange={getWorkId}>
                                                <option value="" disabled selected>Select Class</option>
                                            {classes.map((classe)=>(
                                                <option key={classe.id} value={classe.id}>{classe.name}</option>
                                            ))}
                                        </select>
                                        {error.workshop_id && <p className='text-red-500'>{error.workshop_id[0]}</p>}
                                    </div>
                                    {workshopId == '' ? '' :
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="" className='font-bold'>Course:</label>
                                            <div className='flex p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f] gap-1 flex-wrap'>
                                                {selectedCourse.map((course)=>(
                                                    <div key={course.id} className='flex-wrap flex gap-2'>
                                                        <div value={course.id} className={`rounded-md ${selected.includes(course.id) ? 'text-[#5a767f] bg-[#e0e8eb] border-[#b2cbd3]' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}  border  p-1 px-2 text-nowrap cursor-pointer  transition-all `} onClick={()=> select(course.id)}>{course.name}</div>
                                                    </div>
                                                ))}
                                                
                                                <input name="" id="" className='w-full  rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]' value={search} onChange={handleSearch} placeholder='Search...'>
                                                </input>
                                            </div>
                                            <div className='flex-wrap flex gap-3'>
                                                {filter.slice(0,10).map((course)=>(
                                                    <div key={course.id} value={course.id} className={`rounded-md ${selected.includes(course.id) ? 'text-[#5a767f] bg-[#e0e8eb] border-[#b2cbd3]' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}  border  p-1 px-2 text-nowrap cursor-pointer  transition-all`} onClick={()=> select(course.id)}>{course.name}</div>
                                                ))}
                                                {console.log(form)}
                                            </div>
                                            {error.course_id && <p className='text-red-500'>{error.course_id[0]}</p>}
                                        </div>
                                    }
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={loading}>{loading ? 'Creating...': 'Create'}</button>
                                </div>
                            </form>
                            <div className='w-full border-5 border-dashed border-[#E0E8EB] rounded-2xl flex justify-center items-center hover:border-[#c8ced1] transition-all text-[#E0E8EB] hover:text-[#c8ced1]'>
                                <Plus size={200} className=''/>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}