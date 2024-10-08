import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Edit2,Eye ,MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import {setSearchJobByText} from '@/redux/jobSlice.js'

function AdminJobsTable() {


  const {allAdminJobs,searchJobByText} = useSelector(store=>store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
 const navigate = useNavigate()
  useEffect(() => {
    const filteredJobs = allAdminJobs.length > 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    })
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  return (
    <div>
      <Table className='my-10'>
        <TableCaption>A list of recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterJobs?.map((job) => (

              <tr>

            {console.log(job)}
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell className="font-medium">{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover className='w-32'>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className='flex flex-col w-full bg-white gap-3'>
                      <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex gap-5 items-center w-fit cursor-pointer'>
                        
                          <Edit2 className='w-4' />
                          <span>Edit</span>     
                      </div>
                      <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex gap-5 items-center w-fit cursor-pointer'>
                        
                          <Eye className='w-4' />
                          <span>Applicants</span>     
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>

              </tr>
            )
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
