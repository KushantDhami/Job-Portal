import React,{useEffect} from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'
import {setUser} from '@/redux/authSlice.js'
import {useSelector} from 'react-redux'
import Companies from './admin/Companies.jsx'
import { useNavigate } from 'react-router-dom'
function Home() {
  
  useGetAllJobs()
  const {user} = useSelector(store=>store.auth)
  const navigate= useNavigate()
  useEffect(()=>{
    if(user?.role=== 'recruiter')
    {
      navigate("/admin/companies")
    }
  },[])
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
