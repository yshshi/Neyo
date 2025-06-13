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
import PageLoader from './components/PageLoader.jsx'
import Layout from './components/Layout.jsx'
import Friends from './pages/friends.jsx'

function App() {

  const { data:authData, isLoading, error} = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      try{
        const res = await axiosInstance.get("/auth/check")
        return res.data;
      }
      catch{
        return null
      }
    },
  });

  const authUser = authData?.user
  console.log("insode app.jsx")
  console.log(authUser)

  const isAuthenticated = !!authUser;

  let isOnboarded = false;
  if (authUser && authUser.isOnboarded) {
    isOnboarded = true;
  }
  console.log(`isauthenticate user -- ${isAuthenticated}`)
  console.log(`isOnboarded user -- ${isOnboarded}`)

  if (isLoading) return <PageLoader/>
  return (
    <div className='bg-black min-h-screen'>
      <Routes>
        <Route path='/' element={ isAuthenticated  && isOnboarded ? (
          <Layout showSideBar={true}>
            <HomePage/>
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
        )}></Route>
        <Route path='/signup' element={ !isAuthenticated ? <SignupPage /> : (
          <Navigate to={!isOnboarded ? "/onboarding" : "/"}/>
        )}></Route>
        <Route path='/login' element={ !isAuthenticated ? <LoginPage /> : <Navigate to="/"></Navigate>}></Route>
        <Route
          path='/onboarding'
          element={
            isAuthenticated ? (
              !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path='/notification' element={ isAuthenticated && isOnboarded ? (
          <Layout showSideBar={true}>
            <NotificationPage/>
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? '/login' : '/onboarding'}/>
        )}></Route>
        <Route path='/call/:id' element={ isAuthenticated && isOnboarded ? (
          <CallPage/>
        ) : (
          <Navigate to ={!isAuthenticated ? '/login' : '/onboarding'}/>
        ) }></Route>
        <Route path='/chat/:id' element={ isAuthenticated && isOnboarded ? (
          <Layout showSideBar={false}>
            <ChatPage/>
          </Layout>
        ) : (
          <Navigate to ={!isAuthenticated ? '/login' : '/onboarding'}/>
        ) }></Route>
        <Route path='/friends' element={ isAuthenticated && isOnboarded ? (
          <Layout showSideBar={true}>
            <Friends/>
          </Layout>
        ) : (
          <Navigate to ={!isAuthenticated ? '/login' : '/onboarding'}/>
        ) }></Route>

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
