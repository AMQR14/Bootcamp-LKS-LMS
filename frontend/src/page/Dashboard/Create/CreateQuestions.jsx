import { useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'

export default function createquestions(){
    const [checked, setChecked] = useState('mul-choice')
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setChecked(e.target.value)
    }

    const create = () =>{
        navigate('/questions')
    }

    return (
        <DashboardLayout>
            <main className="flex text-[#3f454c]" >
                    <div className="m-8 md:mx-20 w-full ">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Create Questions</h1>
                        <div className='my-6 text-[#3f454c]'>
                            <form action="" className=' p-4 rounded-xl shadow-md h-full'>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Question:</label>
                                        <textarea type="text" placeholder='Enter question' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <div className=' flex gap-6'>
                                        <div className='flex gap-1'>
                                            <input type="radio" name='question-type' value='mul-choice' checked={checked == 'mul-choice'} onChange={handleChange}/>
                                            <label>Multiple Choice</label>
                                        </div>
                                        <div className='flex gap-1'>
                                            <input type="radio" name='question-type' value='essay' checked={checked == 'essay'} onChange={handleChange}/>
                                            <label>Essay</label>
                                        </div>
                                    </div>
                                    {checked == 'mul-choice' ?
                                        <div className='flex flex-col gap-6'>
                                            <div className='flex gap-1 border-[#E0E8EB] border-2 rounded p-1 w-full md:w-100'>
                                                <div className='flex gap-2 px-2 w-full'>
                                                    <input type="radio" name='question'/>
                                                    <input type="text" className='w-full outline-none' placeholder='Enter choice 1'/>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 border-[#E0E8EB] border-2 rounded p-1 w-full md:w-100'>
                                                <div className='flex gap-2 px-2 w-full'>
                                                    <input type="radio" name='question'/>
                                                    <input type="text" className='w-full outline-none' placeholder='Enter choice 2'/>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 border-[#E0E8EB] border-2 rounded p-1 w-full md:w-100'>
                                                <div className='flex gap-2 px-2 w-full'>
                                                    <input type="radio" name='question'/>
                                                    <input type="text" className='w-full outline-none' placeholder='Enter choice 3'/>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 border-[#E0E8EB] border-2 rounded p-1 w-full md:w-100'>
                                                <div className='flex gap-2 px-2 w-full'>
                                                    <input type="radio" name='question'/>
                                                    <input type="text" className='w-full outline-none' placeholder='Enter choice 4'/>
                                                </div>
                                            </div>
                                        </div>
                                    : ''}

                                    {checked == 'essay' ?
                                        <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Answer:</label>
                                        <textarea type="text" placeholder='Enter answer' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                        </div>
                                    : ''}
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' onClick={create}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
        </DashboardLayout>
    )
}