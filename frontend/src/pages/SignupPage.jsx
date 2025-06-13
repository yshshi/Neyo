import { useState } from 'react'
import { BrickWallFire } from 'lucide-react';
import { Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { signUp } from '../lib/api';

const SignupPage = () => {
  const [singupData, setSignupData] = useState({
    fullName:"",
    email:"",
    password:"",
  });

  const queryClient = useQueryClient()

  const {mutate:signupMutation , isPending , error} = useMutation({
      mutationFn: signUp,
    onSuccess:() => queryClient.invalidateQueries({queryKey: ["authUser"]})
  })

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(singupData)
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 text-amber-50'>
      <div className=' border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-gray-900 rounded-xl shadow-lg overflow-hidden'>

        <div className=' w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          <div className='mb-4 flex items-center justify-start gap-2'>
            <BrickWallFire className='size-9 text-primary'/>
            <span className=' text-3xl font-mono bg-clip-text text-transparent bg-blue-600 from-primary to-secondary tracking-wider'>Neyo</span>
          </div>

          {error && (
            <div  className=' alert alert-error'>
              <span>
                  {error.response.data.message}
              </span>
            </div>
          )}

          <div className=' w-full'>
            <form onSubmit={handleSignup}>
              <div className='space-y-4'>
                <div>
                  <h2 className=' text-xl font-semibold'>Create an Account</h2>
                  <p className=' text-sm opacity-70'>
                    One account. Unlimited conversations. Create yours in seconds.
                  </p>
                </div>

                <div className=' space-y-3'>
                  <div className=' form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>
                    <input type='text'
                    placeholder='Yash Singh(write your name that is mine)'
                    className='input input-bordered w-full rounded-full bg-black'
                    value={singupData.fullName}
                    onChange={(e) => setSignupData({...singupData, fullName: e.target.value})}>
                    </input>
                  </div>

                  <div className=' form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type='email'
                    placeholder='yash@gmail.com'
                    className='input input-bordered w-full rounded-full bg-black'
                    value={singupData.email}
                    onChange={(e) => setSignupData({...singupData, email: e.target.value})}>
                    </input>
                  </div>

                  <div className=' form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input type='password'
                    placeholder='******'
                    className='input input-bordered w-full rounded-full bg-black'
                    value={singupData.password}
                    onChange={(e) => setSignupData({...singupData, password: e.target.value})}>
                    </input>
                  </div>
                  <p className='text-xs opacity-70 mt-1'>
                    Password must be at least 6 characters long
                  </p>
                </div>

                <div className='form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type='checkbox' className='checkbox checkbox-sm bg-amber-50 text-teal-50' required />
                    <span className='text-xs leading-tight'>
                      I agree to the {" "}
                      <span className=' text-primary hover:underline'>terms of service</span> and{" "}
                      <span className=' text-primary hover:underline'>privacy policy</span>
                    </span>
                  </label>
                </div>

                <button className=' btn btn-primary end-full' type='submit'>
                  {isPending ? (
                    <>
                     <span className='loading loading-spinner loading-xs rounded-full'></span>
                     Loading...
                    </>
                  ) : ("Create Account")}
                </button>

                <div className=' text-center mt-4'>
                  <p className=' text-sm'>
                    Already have an account?{" "}
                    <Link to="/login" className='text-primary hover:underline'>
                    Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>


        <div className=' hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
            <div className=' max-w-md p-8'>
                <div className=' relative aspect-square max-w-sm mx-auto'>
                    <img src='/signup_image.png' alt='Sign Up image' className=' w-full h-full'/>
                </div>

                <div className='text-center space-y-3 mt-6'>
                    <h2 className=' text-xl font-semibold'>Don’t Just Text — Talk. Face to Face.</h2>
                    <p className=' opacity-70'>
                      Your space for real-time connection, no matter where you are.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
