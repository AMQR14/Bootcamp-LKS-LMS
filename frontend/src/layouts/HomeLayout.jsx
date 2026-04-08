import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function HomeLayout({children}){
    return (
        <div>
            <nav className="sticky top-0 z-10">
                <Navbar/>
            </nav>
            <main className="min-h-screen">
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}