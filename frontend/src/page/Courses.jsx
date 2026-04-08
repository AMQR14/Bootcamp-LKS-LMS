import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import HomeLayout from "../layouts/HomeLayout"
import {User} from "lucide-react"
import { useState } from "react"


export default function Courses(){
    const [open, setOpen] = useState()
    
    const click = ()=> {
        setOpen(!open)
        console.log('hello')
    }

    const hover = () =>{
        if(open == true){
            setOpen(false)
        }
    }

    return (
        <HomeLayout>
            <div className="m-5">
            <h1 className='font-bold text-2xl text-[#3f454c]'>Courses Collection</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-5">
                        <div className='group/card w-full h-100 border-2 border-[#E0E8EB] hover:border-[#b8bec1] transition-all rounded-xl' onClick={click} onMouseLeave={hover}>
                            <div className='flex overflow-hidden flex-col h-full'>
                                    <div className="w-full h-200 bg-[#60848f] -z-1 rounded-t-md">
                                        <div className={`group-hover/card:visible bg-black/50 backdrop-blur-2xl transition-all opacity-0 w-full invisible h-full rounded-md rounded-b-none ${open ? 'opacity-100' : '' }`}>
                                            <p className="text-white p-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis autem quibusdam quos, dolore quae, repellendus labore distinctio aliquid minus quasi consequatur saepe veniam culpa natus voluptas vel, illum nostrum.</p>
                                        </div>
                                    </div>
                                    
                                <div className="mx-3 my-2 h-full flex flex-col justify-between">
                                    <div>
                                        <p className='text-[#818d9b] mb-2'>Class XI | R41</p>
                                        <h2 className="text-[#3f454c] text-xl font-bold">Matematika</h2>
                                        <h2 className="text-[#687079] text-sm font-semibold">Teacher: OKTAVIANTO</h2>
                                    </div>
                                   <div>
                                        <div className="flex justify-between">
                                            <p className='text-[#818d9b] '>2025/2026</p>
                                            <div className="flex justify-center items-center">
                                                <User color="#818d9b" size={20} strokeWidth={2}/>
                                                <p className='text-[#818d9b]'>420 Enrolled</p>
                                            </div>
                                        </div>
                                   </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div className='group/card w-full h-100 border-2 border-[#E0E8EB] hover:border-[#b8bec1] transition-all rounded-xl' onClick={click} onMouseLeave={hover}>
                            <div className='flex overflow-hidden flex-col h-full'>
                                    <div className="w-full h-200 bg-[#60848f] -z-1 rounded-t-md">
                                        <div className={`group-hover/card:visible bg-black/50 backdrop-blur-2xl transition-all opacity-0 w-full invisible h-full rounded-md rounded-b-none ${open ? 'opacity-100' : '' }`}>
                                            <p className="text-white p-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis autem quibusdam quos, dolore quae, repellendus labore distinctio aliquid minus quasi consequatur saepe veniam culpa natus voluptas vel, illum nostrum.</p>
                                        </div>
                                    </div>
                                    
                                <div className="mx-3 my-2 h-full flex flex-col justify-between">
                                    <div>
                                        <p className='text-[#818d9b] mb-2'>Class XI | R41</p>
                                        <h2 className="text-[#3f454c] text-xl font-bold">Matematika</h2>
                                        <h2 className="text-[#687079] text-sm font-semibold">Teacher: OKTAVIANTO</h2>
                                    </div>
                                   <div>
                                        <div className="flex justify-between">
                                            <p className='text-[#818d9b] '>2025/2026</p>
                                            <div className="flex justify-center items-center">
                                                <User color="#818d9b" size={20} strokeWidth={2}/>
                                                <p className='text-[#818d9b]'>420 Enrolled</p>
                                            </div>
                                        </div>
                                   </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className='group/card w-full h-100 border-2 border-[#E0E8EB] hover:border-[#b8bec1] transition-all rounded-xl' onClick={click} onMouseLeave={hover}>
                            <div className='flex overflow-hidden flex-col h-full'>
                                    <div className="w-full h-200 bg-[#60848f] -z-1 rounded-t-md">
                                        <div className={`group-hover/card:visible bg-black/50 backdrop-blur-2xl transition-all opacity-0 w-full invisible h-full rounded-md rounded-b-none ${open ? 'opacity-100' : '' }`}>
                                            <p className="text-white p-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis autem quibusdam quos, dolore quae, repellendus labore distinctio aliquid minus quasi consequatur saepe veniam culpa natus voluptas vel, illum nostrum.</p>
                                        </div>
                                    </div>
                                    
                                <div className="mx-3 my-2 h-full flex flex-col justify-between">
                                    <div>
                                        <p className='text-[#818d9b] mb-2'>Class XI | R41</p>
                                        <h2 className="text-[#3f454c] text-xl font-bold">Matematika</h2>
                                        <h2 className="text-[#687079] text-sm font-semibold">Teacher: OKTAVIANTO</h2>
                                    </div>
                                   <div>
                                        <div className="flex justify-between">
                                            <p className='text-[#818d9b] '>2025/2026</p>
                                            <div className="flex justify-center items-center">
                                                <User color="#818d9b" size={20} strokeWidth={2}/>
                                                <p className='text-[#818d9b]'>420 Enrolled</p>
                                            </div>
                                        </div>
                                   </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className='group/card w-full h-100 border-2 border-[#E0E8EB] hover:border-[#b8bec1] transition-all rounded-xl' onClick={click} onMouseLeave={hover}>
                            <div className='flex overflow-hidden flex-col h-full'>
                                    <div className="w-full h-200 bg-[#60848f] -z-1 rounded-t-md">
                                        <div className={`group-hover/card:visible bg-black/50 backdrop-blur-2xl transition-all opacity-0 w-full invisible h-full rounded-md rounded-b-none ${open ? 'opacity-100' : '' }`}>
                                            <p className="text-white p-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus perferendis autem quibusdam quos, dolore quae, repellendus labore distinctio aliquid minus quasi consequatur saepe veniam culpa natus voluptas vel, illum nostrum.</p>
                                        </div>
                                    </div>
                                    
                                <div className="mx-3 my-2 h-full flex flex-col justify-between">
                                    <div>
                                        <p className='text-[#818d9b] mb-2'>Class XI | R41</p>
                                        <h2 className="text-[#3f454c] text-xl font-bold">Matematika</h2>
                                        <h2 className="text-[#687079] text-sm font-semibold">Teacher: OKTAVIANTO</h2>
                                    </div>
                                   <div>
                                        <div className="flex justify-between">
                                            <p className='text-[#818d9b] '>2025/2026</p>
                                            <div className="flex justify-center items-center">
                                                <User color="#818d9b" size={20} strokeWidth={2}/>
                                                <p className='text-[#818d9b]'>420 Enrolled</p>
                                            </div>
                                        </div>
                                   </div>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </HomeLayout>
    )
}