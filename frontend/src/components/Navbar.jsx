import { useState } from "react"
import {Home, Book, Users} from 'lucide-react'
import { Link, useNavigate, useLocation } from "react-router-dom"


export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const toggleMenu = () =>{
        setIsOpen(!isOpen)
    }

    const login = () => {
        navigate('/login')
    }

    return (
        <div className="">
            <div className="bg-white h-18 flex items-center sm:justify-between border-b-2 border-[#A3BAC2] justify-between ">
                <div className="flex flex-col gap-2 ml-5 sm:ml-10 sm:hidden" onClick={toggleMenu}>
                    <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                    <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                    <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                </div>
               
                <h1 className="hidden font-bold text-3xl ml-7 text-[#3f454c] sm:block">IPSUM</h1>
                <div className="flex row gap-8 justify-center items-center sm:mr-7 mr-5">
                    <ul className="flex-row text-[#3f454c] gap-6 font-semibold hidden sm:flex">
                        <li className={`hover:text-[#616975] transition-all cursor-pointer ${location.pathname == '/home' ? 'border-b-2' : 'none' }`}>
                            <Link to={'/home'}>Home</Link>
                        </li>
                        <li className={`hover:text-[#616975] transition-all cursor-pointer ${location.pathname == '/courses' ? 'border-b-2' : 'none' }`}>
                            <Link to={'/courses'}>Courses</Link>
                        </li>
                        <li className={`hover:text-[#616975] transition-all cursor-pointer ${location.pathname == '/teachers' ? 'border-b-2' : 'none' }`}>
                            <Link to={'/teachers'}>Teachers</Link>
                        </li>
                    </ul>
                    <div className="w-0.5 h-8 bg-[#A3BAC2]"></div>
                    <div className="flex justify-center items-center gap-5">
                        {/* <h2 className="text-[#3f454c] gap-6 font-semibold hover:text-[#515961]">Sign Up</h2> */}
                        <button className="py-2 px-6 text-white rounded-md bg-[#60848f] font-semibold hover:bg-[#79a4b1] transition-all" onClick={login}>
                            Log In
                        </button>
                    </div>
                </div> 
          </div>
          <div className={`flex-col bg-white h-25 justify-center items-center m-0 ${isOpen ? 'flex' : 'hidden'} sm:hidden`}>
            <div className="hover:bg-[#ececec] h-full w-full text-center transition-all text-[#3f454c] font-semibold flex justify-center items-center">
                <div className={`flex justify-center items-center gap-1 `}>
                    <Home color="#3f454c" size={18}/><Link to={'/home'}>Home</Link>
                </div>
            </div>
            <div className="hover:bg-[#ececec] h-full w-full text-center transition-all text-[#3f454c] font-semibold flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <Book color="#3f454c" size={18}/><Link to={'/courses'}>Courses</Link>
                </div>
            </div>
            <div className="hover:bg-[#ececec] h-full w-full text-center transition-all text-[#3f454c] font-semibold flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <Users color="#3f454c" size={18}/><Link to={'/teachers'}>Teachers</Link>
                </div>
            </div>
          </div> 
        </div>
    )
}