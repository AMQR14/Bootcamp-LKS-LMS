import DashboardLayout from '../../../layouts/DashboardLayout'
import {Link, useNavigate} from 'react-router-dom'
import {Plus} from 'lucide-react'

export default function CreateCourses(){
    const navigate = useNavigate()

    const create = () =>{
        navigate('/coursesdashboard')
    }

    return (
        <>
            <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Create Course</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                            <form action="" className='p-4 rounded-xl shadow-md h-105 w-full'>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Course:</label>
                                        <input type="text" placeholder='Enter course name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Teacher:</label>
                                        <input type="text" placeholder='Enter teacher name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Class:</label>
                                        <input type="text" placeholder='Enter class name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' onClick={create}>Create</button>
                                </div>
                            </form>
                            <div className='w-full h-105 border-5 border-dashed border-[#E0E8EB] rounded-2xl flex justify-center items-center hover:border-[#c8ced1] transition-all text-[#E0E8EB] hover:text-[#c8ced1]'>
                                <Plus size={200} className=''/>
                            </div>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}