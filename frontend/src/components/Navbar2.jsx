import { useState } from "react"
import {Home, Book, Users, LayoutDashboard} from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import Dashboard from "../page/Dashboard/Dashboard"


export default function Navbar({opened}){
    const [isOpen, setIsOpen] = useState()
    const navigate = useNavigate()

    const toggleMenu = () =>{
        setIsOpen(!isOpen)
    }

    const login = () => {
        navigate('/login')
    }

    return (
        <nav className="sticky top-0 z-10">
            <div className="bg-white h-18 flex items-center sm:justify-between border-b-2 border-[#A3BAC2] justify-between ">
                <div className="flex flex-col gap-2 ml-5 md:ml-10 md:hidden" onClick={toggleMenu} >
                    <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                    <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                    <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                </div>
               
                <h1 className="hidden font-bold text-3xl ml-7 text-[#3f454c] md:block">LOGO</h1>
                <div className="flex row gap-8 justify-center items-center sm:mr-7 mr-5">
                    {/* <ul className="flex-row text-[#3f454c] gap-6 font-semibold hidden sm:flex">
                        <li className="hover:text-[#616975] transition-all cursor-pointer">W
                            <Link to={'/home'}>Home</Link>
                        </li>
                        <li className="hover:text-[#616975] transition-all cursor-pointer">
                            <Link to={'/dashboard'}>Dashboard</Link>
                        </li>
                        <li className="hover:text-[#616975] transition-all cursor-pointer">
                            <Link to={'/courses'}>Courses</Link>
                        </li>
                        <li className="hover:text-[#616975] transition-all cursor-pointer">
                            <Link to={'/teachers'}>Teachers</Link>
                        </li>
                    </ul> */}
                    <div className="w-0.5 h-8 bg-[#A3BAC2]"></div>
                    <div className="flex justify-center items-center gap-5">
                        <h2 className="text-[#3f454c] font-semibold hidden md:block">ANDI MUHAMMAD QISMAT RAJJAB</h2>
                        <div className="w-11 h-11 rounded-full bg-[#9aa8b7]"></div>
                    </div>
                </div> 
          </div>
          <div className={`flex-col bg-white h-25 justify-center items-center m-0 ${isOpen ? 'flex' : 'hidden'} sm:hidden`}>
            <div className="hover:bg-[#ececec] h-full w-full text-center transition-all text-[#3f454c] font-semibold flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <Home color="#3f454c" size={18}/><Link to={'/home'}>Home</Link>
                </div>
            </div>
            <div className="hover:bg-[#ececec] h-full w-full text-center transition-all text-[#3f454c] font-semibold flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <LayoutDashboard color="#3f454c" size={18}/><Link to={'/dashboard'}>Dashboard</Link>
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
        </nav>
    )
}