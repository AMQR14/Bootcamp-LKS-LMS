import {Book} from 'lucide-react'
import {Link} from 'react-router-dom'

export default function Sidebar(){
    return (
        <aside className="h-screen w-[20%] lg:w-[14%] border-r-2 border-[#A3BAC2] fixed left-0 top-0 bg-white hidden md:block">
                <div className="mt-24 m-2 flex flex-col gap-3 ">
                        <Link to={'/'}>
                            <div className=" hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ">
                                <div className="flex justify-center items-center gap-1">
                                    <Book color="#3f454c" size={18}/><Link to={'/courses'}>Courses</Link>
                                </div>
                            </div>
                        </Link>
                        <Link to={'/'}>
                            <div className=" hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ">
                                <div className="flex justify-center items-center gap-1">
                                    <Book color="#3f454c" size={18}/><Link to={'/courses'}>Teachers</Link>
                                </div>
                            </div>
                        </Link>
                        <Link to={'/'}>
                            <div className=" hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ">
                                <div className="flex justify-center items-center gap-1">
                                    <Book color="#3f454c" size={18}/><Link to={'/courses'}>Users</Link>
                                </div>
                            </div>
                        </Link>
                    </div>
        </aside>
    )
}