import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link , useLocation } from 'react-router'
import { BellIcon, BrickWallFire, HomeIcon, UserIcon } from 'lucide-react';

const Sidebar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;

  return (
    <aside className='w-64 bg-blue-300 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0 '>
        <div className=' p-5 border-b border-base-300'>
            <Link to="/" className=' flex items-center gap-2.5'>
            <BrickWallFire className='size-9 text-primary'/>
            <span className=' text-3xl font-mono bg-clip-text text-transparent bg-blue-600 from-primary to-secondary tracking-wider'>Neyo</span>
            </Link>

        </div>

        <nav className=' flex-1 p-4 space-y-1'>
           <Link to="/"
            className={`btn btn-ghost justify-start w-full gap-4 px-4 py-3 text-base normal-case rounded-full ${
                currentPath === "/" ? "btn-active" : ""
            } hover:bg-base-300 transition-colors duration-200`}>
            <HomeIcon className='size-5 text-base-content opacity-70' />
            <span>Home</span>
            </Link>

            <Link to="/friends"
            className={`btn btn-ghost justify-start w-full gap-4 px-4 py-3 text-base normal-case rounded-full ${
                currentPath === "/friends" ? "btn-active" : ""
            } hover:bg-base-300 transition-colors duration-200`}>
            <UserIcon className='size-5 text-base-content opacity-70' />
            <span>Friends</span>
            </Link>

            <Link to="/notification"
            className={`btn btn-ghost justify-start w-full gap-4 px-4 py-3 text-base normal-case rounded-full ${
                currentPath === "/notification" ? "btn-active" : ""
            } hover:bg-base-300 transition-colors duration-200`}>
            <BellIcon className='size-5 text-base-content opacity-70' />
            <span>Notification</span>
            </Link>

        </nav>

        <div className=' p-4 border-t border-base-300 mt-auto'>
            <div className=' flex items-center gap-3'>
                <div className='avatar'>
                    <div className=' w-10 rounded-full'>
                        <img src={authUser?.profilePic} alt='User Avatar' />
                    </div>
                </div>
                <div className=' flex-1'>
                    <p className=' font-semibold text-sm'>{authUser?.fullName}</p>
                    <p className='text-base text-rose-600 font-semibold flex items-center gap-3'>
                    <span className='w-3.5 h-3.5 rounded-full bg-rose-600 shadow-lg ring-2 ring-rose-400/40 animate-pulse' />
                    Online
                    </p>


                </div>

            </div>

        </div>

    </aside>
  )
}

export default Sidebar
