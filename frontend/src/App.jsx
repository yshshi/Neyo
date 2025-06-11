import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import { Toaster} from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'

function App() {

  const { data:authData, isLoading, error} = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await axiosInstance.get("/auth/check")
      return res.data;
    },
  });

  const authUser = authData?.user
  return (
    <div className='bg-blue-200 h-screen'>
      <Routes>
        <Route path='/' element={ authUser ? <HomePage /> : <Navigate to="/login"></Navigate>}></Route>
        <Route path='/signup' element={ !authUser ? <SignupPage /> : <Navigate to="/"></Navigate>}></Route>
        <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to="/"></Navigate>}></Route>
        <Route path='/onboarding' element={ authUser ? <OnboardingPage />: <Navigate to="/login"></Navigate>}></Route>
        <Route path='/notification' element={ authUser ? <NotificationPage />: <Navigate to="/login"></Navigate>}></Route>
        <Route path='/call' element={ authUser ? <CallPage />: <Navigate to="/login"></Navigate>}></Route>
        <Route path='/chat' element={ authUser ? <ChatPage />: <Navigate to="/login"></Navigate>}></Route>

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
