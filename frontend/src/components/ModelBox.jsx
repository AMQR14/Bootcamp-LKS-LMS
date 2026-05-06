export default function ModelBox({children}){
    return (
        <>
            <div className="fixed top-0 left-0 bottom-0 right-0 z-30 h-screen w-full bg-black/40 flex justify-center items-center shadow-md">
                <div className="h-fit rounded-md bg-white p-8 w-110 max-w-120 m-4 sm:m-0">
                    {children}
                </div>
            </div>
        </>
    )
}