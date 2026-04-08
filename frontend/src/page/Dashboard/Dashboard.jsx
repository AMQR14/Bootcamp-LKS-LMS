import Dashboardlayout from '../../layouts/DashboardLayout'

export default function Dashboard(){
    return (
        <Dashboardlayout>
            <main className="flex ">
                <div className="m-8 md:mx-20  w-full ">
                    <h1 className='font-bold text-2xl text-[#3f454c]'>Dashboard</h1>
                    <div className='flex gap-6 flex-col'>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
                            <div className="w-full h-40 bg-[#E0E8EB] rounded-xl border border-[#b2cbd3]"></div>
                            <div className="w-full h-40 bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]"></div>
                            <div className="w-full h-40 bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]"></div>
                            <div className="w-full h-40 bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]"></div>
                        </div>
                        <div className='sm:flex sm:w-full gap-6'>
                            <div className="sm:h-full w-full shadow-current-xl rounded-xl md:w-[70%] mb-6">
                                <div className="w-full h-120 bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]"></div>
                            </div>
                            <div className='sm:w-[30%] w-full'>
                                <div className='w-full h-120 bg-[#E0E8EB] rounded-xl border border-[#A3BAC2]'>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Dashboardlayout>
    )
}