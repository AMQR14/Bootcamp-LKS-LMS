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

                <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                            <table className='min-w-200 w-full text-[#3f454c]'>
                                <thead className=''>
                                    <tr >
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Name</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Teacher</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Subject</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Class</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Type</th>
                                        <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 '>1</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Course</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 text-wrap'>Soal Ulangan Matematika Kelas XI RPL 1</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Class</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Date</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Date</td>
                                        <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                            <div className="flex justify-center items-center gap-5">
                                            <Link to={'/editteachers'} className='flex justify-center items-center w-24 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Edit</Link>
                                            <button className='flex justify-center items-center w-24 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border-e border-[#A3BAC2] p-2'>2</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Course</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Teacher</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Class</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Date</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Date</td>
                                        <td className='border-b p-2 px-6 border-[#A3BAC2]'>
                                            <div className="flex justify-center items-center gap-5">
                                            <Link to={'/editteachers'} className='flex justify-center items-center w-24 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Edit</Link>
                                            <button className='flex justify-center items-center w-24 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md'>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

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