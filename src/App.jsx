import React, { Suspense, useState, useEffect } from 'react'
import './index.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Loader from './components/Loader'

// Lazy load all components and pages
const Navbar = React.lazy(() => import('./components/Navbar'))
const Footer = React.lazy(() => import('./components/Footer'))
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const Profile = React.lazy(() => import('./pages/Profile'))
const NewProject = React.lazy(() => import('./pages/NewProject'))
const TestFirebase = React.lazy(() => import('./pages/TestFirebase'))
const Projects = React.lazy(() => import('./pages/Projects'))
const ViewSRS = React.lazy(() => import('./pages/ViewSRS'))

// Initial loading component for the entire app
const InitialLoader = () => (
  <Loader/>
)


// Component to handle route-based loading
const RouteHandler = () => {
  const location = useLocation()
  const [isPageLoading, setIsPageLoading] = useState(false)

  useEffect(() => {
    setIsPageLoading(true)
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 1500) // 1.5 seconds timeout to properly show the animation

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <Suspense fallback={<Loader/>}>
      {isPageLoading ? (
        <Loader/>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/new-project' element={<NewProject />} />
          <Route path="/test-firebase" element={<TestFirebase />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/srs/:projectId" element={<ViewSRS />} />
        </Routes>
      )}
    </Suspense>
  )
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 2000) // Adjust timing as needed

    return () => clearTimeout(timer)
  }, [])

  if (isInitialLoading) {
    return <InitialLoader />
  }

  return (
    <div className='relative z-[30] w-full bg-gray-200/40'>
      <div className='absolute hidden md:block top-1/4 md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 md:-translate-x-1/2 md:-translate-y-1/2 w-[200px] h-[200px] md:w-[500px] md:h-[500px] rounded-full bg-[#246a73]/70 blur-[40px] md:blur-[130px] -z-[3]'></div>
      <div className='absolute top-1/4 hidden md:block md:top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/4 md:-translate-x-1/2 md:-translate-y-1/2 w-[100px] h-[100px] md:w-[300px] md:h-[300px] rounded-full bg-[#dba159]/70 blur-[30px] md:blur-[100px] -z-[3]'></div>

      <Suspense fallback={<div className="h-16 bg-white/50 backdrop-blur-sm"></div>}>
        <Navbar />
      </Suspense>

      <RouteHandler />

      <Suspense fallback={<div className="h-16 bg-white/50 backdrop-blur-sm"></div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App