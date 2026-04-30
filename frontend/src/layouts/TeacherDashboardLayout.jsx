import Navbar2 from "../components/Navbar2"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import {User, Book, LayoutDashboard, GraduationCap, Users, CircleQuestionMark, Settings, Clipboard, FileQuestion} from 'lucide-react'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import api from '../lib/api'


export default function TeacherDashboardLayout({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const [moreInfo, setMoreInfo] = useState(false)
    const location = useLocation()
    const {logout} = useAuth()
    const {id} = useParams()
    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    async function fetchUser() {
        try{
            const res = await api.get('/user')
            setUser(res.data.user)
            // console.log(res.data)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    }, [])

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
                        <h1 className="hidden font-bold text-3xl ml-7 text-[#3f454c] md:block">IPSUM</h1>
                        <div className="flex row gap-8 justify-center items-center sm:mr-7 mr-5">
                            <div className="w-0.5 h-8 bg-[#A3BAC2]"></div>
                            <div className="flex justify-center items-center gap-5">
                                <h2 className="text-[#3f454c] font-semibold hidden md:block">{loading ? 'loading...' : user.role === 'admin' ? user.email : user.role === 'student' ? user.student?.name?.toUpperCase() : user.teacher?.name?.toUpperCase() }</h2>
                                <div className="w-11 h-11 rounded-full bg-[#9aa8b7]" onClick={shown}></div>
                            </div>
                        </div> 
                </div>
            </nav>
            <div className="flex fixed jus w-full justify-end text-[#3f454c]">
                    <div className={`w-45 h-50 bg-white shadow-md border-[1.5px] border-t-0 border-r-0 border-[#A3BAC2] rounded-bl-md ${moreInfo ? 'flex' : 'hidden' }`}>
                        <div className="flex flex-col justify-between w-full h-full">
                            <div className="m-3">
                                <div className="mb-1 leading-5">{loading ? 'loading...' : user.role == 'admin' ? user.email : user.role === 'student' ? user.student?.name?.toUpperCase() : user.teacher?.name?.toUpperCase()}</div>
                                <div className="text-sm text-[#707984]">{loading ? 'loading...' : user.role[0]?.toUpperCase() + user.role.slice(1)}</div>
                            </div>
                            <div className="m-3 text-[#A3BAC2]">
                                <Link to={`/teacher/dashboard/${user?.id}/profile`}>
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
                        <Link to={'/teacher/dashboard'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/teacher/dashboard' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <LayoutDashboard color="#3f454c" size={18}/>Dashboard
                                </div>
                            </div>
                        </Link>
                        <Link to={`/teacher/dashboard/${user?.id}/profile`}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname === `/teacher/dashboard/${user?.id}/profile` ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <User color="#3f454c" size={18}/>Profile
                                </div>
                            </div>
                        </Link>
                        {/* <Link to={'/admin/dashboard/courses'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/admin/dashboard/courses' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <Book color="#3f454c" size={18}/>Courses
                                </div>
                            </div>
                        </Link>
                        <Link to={'/admin/dashboard/exams'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/admin/dashboard/exams' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <FileQuestion color="#3f454c" size={18}/>Exams
                                </div>
                            </div>
                        </Link> */}
                        {/* <Link to={'/admin/dashboard/questions'}>
                            <div className={`hover:bg-[#E0E8EB] hover:border-l-8 hover:font-bold h-full w-full transition-all text-[#3f454c] font-semibold py-2 ${location.pathname == '/admin/dashboard/questions' ? 'border-l-8 ' : 'none'}`}>
                                <div className="flex ml-8 items-center gap-1">
                                    <CircleQuestionMark color="#3f454c" size={18}/>Questions
                                </div>
                            </div>
                        </Link> */}
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