import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ModeToggle } from "../mode-toggle"
import CreatePost from "../create-post"
import { useCreatePost } from "@/hooks/use-create-post"

function Navbar() {
    const { onOpen, isOpen } = useCreatePost()
    return (
        <>
            <div className='w-full h-24 dark:bg-gray-900 bg-white fixed inset-0'>
                <div className='w-full h-full flex justify-between items-center container'>
                    <Link className='flex items-center justify-center gap-2 ml-2' to={'/'}>
                        <img src={'/logo.svg'} />
                        <p className='font-bold text-4xl'>Sammi</p>
                    </Link>

                    <div className='flex gap-2 items-center'>
                        <Button onClick={onOpen} className='rounded-full font-bold' size={'lg'} variant={'outline'}>
                            Create Post
                        </Button>
                        <Link to={'/auth'}>
                            <Button size={'lg'} className='rounded-full font-bold'>
                                Login
                            </Button>
                        </Link>
                        <ModeToggle />
                        {isOpen && <CreatePost />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar