import Navbar2 from "../components/Navbar2"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import {Home, Book, LayoutDashboard, GraduationCap, Users, CircleQuestionMark} from 'lucide-react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"


export default function HomeLayout({children}){
    const [isOpen, setIsOpen] = useState(false);
    const [moreInfo, setMoreInfo] = useState(false)
    const location = useLocation()
    const {logout} = useAuth()
    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    if(!token){
        navigate('/home')
    }

    const toggled = () => {
        setIsOpen(!isOpen)
    } 

    const shown = () => {
        setMoreInfo(!moreInfo)
    } 

    const isShown = () =>{
        if(moreInfo == true){
            setMoreInfo(false)
        }
    }

    return (
        <>
            <nav className="sticky top-0 z-10">
                    <div className="bg-white h-18 flex items-center sm:justify-between border-b-2 border-[#A3BAC2] justify-between ">
                        <div className="flex flex-col gap-2 ml-5 md:ml-10 md:hidden" onClick={toggled}>
                            <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                            <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                            <div className="h-0.75 w-7 bg-[#3f454c]"></div>
                        </div>
                        <h1 className="hidden font-bold text-3xl ml-7 text-[#3f454c] md:block">LOGO</h1>
                        <div className="flex row gap-8 justify-center items-center sm:mr-7 mr-5">
                            <div className="w-0.5 h-8 bg-[#A3BAC2]"></div>
                            <div className="flex justify-center items-center gap-5">
                                <h2 className="text-[#3f454c] font-semibold hidden md:block">ANDI MUHAMMAD QISMAT RAJJAB</h2>
                                <div className="w-11 h-11 rounded-full bg-[#9aa8b7]" onClick={shown}></div>
                            </div>
                        </div> 
                </div>
            </nav>
            <div className="flex fixed jus w-full justify-end text-[#3f454c]">
                    <div className={`w-45 h-50 bg-white shadow-md border-[1.5px] border-t-0 border-r-0 border-[#A3BAC2] rounded-bl-md ${moreInfo ? 'flex' : 'hidden' }`}>
                        <div className="flex flex-col justify-between h-full">
                            <div className="m-3">
                                <div className="mb-1 leading-5">Andi Muhammad Qismat Rajjab</div>
                                <div className="text-sm text-[#707984]">Student</div>
                            </div>
                            <div className="m-3 text-[#A3BAC2]">
                                <Link to={'/profile'}>
                                    <button className="mb-2 py-1.25 px-3 text-white bg-[#60848f] hover:bg-[#739daa] transition-all font-semibold rounded-md flex justify-center w-full">Profile</button>
                                </Link>
                                <hr className="border-[1.2px]"/>
                                    <button className="mt-2 py-1.25 px-3 text-white bg-[#d25252] hover:bg-[#ea5e5e] transition-all font-semibold rounded-md flex justify-center w-full" onClick={()=> logout()}>Log out</button>
                            </div>
                        </div>
                    </div>
                </div>
            <main className="min-h-screen ml-full md:ml-50" onClick={isShown}>
                <aside className={`h-screen w-[20%] lg:w-[14%] border-r-2 border-[#A3BAC2] fixed left-0 top-0 bg-white ${isOpen ? 'block' : 'hidden'} md:block min-w-50`}>
                    <div className="mt-24 m-2 flex flex-col gap-3 ">
                        <Link to={'/dashboard'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/dashboard' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <LayoutDashboard color="#3f454c" size={18}/>Dashboard
                                </div>
                            </div>
                        </Link>
                        <Link to={'/coursesdashboard'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/coursesdashboard' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <Book color="#3f454c" size={18}/>Courses
                                </div>
                            </div>
                        </Link>
                        <Link to={'/dashboardteachers'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/dashboardteachers' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <GraduationCap color="#3f454c" size={18}/>Teachers
                                </div>
                            </div>
                        </Link>
                        <Link to={'/dashboardstudents'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/dashboardstudents' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <Users color="#3f454c" size={18}/>Students
                                </div>
                            </div>
                        </Link>
                        <Link to={'/questions'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/questions' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <CircleQuestionMark color="#3f454c" size={18}/>Questions
                                </div>
                            </div>
                        </Link>
                    </div>
                </aside>
                {children}
            </main>
            <footer className="z-10">
                <Footer/>
            </footer>
        </>
    )
}