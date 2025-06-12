import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CompleteOnboarding } from '../lib/api';
import { CameraIcon, MapPinned , ShipWheelIcon, UserRoundPen , UserX } from 'lucide-react';
import { GENDER, LANGUAGES } from '../constants';

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryCLient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName : authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  const {mutate, isPending} = useMutation({
    mutationFn: CompleteOnboarding,
    onSuccess: () => {
      toast.success("Profile Updated Successfully");
      queryCLient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: (err) => {
    console.error("Onboarding error:", err);
    toast.error(err.response.data.message);
  }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting onboarding:", formState);
    mutate(formState);
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

    setFormState({...formState, profilePic: randomAvatar});
    toast.success("Avatar Changed Successfully")
  }
  return (
    <div className=' min-h-screen flex items-center justify-center p-4 bg-blue-200 h-screen'>
      <div className=' card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className=' card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className=' space-y-6'>

            {/* profile pic */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              <div className=' size-32 rounded-full bg-base-300 overflow-hidden'>
                {
                  formState.profilePic ? (
                    <img src={formState.profilePic}
                    alt='Profile Pic'
                    className=' w-full h-full object-cover'/>
                  ) : (
                    <div className=' flex items-center justify-center h-full'>
                      <CameraIcon className=' size-12 text-base-content opacity-40'/> 
                    </div>
                  )
                }

              </div>
              {/* Generate random avatar button */}
            <div className=' flex items-center gap-2'>
              <button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
                <UserRoundPen className=' size-4 mr-2'/>
                Want a different look? Generate again
              </button>

            </div>
            </div>

              
            {/* full Name */}
            <div className=' form-control'>
                    <label className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>
                    <input type='text'
                    name='fullName'
                    placeholder='Your Full Name'
                    className='input input-bordered w-full'
                    value={formState.fullName}
                    onChange={(e) => setFormState({...formState, fullName: e.target.value})}>
                    </input>
                  </div>

            {/* full Name */}
            <div className=' form-control'>
                    <label className='label'>
                      <span className='label-text'>Let’s Get to Know You!</span>
                    </label>
                    <textarea
                    name='bio'
                    placeholder='Let us know who you are, what you do, or what you love!'
                    className='textarea textarea-bordered w-full h-32 rounded-md'
                    value={formState.bio}
                    onChange={(e) => setFormState({...formState, bio: e.target.value})}></textarea>
                  </div>
            
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>

              <div className='form-control'>
                <label className=' label'>
                  <span className='label-text'>Native Language</span>
                </label>
                <select
                name='nativeLanguage'
                value={formState.nativeLanguage}
                onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                className=' select select-bordered w-full'
                >
                  <option value="">Select your native language</option>
                  {
                    LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className='form-control'>
                <label className=' label'>
                  <span className='label-text'>What’s your gender?</span>
                </label>
                <select
                name='learningLanguage'
                value={formState.learningLanguage}
                onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                className=' select select-bordered w-full'
                >
                  <option value="">How do you identify?</option>
                  {
                    GENDER.map((gender) => (
                      <option key={`${gender}`} value={gender.toLowerCase()}>
                        {gender}
                      </option>
                    ))
                  }
                </select>
              </div>

            </div>

            <div className=' form-control'>
                    <label className='label'>
                      <span className='label-text'>Location</span>
                    </label>
                    <div className='relative'>
                      <MapPinned className='absolute top-1/2 transform-translate-y-1/2 left-3 size-5 text-base-content opacity-70'/>
                      <input
                       type='text'
                       name='location'
                       value={formState.location}
                       onChange={(e) => setFormState({...formState, location:e.target.value })}
                       className='input input-bordered w-full pl-10'
                       placeholder='City, Country'
                      />

                    </div>
              </div>

            <button className=' btn btn-primary w-full' disabled={isPending} type='submit'>
              {!isPending ? (
                <>
                <ShipWheelIcon className=' size-5 mr-2'/>
                Complete Onboarding
                </>
              ) : (
                <>
                <ShipWheelIcon className='animate-spin size-5 mr-2'/>
                Onboarding ...
                </>
              )}

            </button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default OnboardingPage
