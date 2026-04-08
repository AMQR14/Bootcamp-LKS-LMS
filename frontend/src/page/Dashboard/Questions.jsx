import { DeleteIcon, Edit, Trash } from 'lucide-react'
import DashboardLayout from '../../layouts/DashboardLayout'
import {Link, useNavigate} from 'react-router-dom'

export default function Questions(){
    const navigate = useNavigate();

    const edit = () =>{
        navigate('/editquestions')
    }

    return (
        <DashboardLayout>
            <main className="m-8 md:mx-20 text-[#3f454c]">
                <h1 className='font-bold text-2xl text-[#3f454c]'>Questions Dashboard</h1>
                <div>
                    <div className='flex justify-end'>
                        <Link to={'/createquestions'} className='flex justify-center items-center w-24 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Create</Link>
                    </div>
                </div>
                <div className='h-screen my-5'>
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
                </div>
            </main>
        </DashboardLayout>
    )
}