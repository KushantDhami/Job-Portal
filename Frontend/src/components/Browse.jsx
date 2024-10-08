import React,{useEffect} from 'react'
import Navbar from './shared/Navbar.jsx'
import Footer from './shared/Footer.jsx'
import JobCard from './JobCard.jsx'
import { useSelector,useDispatch } from 'react-redux'
import {setSearchedQuery} from '@/redux/jobSlice.js'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'

function Browse() {
  useGetAllJobs()
  const {allJobs} = useSelector(store=>store.job)
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar/>
            <div className='max-w-7xl mx-auto my-10'>
                 <h1 className='font-bold text-xl my-10'>Search Reasult ({allJobs.length})</h1>
                 <div className='grid grid-cols-3 gap-4'>
                  {
                     allJobs.map((job)=>{
                        return (
                          <JobCard key={job._id} job={job}/>
                        )
                      })
                  }
                 </div>
            </div>
      <Footer/>
    </div>
  )
}

export default Browse
