import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link , useLocation } from 'react-router'
import { BellIcon, BrickWallFire, HomeIcon, UserIcon } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const Sidebar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;
        const { data: friendRequests, isLoading } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests,
    });

    console.log("🐞 Raw friend request:", friendRequests);

    const incomingRequests = friendRequests?.incoming_request || [];

  return (
    <aside className='w-64 bg-black border-r border-gray-900 hidden lg:flex flex-col h-screen sticky top-0 '>
        <div className=' p-5 border-b border-gray-900'>
            <Link to="/" className=' flex items-center gap-2.5'>
            <BrickWallFire className='size-9 text-primary'/>
            <span className=' text-3xl font-mono bg-clip-text text-transparent bg-blue-600 from-primary to-secondary tracking-wider'>Neyo</span>
            </Link>

        </div>

        <nav className=' flex-1 p-4 space-y-1 text-amber-50'>
           <Link to="/"
            className={`btn btn-ghost justify-start w-full gap-4 px-4 py-3 text-base normal-case rounded-full  ${
                currentPath === "/" ? "btn-active bg-gray-900" : ""
            } hover:bg-gray-900 transition-colors text-amber-50 duration-200`}>
            <HomeIcon className='size-5 text-amber-50 opacity-70' />
            <span>Home</span>
            </Link>

            <Link to="/friends"
            className={`btn btn-ghost justify-start w-full gap-4 px-4 py-3 text-base normal-case rounded-full ${
                currentPath === "/friends" ? "btn-active bg-gray-900" : ""
            } hover:bg-gray-900 transition-colors text-amber-50 duration-200`}>
            <UserIcon className='size-5 text-amber-50 opacity-70' />
            <span>Friends</span>
            </Link>

            <Link
            to="/notification"
            className={`btn btn-ghost justify-start w-full gap-4 px-4 py-3 text-base normal-case rounded-full ${
                currentPath === "/notification" ? "btn-active bg-gray-900" : ""
            } hover:bg-gray-900 transition-colors text-amber-50 duration-200`}
            >
            <BellIcon className="size-5 text-amber-50 opacity-70" />
            <span className="relative">
                Notification
                {incomingRequests.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                    {incomingRequests.length}
                </span>
                )}
            </span>
            </Link>


        </nav>

        <div className=' p-4 border-t border-gray-900 mt-auto'>
            <div className=' flex items-center gap-3'>
                <div className='avatar'>
                    <div className=' w-10 rounded-full'>
                        <img src={authUser?.profilePic} alt='User Avatar' />
                    </div>
                </div>
                <div className=' flex-1'>
                    <p className=' font-semibold text-sm text-amber-50'>{authUser?.fullName}</p>
                    <p className='text-base text-green-500 font-semibold flex items-center gap-3'>
                    <span className='w-3.5 h-3.5 rounded-full bg-green-500 shadow-lg ring-2 ring-rose-400/40 animate-pulse' />
                    Online
                    </p>


                </div>

            </div>

        </div>

    </aside>
  )
}

export default Sidebar
