import HomeLayout from "../layouts/HomeLayout"
import Teach from '../assets/teach.jpg'
import Teach2 from '../assets/teach2.jpg'
import Misbah from '../assets/misbah.jpg'
import { useEffect, useState } from "react"

export default function Teachers(){
    const [more, setMore] = useState(false)
    
    const open = () => {
        setMore(!more)
    }

    const hover = () => {
        if(more == true){
            setMore(!more)
        }
    }

    return (
        <HomeLayout>
            <main className="">
                <div className="flex-row lg:flex gap-8 m-8 mx-15">
                    <div className="shadow-lg w-full mb-4 lg:mb-0 lg:h-screen rounded-xl border-[#A3BAC2] border-2">
                        <div className="m-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-8">
                            <div className="group/item w-full h-75 rounded-lg relative transition-all hover:scale-101 translate-all" onClick={open} onMouseLeave={hover}>
                                <img src={Misbah} alt="" className="rounded-lg shadow-md -z-1 w-full h-full object-cover object-top"/>
                                <div className={`${more ? 'bg-linear-to-b from-transparent to-black/50 h-full' : 'rounded-t-none bg-black/50 h-fit'} w-full absolute opacity-0 hover:visible group-hover/item:opacity-100 :not:hover: transition-all flex flex-col items-center justify-end rounded-lg bottom-0 duration-600 backdrop-blur-md `}>
                                    <div className="flex flex-col items-center my-5 overflow-auto">
                                        {more ? 
                                        <p className="text-white m-4 my-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, a placeat nostrum sapiente sint quas odit cumque eaque aliquid non quam dolores, officiis suscipit, fugiat quod. Corporis adipisci provident facilis!</p>
                                            : ''
                                        }
                                        <p className="text-white font-semibold">OKTAVIANTO</p>
                                        <p className="text-white font text-sm">XI RPL 4</p>
                                    </div>
                                </div>
                            </div>
                            <div className="group/item w-full h-75 rounded-lg relative transition-all hover:scale-101 translate-all" onClick={open} onMouseLeave={hover}>
                                <img src={Teach2} alt="" className="rounded-lg shadow-md -z-1 w-full h-full object-cover "/>
                                <div className={`${more ? 'bg-linear-to-b from-transparent to-black/50 h-full' : 'rounded-t-none bg-black/50 h-fit'} w-full absolute opacity-0 hover:visible group-hover/item:opacity-100 transition-all flex flex-col items-center justify-end rounded-lg bottom-0 duration-600 backdrop-blur-md`}>
                                    <div className="flex flex-col items-center my-5 overflow-auto">
                                        {more ? 
                                        <p className="text-white m-4 my-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, a placeat nostrum sapiente sint quas odit cumque eaque aliquid non quam dolores, officiis suscipit, fugiat quod. Corporis adipisci provident facilis!</p>
                                            : ''
                                        }
                                        <p className="text-white font-semibold">OKTAVIANTO</p>
                                        <p className="text-white font text-sm">XI RPL 4</p>
                                    </div>
                                </div>
                            </div>
                            <div className="group/item w-full h-75 rounded-lg relative transition-all hover:scale-101 translate-all" onClick={open} onMouseLeave={hover}>
                                <img src={Teach} alt="" className="rounded-lg shadow-md -z-1 w-full h-full object-cover "/>
                                <div className={`${more ? 'bg-linear-to-b from-transparent to-black/50 h-full' : 'rounded-t-none bg-black/50 h-fit'} w-full absolute opacity-0 hover:visible group-hover/item:opacity-100 transition-all flex flex-col items-center justify-end rounded-lg bottom-0 duration-600 backdrop-blur-md`}>
                                    <div className="flex flex-col items-center my-5 overflow-auto">
                                        {more ? 
                                        <p className="text-white m-4 my-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, a placeat nostrum sapiente sint quas odit cumque eaque aliquid non quam dolores, officiis suscipit, fugiat quod. Corporis adipisci provident facilis!</p>
                                            : ''
                                        }
                                        <p className="text-white font-semibold">OKTAVIANTO</p>
                                        <p className="text-white font text-sm">XI RPL 4</p>
                                    </div>
                                </div>
                            </div>
                            <div className="group/item w-full h-75 rounded-lg relative transition-all hover:scale-101 translate-all" onClick={open} onMouseLeave={hover}>
                                <img src={Teach2} alt="" className="rounded-lg shadow-md -z-1 w-full h-full object-cover "/>
                                <div className={`${more ? 'bg-linear-to-b from-transparent to-black/50 h-full' : 'rounded-t-none bg-black/50 h-fit'} w-full absolute opacity-0 hover:visible group-hover/item:opacity-100 transition-all flex flex-col items-center justify-end rounded-lg bottom-0 duration-600 backdrop-blur-md`}>
                                    <div className="flex flex-col items-center my-5 overflow-auto">
                                        {more ? 
                                        <p className="text-white m-4 my-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, a placeat nostrum sapiente sint quas odit cumque eaque aliquid non quam dolores, officiis suscipit, fugiat quod. Corporis adipisci provident facilis!</p>
                                            : ''
                                        }
                                        <p className="text-white font-semibold">OKTAVIANTO</p>
                                        <p className="text-white font text-sm">XI RPL 4</p>
                                    </div>
                                </div>
                            </div>
                            <div className="group/item w-full h-75 rounded-lg relative transition-all hover:scale-101 translate-all" onClick={open} onMouseLeave={hover}>
                                <img src={Teach} alt="" className="rounded-lg shadow-md -z-1 w-full h-full object-cover"/>
                                <div className={`${more ? 'bg-linear-to-b from-transparent to-black/50 h-full' : 'rounded-t-none bg-black/50 h-fit'} w-full absolute opacity-0 hover:visible group-hover/item:opacity-100 transition-all flex flex-col items-center justify-end rounded-lg bottom-0 duration-600 backdrop-blur-md`}>
                                    <div className="flex flex-col items-center my-5 overflow-auto">
                                        {more ? 
                                        <p className="text-white m-4 my-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, a placeat nostrum sapiente sint quas odit cumque eaque aliquid non quam dolores, officiis suscipit, fugiat quod. Corporis adipisci provident facilis!</p>
                                            : ''
                                        }
                                        <p className="text-white font-semibold">OKTAVIANTO</p>
                                        <p className="text-white font text-sm">XI RPL 4</p>
                                    </div>
                                </div>
                            </div>
                            <div className="group/item w-full h-75 rounded-lg relative transition-all hover:scale-101 translate-all" onClick={open}>
                                <img src={Teach2} alt="" className="rounded-lg shadow-md -z-1 w-full h-full object-cover "/>
                                <div className={`${more ? 'bg-linear-to-b from-transparent to-black/50 h-full' : 'rounded-t-none bg-black/50 h-fit'} w-full absolute opacity-0 hover:visible group-hover/item:opacity-100 transition-all flex flex-col items-center justify-end rounded-lg bottom-0 duration-600 backdrop-blur-md`}>
                                    <div className="flex flex-col items-center my-5 overflow-auto">
                                        {more ? 
                                        <p className="text-white m-4 my-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, a placeat nostrum sapiente sint quas odit cumque eaque aliquid non quam dolores, officiis suscipit, fugiat quod. Corporis adipisci provident facilis!</p>
                                            : ''
                                        }
                                        <p className="text-white font-semibold">OKTAVIANTO</p>
                                        <p className="text-white font text-sm">XI RPL 4</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 w-full lg:w-[25%] h-full lg:h-screen rounded-xl border-[#A3BAC2] bg-[#E0E8EB]">
                        <div className="m-4">
                            <div className="text-[#A3BAC2] font-semibold text-center text-xl">Active Teachers</div>
                            <div className="text-[#A3BAC2] font-semibold text-center text-md">Online users 2</div>
                            <div className="my-6">
                                <div className="bg-white w-full h-16 my-2 rounded-md flex items-center">
                                    <div className="mx-4 gap-3 flex text-[#3f454c] items-center">
                                        <div className="bg-gray-400 w-8 h-8 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <p className="text-md">OKTAVIANTO</p>
                                            <p className="text-[11px]">NIP.544241094</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white w-full h-16 my-2 rounded-md flex items-center">
                                    <div className="mx-4 gap-3 flex text-[#3f454c] items-center">
                                        <div className="bg-gray-400 w-8 h-8 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <p className="text-md">OKTAVIANTO</p>
                                            <p className="text-[11px]">NIP.544241094</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white w-full h-16 my-2 rounded-md flex items-center">
                                    <div className="mx-4 gap-3 flex text-[#3f454c] items-center">
                                        <div className="bg-gray-400 w-8 h-8 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <p className="text-md">OKTAVIANTO</p>
                                            <p className="text-[11px]">NIP.544241094</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white w-full h-16 my-2 rounded-md flex items-center">
                                    <div className="mx-4 gap-3 flex text-[#3f454c] items-center">
                                        <div className="bg-gray-400 w-8 h-8 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <p className="text-md">OKTAVIANTO</p>
                                            <p className="text-[11px]">NIP.544241094</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    )
}