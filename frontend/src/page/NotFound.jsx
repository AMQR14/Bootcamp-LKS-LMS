import { MoveLeft, UserX } from "lucide-react";
import {Link} from 'react-router-dom'

export default function NotFound(){
    return (
        <div className="flex justify-center items-center min-h-screen gap-6 text-[#46626c]">
            <div className="md:flex gap-6 -translate-y-3">
                <div className="flex flex-col justify-center items-center">
                    <UserX className="size-25 translate-x-4 translate-y-4 animate-bounce duration-1000
                    "/>
                    <h1 className="text-9xl font-bold">404</h1>
                </div> 
                <div className="flex flex-col justify-center gap-6">
                    <div className="flex flex-col justify-center mt-13">
                        <h1 className="text-5xl font-bold">Page</h1>
                        <h1 className="text-5xl font-bold">Not Found</h1>
                    </div>
                    <div className="justify-end flex flex-col mb-4 bottom-0 h-full">
                        <Link to={'/home'} className='flex justify-center items-center w-full h-10 bg-[#46626c] hover:bg-[#668089] transition-all text-white font-semibold rounded-md gap-4'><MoveLeft className='size-7 stroke-2'/>Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}