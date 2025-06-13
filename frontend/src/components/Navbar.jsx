import React from 'react'
import { logout } from '../lib/api';
import useAuthUser from '../hooks/useAuthUser'
import { Link , useLocation } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BellIcon, BrickWallFire, LogOutIcon} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const navigate = useNavigate();

    const queryClient = useQueryClient()

    const {mutate:logoutMutation , isPending , error} = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            toast.success("Logging Out") 
        },
    })
// w-64 bg-blue-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0 

  return (
    <nav className=' bg-black border-b border-gray-900 sticky top-0 z-30 h-19 flex items-center'>
        <div className=' container mx-auto px-4 sm:px-6 lg:px-8 text-amber-50'>
            <div className=' flex items-center justify-end w-full gap-4 sm:gap-6'>
                {
                    isChatPage && (
                        <div className=' pl-5'>
                            <Link to="/" className=' flex items-center gap-2.5'>
                            <BrickWallFire className='size-9 text-primary '/>
                            <span className=' text-3xl font-mono bg-clip-text text-transparent bg-blue-600 from-primary to-secondary tracking-wider'>Neyo</span>
                            </Link>
                        </div>   
                    )
                }

                <div className=' flex items-center gap-3 sm:gap-4 ml-auto'>
                    <Link to={"/notification"}>
                    <button className=' btn btn-ghost btn-circle '>
                        <BellIcon className=' h-6 w-6 opacity-70 text-amber-50' />
                    </button>
                    </Link>
                </div>

                <div className=' avatar'>
                    <div className=' w-9 rounded-full'>
                        <img src={authUser?.profilePic} alt='user avatar' rel='noreferrer'/>
                    </div>

                </div>

                <button className='btn btn-ghost btn-circle' onClick={logoutMutation} disabled={isPending}>
                <LogOutIcon className='h-6 text-amber-50 opacity-70' />
                </button>

            </div>
        </div>
    </nav>
  )
}

export default Navbar
