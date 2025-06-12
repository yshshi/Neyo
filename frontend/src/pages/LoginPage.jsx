import React from 'react'
import { useState } from 'react'
import { BrickWallFire } from 'lucide-react';
import { Link } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { login } from '../lib/api';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email:"",
    password:"",
  });

  const queryClient = useQueryClient()

  const {mutate:signupMutation , isPending , error} = useMutation({
      mutationFn: login,
    onSuccess:() => queryClient.invalidateQueries({queryKey: ["authUser"]})
  })

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(loginData)
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className=' border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

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
                  <h2 className=' text-xl font-semibold'>Your friends are waiting</h2>
                  <p className=' text-sm opacity-70'>
                    Hop in , start a call and connect with your crew on Neyo.
                  </p>
                </div>

                <div className=' space-y-3'>

                  <div className=' form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input type='email'
                    placeholder='hello@example.com'
                    className='input input-bordered w-full rounded-full'
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}>
                    </input>
                  </div>

                  <div className=' form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input type='password'
                    placeholder='******'
                    className='input input-bordered w-full rounded-full'
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}>
                    </input>
                  </div>
                </div>


                <button className=' btn btn-primary end-full rounded-full' type='submit'>
                  {isPending ? (
                    <>
                     <span className='loading loading-spinner loading-xs'></span>
                     Signing in ...
                    </>
                  ) : ("Let’s Go!")}
                </button>

                <div className=' text-center mt-4'>
                  <p className='text-sm'>
                  Don’t have an account yet? No worries!{" "}
                  <Link to="/signup" className='text-primary hover:underline'>
                    Sign up here
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
                    <img src='/login.png.png' alt='Sign Up image' className=' w-full h-full'/>
                </div>

                <div className='text-center space-y-3 mt-6'>
                    <h2 className=' text-xl font-semibold'>Hey you, welcome back! 👋.</h2>
                    <p className=' opacity-70'>
                      Let’s get you back in — your friends are probably already talking.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
