import DashboardLayout from '../layouts/DashboardLayout'

export default function Profile(){
    return (
        <DashboardLayout>
            <main className="flex">
                    <div className="m-8 w-full">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Profile</h1>
                        <div className='my-6 text-[#3f454c] flex flex-col lg:flex-row gap-x-8 gap-y-8'>
                            <form action="" className='p-4 rounded-xl shadow-md h-140 sm:h-125 w-full lg:w-190'>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-3'>
                                        <label htmlFor="" className='font-bold'>Profile Picture:</label>
                                        <div className='flex gap-8 items-center flex-col sm:flex-row'>
                                            <div className='w-27 h-27 bg-gray-300 rounded-full'></div>
                                            <input type="file" className="block text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-[#7098a4] file:transition-all file:bg-[#60848f]" />   
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Name:</label>
                                        <input type="text" placeholder='Enter course name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Email:</label>
                                        <input type="text" placeholder='Enter course name' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'/>
                                    </div>
                                    <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
        </DashboardLayout>
    )
}