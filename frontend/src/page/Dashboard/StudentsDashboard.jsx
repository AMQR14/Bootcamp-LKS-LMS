import DashboardLayout from '../../layouts/DashboardLayout'
import {Link} from 'react-router-dom'

export default function StudentsDashboard(){
    return (
            <DashboardLayout>
                <main className="flex">
                    <div className="m-8 md:mx-20 \ w-full overflow-hidden">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Students Dashboard</h1>
                        <div>
                            <div className='flex justify-end'>
                                <Link to={'/createstudents'} className='flex justify-center items-center w-24 h-10 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '>Create</Link>
                            </div>
                        </div>
                        <div className='my-6 rounded-md border-collapse border-2 overflow-x-auto border-[#A3BAC2]'>
                            <table className='w-full text-[#3f454c]'>
                                <thead className=''>
                                    <tr >
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>No</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Name</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>NIS</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Class</th>
                                        <th className='border-b-2 border-r-2 p-2 border-[#A3BAC2]'>Email</th>
                                        <th className='border-b-2 p-2 border-[#A3BAC2] w-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border-e border-[#A3BAC2] border-b p-2 '>1</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Course</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Teacher</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Class</td>
                                        <td className='border-e border-[#A3BAC2] border-b p-2'>Enrolled</td>
                                        <td className='border-b p-2 px-6 flex justify-center items-center gap-5 border-[#A3BAC2]'>
                                            <Link to={'/editstudents'} className='flex justify-center items-center w-24 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Edit</Link>
                                            <button className='flex justify-center items-center w-24 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md'>Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border-e border-[#A3BAC2] p-2'>2</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Course</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Teacher</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Class</td>
                                        <td className='border-e border-[#A3BAC2] p-2'>Enrolled</td>
                                        <td className='border-b p-2 px-6 flex justify-center items-center gap-5 border-[#A3BAC2]'>
                                            <Link to={'/editstudents'} className='flex justify-center items-center w-24 h-8 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md'>Edit</Link>
                                            <button className='flex justify-center items-center w-24 h-8 bg-[#d25252] hover:bg-[#ea5e5e] transition-all text-white font-semibold rounded-md'>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </DashboardLayout>
    )
}