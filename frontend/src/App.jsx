import { BrowserRouter, Route, Routes } from "react-router-dom"
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
import DetailTeachers from "./page/Dashboard/DetailTeacher"
import { AuthProvider } from "./contexts/AuthContext"

function AppRoutes(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<LandingPage/>}/>
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/teachers" element={<Teachers/>}/>

      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/admin/dashboard/profile" element={<Profile/>}/>

      <Route path="/admin/dashboard/courses" element={<CoursesDashboard/>}/>
      <Route path="/admin/dashboard/courses/create" element={<CreateCourses/>}/>
      <Route path="/admin/dashboard/courses/:id/edit" element={<EditCourses/>}/>

      <Route path="/admin/dashboard/teachers" element={<TeachersDashboard/>}/>
      <Route path="/admin/dashboard/teachers/create" element={<CreateTeachers/>}/>
      <Route path="/admin/dashboard/teachers/:id/edit" element={<EditTeachers/>}/>
      <Route path="/admin/dashboard/teachers/:id/detail" element={<DetailTeachers/>}/>

      <Route path="/admin/dashboard/students" element={<StudentsDashboard/>}/>
      <Route path="/admin/dashboard/students/create" element={<CreateStudents/>}/>
      <Route path="/admin/dashboard/students/:id/edit" element={<EditStudents/>}/>
      
      <Route path="/admin/dashboard/questions" element={<Questions/>} /> 
      <Route path="/admin/dashboard/questions/create" element={<CreateQuestions/>}/>
      <Route path="/admin/dashboard/questions/:id/edit" element={<EditQuestions/>}/>

      <Route path="/admin/dashboard/users" element={<UserDashboard/>}/>
      <Route path="/admin/dashboard/users/create" element={<CreateUsers/>}/>
      <Route path="/admin/dashboard/users/:id/edit" element={<EditUsers/>}/>

      <Route path="/admin/dashboard/classes" element={<ClassDashboard/>}/>
      <Route path="/admin/dashboard/class/create" element={<CreateClasses/>}/>
      <Route path="/admin/dashboard/class/:id/edit" element={<EditClasses/>}/>
      
      <Route path="/admin/dashboard/exams" element={<ExamsDashboard/>}/>
      <Route path="/admin/dashboard/exams/create" element={<CreateExams/>}/>
      <Route path="/admin/dashboard/exams/:id/edit" element={<EditExams/>}/>
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