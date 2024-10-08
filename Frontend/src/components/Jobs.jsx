import React,{useState,useEffect} from 'react'
import Navbar from './shared/Navbar.jsx'
import Footer from './shared/Footer.jsx'
import FilterCard from './FilterCard.jsx'
import JobCard from './JobCard.jsx'
import {useSelector} from 'react-redux'


function Jobs() {
  const {allJobs,searchedQuery} = useSelector(store=>store.job)
  const [filterJobs,setFilterJobs] = useState(allJobs)

  useEffect(()=>{
    if(searchedQuery)
    {
      const filteredJobs = allJobs.filter((job)=>{
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
               job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
               job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    }
    else{
      setFilterJobs(allJobs)
    }
  },[allJobs,searchedQuery])

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto mt-5'>
          <div className='flex gap-5'>
              <div className='w-20% '>
                <FilterCard/>
              </div>
            {
              filterJobs.length <= 0 ? <span>NO Jobs Found</span> :
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                 { 
                  filterJobs.map((job) =>( 
                  <div className=''>
                     <JobCard key={job?._id} job={job}/>
                  </div>))
                 }
                </div>
              </div>
            }
          </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Jobs
