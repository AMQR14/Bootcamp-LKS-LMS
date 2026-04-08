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
import Questions from "./page/Dashboard/Questions"
import CreateQuestions from "./page/Dashboard/Create/CreateQuestions"
import EditQuestions from "./page/Dashboard/Edit/EditQuestions"
import { AuthProvider } from "./contexts/AuthContext"

function AppRoutes(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<LandingPage/>}/>
      <Route path="/courses" element={<Courses/>}/>
      <Route path="/teachers" element={<Teachers/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/coursesdashboard" element={<CoursesDashboard/>}/>
      <Route path="/createcourses" element={<CreateCourses/>}/>
      <Route path="/dashboardteachers" element={<TeachersDashboard/>}/>
      <Route path="/dashboardstudents" element={<StudentsDashboard/>}/>
      <Route path="/editcourses" element={<EditCourses/>}/>
      <Route path="/createstudents" element={<CreateStudents/>}/>
      <Route path="/createteachers" element={<CreateTeachers/>}/>
      <Route path="/editstudents" element={<EditStudents/>}/>
      <Route path="/editteachers" element={<EditTeachers/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/questions" element={<Questions/>} /> 
      <Route path="/createquestions" element={<CreateQuestions/>}/>
      <Route path="/editquestions" element={<EditQuestions/>}/>
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