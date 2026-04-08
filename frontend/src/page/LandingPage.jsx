import Navbar from '../components/Navbar'
import Footer from '../components/Footer' 
import HomeLayout from '../layouts/HomeLayout'
import Image from '../assets/image.jpg'
import Video from '../assets/video.mp4'

export default function LandingPage(){

    return (
        <HomeLayout>
            <div className='h-98 w-full bg-[#A3BAC2] flex justify-center items-center'>
                    <div className='flex flex-col gap-3 max-w-130'>
                        <h1 className='font-bold text-5xl text-white text-center leading-16'>Learning Management System</h1>
                        <br />
                        <p className='text-center font-semibold text-md text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ante odio, iaculis at massa in, consequat bibendum ante.</p>
                    </div>
                </div>
                <div className='flex justify-center -translate-y-8 gap-30 -z-'>
                    {/* <button className='bg-[#52707A] p-5 w-35 text-white font-semibold text-base rounded-xl hover:bg-[#60848f] transition-all'>Sign Up</button> */}
                    <a href="#learn">
                        <button className='bg-[#60848f] py-5 px-10 text-white font-semibold text-base rounded-xl hover:bg-[#6f97a3] transition-all'>Learn More</button>
                    </a>
                </div>

                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-10 mb-24 gap-10 md:gap-10'>
                        <div className=' w-full h-100 border-2 border-[#E0E8EB] hover:border-[#b8bec1] transition-all rounded-xl overflow-auto'>
                            <div className='m-6'>
                                <h2 className='text-3xl font-bold text-[#3f454c] my-6'>Lorem Ipsum</h2>
                                <p className='text-[#3f454c]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at sodales tortor. Nam vel enim ut mi congue elementum vitae id turpis. Praesent tincidunt, ligula ut molestie ultricies, dolor enim rhoncus lacus, ac dapibus diam odio et dolor. Phasellus enim lorem, tempor eu ultricies non, faucibus a nisi. Donec id fermentum quam. Maecenas eu dui malesuada, convallis sem non, sagittis ante. Vestibulum suscipit lorem ut finibus varius. Aenean iaculis metus non libero elementum, ac maximus quam ultricies.</p>
                            </div>
                        </div>
                        
                        <div className=' w-full h-100 border-2 border-[#E0E8EB] hover:border-[#b8bec1] transition-all rounded-xl overflow-auto'>
                            <div className='m-6'>
                                <h2 className='text-3xl font-bold text-[#3f454c] my-6'>Lorem Ipsum</h2>
                                <p className='text-[#3f454c]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at sodales tortor. Nam vel enim ut mi congue elementum vitae id turpis. Praesent tincidunt, ligula ut molestie ultricies, dolor enim rhoncus lacus, ac dapibus diam odio et dolor. Phasellus enim lorem, tempor eu ultricies non, faucibus a nisi. Donec id fermentum quam. Maecenas eu dui malesuada, convallis sem non, sagittis ante. Vestibulum suscipit lorem ut finibus varius. Aenean iaculis metus non libero elementum, ac maximus quam ultricies.</p>
                            </div>
                        </div>

                        <div className=' w-full h-100 border-2 border-[#E0E8EB] hover:border-[#b8bec1] transition-all rounded-xl overflow-auto'>
                            <div className='m-6'>
                                <h2 className='text-3xl font-bold text-[#3f454c] my-6'>Lorem Ipsum</h2>
                                <p className='text-[#3f454c]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at sodales tortor. Nam vel enim ut mi congue elementum vitae id turpis. Praesent tincidunt, ligula ut molestie ultricies, dolor enim rhoncus lacus, ac dapibus diam odio et dolor. Phasellus enim lorem, tempor eu ultricies non, faucibus a nisi. Donec id fermentum quam. Maecenas eu dui malesuada, convallis sem non, sagittis ante. Vestibulum suscipit lorem ut finibus varius. Aenean iaculis metus non libero elementum, ac maximus quam ultricies.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <video src={Video} autoPlay loop className='mx-auto w-full'/> {/*bisa add controls*/}
                        {/* <iframe src={Video} frameborder="0" className='mx-auto w-full '></iframe> */}
                    </div>

                    <div className='flex flex-col lg:flex-row my-10' id='learn' >
                            <div>
                                <img src={Image} alt="" srcset="" className='w-full1'/>
                            </div>
                            <div className='m-7 text-[#3f454c]'>
                                <h2 className='text-3xl font-bold text-[#3f454c] my-6'>Learn More</h2>
                                <p className='mr-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at sodales tortor. Nam vel enim ut mi congue elementum vitae id turpis. Praesent tincidunt, ligula ut molestie ultricies, dolor enim rhoncus lacus, ac dapibus diam odio et dolor. Phasellus enim lorem, tempor eu ultricies non, faucibus a nisi. Donec id fermentum quam. Maecenas eu dui malesuada, convallis sem non, sagittis ante. Vestibulum suscipit lorem ut finibus varius. Aenean iaculis metus non libero elementum, ac maximus quam ultricies.</p>
                                <br />
                                <p className='mr-10 mb-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at sodales tortor. Nam vel enim ut mi congue elementum vitae id turpis. Praesent tincidunt, ligula ut molestie ultricies, dolor enim rhoncus lacus, ac dapibus diam odio et dolor. Phasellus enim lorem, tempor eu ultricies non, faucibus a nisi. Donec id fermentum quam. Maecenas eu dui malesuada, convallis sem non, sagittis ante. Vestibulum suscipit lorem ut finibus varius. Aenean iaculis metus non libero elementum, ac maximus quam ultricies.</p>      
                            </div> 
                        </div>

                </div>
        </HomeLayout>
    )
} 