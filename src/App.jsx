import React, { Suspense, useState, useEffect } from 'react'
import './index.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Loader from './components/Loader'

// Lazy load all components and pages
const Navbar = React.lazy(() => import('./components/Navbar'))
const Footer = React.lazy(() => import('./components/Footer'))
const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Services = React.lazy(() => import('./pages/Services'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Login = React.lazy(() => import('./pages/Login'))
const Profile = React.lazy(() => import('./pages/Profile'))
const NewProject = React.lazy(() => import('./pages/NewProject'))
const TestFirebase = React.lazy(() => import('./pages/TestFirebase'))
const Projects = React.lazy(() => import('./pages/Projects'))
const ViewSRS = React.lazy(() => import('./pages/ViewSRS'))
// Footer-linked pages
const Features = React.lazy(() => import('./pages/Features'))
const Pricing = React.lazy(() => import('./pages/Pricing'))
const Integrations = React.lazy(() => import('./pages/Integrations'))
const APIPage = React.lazy(() => import('./pages/API'))
const Careers = React.lazy(() => import('./pages/Careers'))
const Blog = React.lazy(() => import('./pages/Blog'))
const Press = React.lazy(() => import('./pages/Press'))
const GettingStarted = React.lazy(() => import('./pages/docs/GettingStarted'))
const APIReference = React.lazy(() => import('./pages/docs/APIReference'))
const Tutorials = React.lazy(() => import('./pages/docs/Tutorials'))
const Examples = React.lazy(() => import('./pages/docs/Examples'))
const HelpCenter = React.lazy(() => import('./pages/resources/HelpCenter'))
const Community = React.lazy(() => import('./pages/resources/Community'))
const Webinars = React.lazy(() => import('./pages/resources/Webinars'))
const Downloads = React.lazy(() => import('./pages/resources/Downloads'))
const Privacy = React.lazy(() => import('./pages/Privacy'))
const Terms = React.lazy(() => import('./pages/Terms'))
const Legal = React.lazy(() => import('./pages/Legal'))

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
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/new-project' element={<NewProject />} />
          <Route path='/features' element={<Features />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/integrations' element={<Integrations />} />
          <Route path='/api' element={<APIPage />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/press' element={<Press />} />
          <Route path='/docs/getting-started' element={<GettingStarted />} />
          <Route path='/docs/api-reference' element={<APIReference />} />
          <Route path='/docs/tutorials' element={<Tutorials />} />
          <Route path='/docs/examples' element={<Examples />} />
          <Route path='/resources/help-center' element={<HelpCenter />} />
          <Route path='/resources/community' element={<Community />} />
          <Route path='/resources/webinars' element={<Webinars />} />
          <Route path='/resources/downloads' element={<Downloads />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/legal' element={<Legal />} />
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
