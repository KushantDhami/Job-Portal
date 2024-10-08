import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button'
import AdminJobsTable from './AdminJobsTable.jsx'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs.jsx'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from "@/redux/jobSlice.js"
function AdminJobs() {

  useGetAllAdminJobs()
  const navigate = useNavigate()
  const [input, setInput] = useState("")

  const searchEventHandler = (e) => {
    setInput(e.target.value)
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input onChange={searchEventHandler} className='w-fit rounded-xl'
            placeholder='Filter By Names'
          />
          <Button onClick={() => navigate("/admin/jobs/create")} variant='outline' className='rounded-xl bg-white text-black hover:bg-black hover:text-white'>New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
