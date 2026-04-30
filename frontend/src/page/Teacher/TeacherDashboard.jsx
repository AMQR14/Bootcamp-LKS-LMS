import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout"

export default function TeacherDashboard(){
    return (
        <TeacherDashboardLayout>
            <main className="flex ">
                    <div className="m-8 md:mx-20  w-full ">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Dashboard</h1>
                        <div className="min-h-screen my-5">
                            <div className="border-2 min-h-screen"></div>
                        </div>
                    </div>
                </main>
        </TeacherDashboardLayout>
    )
}