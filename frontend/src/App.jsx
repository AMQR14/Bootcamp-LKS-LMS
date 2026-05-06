import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from './page/Login'
import LandingPage from "./page/LandingPage"
import Courses from "./page/Courses"
import Teachers from "./page/Teachers"
import Dashboard from "./page/Dashboard/Dashboard"
import CoursesDashboard from "./page/Dashboard/CoursesDashboard"
import CreateCourses from "./page/Dashboard/Create/CreateCourses"
import EditCourses from "./page/Dashboard//Edit/EditCourses"
import TeachersDashboard from "./page/Dashboard/TeachersDashboard"
import StudentsDashboard from "./page/Dashboard/StudentsDashboard"
import CreateStudents from "./page/Dashboard/Create/CreateStudents"
import CreateTeachers from "./page/Dashboard/Create/CreateTeachers"
import EditStudents from "./page/Dashboard/Edit/EditStudents"
import EditTeachers from "./page/Dashboard/Edit/EditTeachers"
import Profile from "./page/Profile"
import Questions from "./page/Dashboard/QuestionsDashboard"
import CreateQuestions from "./page/Dashboard/Create/CreateQuestions"
import EditQuestions from "./page/Dashboard/Edit/EditQuestions"
import UserDashboard from "./page/Dashboard/UserDashboard"
import CreateUsers from "./page/Dashboard/Create/CreateUsers"
import EditUsers from "./page/Dashboard/Edit/EditUsers"
import ClassDashboard from "./page/Dashboard/ClassDashboard"
import CreateClasses from "./page/Dashboard/Create/CreateClasses"
import EditClasses from "./page/Dashboard/Edit/EditClasses"
import ExamsDashboard from "./page/Dashboard/ExamsDashboard"
import EditExams from "./page/Dashboard/Edit/EditExams"
import CreateExams from "./page/Dashboard/Create/CreateExams"
import DetailTeachers from "./page/Dashboard/Detail/DetailTeacher"
import DetailStudent from "./page/Dashboard/Detail/DetailStudent"
import StudentDashboard from "./page/Student/StudentDashboard"
import TeacherDashboard from "./page/Teacher/TeacherDashboard"
import StudentProfile from "./page/Student/StudentProfile"
import StudentCourse from "./page/Student/StudentCourse"
import StudentExam from "./page/Student/StudentExam"
import TeacherProfile from "./page/Teacher/TeacherProfile"
import TeacherCourse from "./page/Teacher/TeacherCourse"
import TeacherExamQuestion from "./page/Teacher/TeacherExamQuestion"
import TeacherExam from "./page/Teacher/TeacherExam"


import { AuthProvider, useAuth } from "./contexts/AuthContext"
import NotFound from "./page/NotFound"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"

function AdminRoute(){
  const {user, loading} = useAuth()
  const token = localStorage.getItem('token')

  if(loading) return <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>
  
  if(!token) return <Navigate to={'/home'}/>
  if(user.user.role != 'admin') return <Navigate to={'/home'}/>

  return <Outlet/>
}

function StudentRoute(){
  const {user, loading} = useAuth()
  const token = localStorage.getItem('token')

  if(loading) return <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>
  
  if(!token) return <Navigate to={'/home'}/>
  if(user.user.role != 'student') return <Navigate to={'/home'}/>

  return <Outlet/>
}

function TeacherRoute(){
  const {user, loading} = useAuth()
  const token = localStorage.getItem('token')

  if(loading) return <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>
  
  if(!token) return <Navigate to={'/home'}/>
  if(user.user.role != 'teacher') return <Navigate to={'/home'}/>

  return <Outlet/>
}

function PublicRoute(){
  const {user, loading} = useAuth()
  const token = localStorage.getItem('token')

  if(loading) return <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>

  if(token) return <Navigate to={user.user?.role == 'admin' ? '/admin/dashboard' : user.user?.role == 'student' ? '/student/dashboard' : '/teacher/dashboard'}/>

  return <Outlet/>
}

function AppRoutes(){
  const {user} = useAuth()
  // console.log(user)

  return (
    <Routes>

      <Route path="*" element={<NotFound/>}/>

      <Route element={<PublicRoute/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<LandingPage/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
      </Route>

      <Route element={<StudentRoute/>}>
        <Route path="/student/dashboard" element={<StudentDashboard/>}/>
        <Route path="/student/dashboard/profile" element={<StudentProfile/>}/>
        <Route path="/student/dashboard/course/:courseid" element={<StudentCourse/>}/>
        <Route path="/student/dashboard/course/:courseid/exam/:examid" element={<StudentExam/>}/>
      </Route>

      <Route element={<TeacherRoute/>}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
        <Route path="/teacher/dashboard/profile" element={<TeacherProfile/>}/>
        <Route path="/teacher/dashboard/course/:courseid" element={<TeacherCourse/>}/>
        <Route path="/teacher/dashboard/course/:courseid/exam/:examid" element={<TeacherExam/>}/>
        <Route path="/teacher/dashboard/course/:courseid/exam/:examid/questions" element={<TeacherExamQuestion/>}/>
      </Route>
      
      <Route element={<AdminRoute/>}>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/dashboard/:id/profile" element={<Profile/>}/>

        <Route path="/admin/dashboard/classes/:classid/courses" element={<CoursesDashboard/>}/>
        <Route path="/admin/dashboard/classes/:id/courses/create" element={<CreateCourses/>}/>
        <Route path="/admin/dashboard/classes/:classid/courses/:courseid/edit" element={<EditCourses/>}/>

        <Route path="/admin/dashboard/teachers" element={<TeachersDashboard/>}/>
        <Route path="/admin/dashboard/teachers/create" element={<CreateTeachers/>}/>
        <Route path="/admin/dashboard/teachers/:id/edit" element={<EditTeachers/>}/>
        <Route path="/admin/dashboard/teachers/:id/detail" element={<DetailTeachers/>}/>

        <Route path="/admin/dashboard/students" element={<StudentsDashboard/>}/>
        <Route path="/admin/dashboard/students/create" element={<CreateStudents/>}/>
        <Route path="/admin/dashboard/students/:id/edit" element={<EditStudents/>}/>
        <Route path="/admin/dashboard/students/:id/detail" element={<DetailStudent/>}/>
        
        <Route path="/admin/dashboard/classes/:classid/courses/:courseid/exams/:examid/questions" element={<Questions/>} /> 
        <Route path="/admin/dashboard/classes/:classid/courses/:courseid/exams/:examid/questions/create" element={<CreateQuestions/>}/>
        <Route path="/admin/dashboard/classes/:classid/courses/:courseid/exams/:examid/questions/:questionid/edit" element={<EditQuestions/>}/>

        <Route path="/admin/dashboard/users" element={<UserDashboard/>}/>
        <Route path="/admin/dashboard/users/create" element={<CreateUsers/>}/>
        <Route path="/admin/dashboard/users/:id/edit" element={<EditUsers/>}/>

        <Route path="/admin/dashboard/classes" element={<ClassDashboard/>}/>
        <Route path="/admin/dashboard/class/create" element={<CreateClasses/>}/>
        <Route path="/admin/dashboard/class/:id/edit" element={<EditClasses/>}/>
        
        <Route path="/admin/dashboard/exams" element={<ExamsDashboard/>}/>
        <Route path="/admin/dashboard/exams/create" element={<CreateExams/>}/>
        <Route path="/admin/dashboard/classes/:classid/courses/:courseid/exams/:examid/edit" element={<EditExams/>}/>
      </Route>
    </Routes>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>  
      </BrowserRouter>
    </AuthProvider>
  )
}