import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { toast } from "sonner"
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant.js'
import {useNavigate} from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue ,SelectGroup} from "@/components/ui/select"
function PostJob() {
  const companyArray = []
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  
  const { companies } = useSelector(store => store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })

  }

  const selectChangeHandler = (value) => {
      const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value )
      setInput({...input,companyId:selectedCompany._id})
  }

  const submitHandler= async (e)=>{
    e.preventDefault()
    
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          "Content-Type": "application/json",

        },
        withCredentials: true,
      })
      if (res.data.success) {
        toast(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div>
      <Navbar />

      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg'>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label>Title</Label>
              <Input type='text'
                name='title'
                value={input.title}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 hover:bg-white hover:text-black my-1 border border-gray-400 rounded-xl hover:border-black'
              />
            </div>
            <div>
              <Label>description</Label>
              <Input type='text'
                name='description'
                value={input.description}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 rounded-xl hover:border-black'
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input type='text'
                name='requirements'
                value={input.requirements}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 rounded-xl hover:border-black'
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input type='text'
                name='salary'
                value={input.salary}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 rounded-xl hover:border-black'
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input type='text'
                name='location'
                value={input.location}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 rounded-xl hover:border-black'
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input type='text'
                name='jobType'
                value={input.jobType}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 rounded-xl hover:border-black'
              />
            </div>
            <div>
              <Label>Exeperience</Label>
              <Input type='text'
                name='experience'
                value={input.exeperience}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 rounded-xl hover:border-black'
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input type='text'
                name='position'
                value={input.position}
                onChange={changeEventHandler}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 rounded-xl hover:border-black'
              />
            </div>
            {
              companies.length > 0 && (
              
                <Select onValueChange={selectChangeHandler}className='w-full bg-white text-black hover:bg-black rounded hover:text-white'>
                  <SelectTrigger className="w-6/12 text-start bg-white text-black hover:bg-black rounded-xl hover:text-white">
                    <SelectValue placeholder="Select A Company " />
                  </SelectTrigger>
                  <SelectContent className='opacity-100 bg-white text-black'>
                    <SelectGroup>
                        {
                          companies?.map((company)=>{
                            return (

                              <SelectItem key={company?._id} value={company?.name.toLowerCase()}> {company?.name}</SelectItem>
                            )
                          })
                        }
                    
                    </SelectGroup>
                  </SelectContent>
                </Select>
            
              )
            }
          </div>
             {
              loading ? <Button variant="outline" type="submit" className='w-full my-4 rounded-xl bg-white hover:bg-black hover:text-white'><Loader2 className='mr-2 h-4 w-4 animate-spin' />please wait</Button> :
                <Button variant="outline" className="w-full my-4 rounded-xl bg-white hover:bg-black hover:text-white" type="submit">Post</Button>
            }
            {
              companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>Please register a company first</p>
            }
        </form>
      </div>
    </div>
  )
}

export default PostJob
