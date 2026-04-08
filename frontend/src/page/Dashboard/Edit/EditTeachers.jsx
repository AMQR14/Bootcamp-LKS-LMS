import DashboardLayout from '../../../layouts/DashboardLayout'
import {Link, useNavigate} from 'react-router-dom'

export default function EditTeachers(){
    const navigate = useNavigate()

    const edit = () =>{
        navigate('/coursesdashboard') 
    } 

    return (
        <>
            <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full md:w-150">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Edit Teacher</h1>
                        <div className='my-6 text-[#3f454c]'>
                            <form action="" className=' p-4 rounded-xl shadow-md h-130'>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Name:</label>
                                        <input type="text" placeholder='Enter name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>NIP:</label>
                                        <input type="text" placeholder='Enter NIP' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Class:</label>
                                        <input type="text" placeholder='Enter class name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Course:</label>
                                        <input type="text" placeholder='Enter course name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' onClick={edit}>Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
        </>
    )
}