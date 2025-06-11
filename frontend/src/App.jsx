import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import NotificationPage from "./pages/NotificationPage.jsx"
import toast, { Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className='h-screen' data-theme="business">
      <button onClick={() => toast.success("Hello World")}>Create a toast</button>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/onboarding' element={<OnboardingPage />}></Route>
        <Route path='/notification' element={<NotificationPage />}></Route>

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
