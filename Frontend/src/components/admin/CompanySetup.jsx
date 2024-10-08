import Navbar from '../shared/Navbar.jsx'
import React, { useState,useEffect } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'
import { COMPANY_API_END_POINT } from '@/utils/constant.js'
import useGetCompanyById from '@/hooks/useGetCompanyById.jsx'
function CompaniesSetup() {
  const params = useParams()
  const companyId = params.id
  useGetCompanyById(companyId)


  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
  const { singleCompany } = useSelector(store => store.company)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      setLoading(true)

      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          "Content-Type": "multipart/form-data",

        },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate("/admin/companies")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }


  useEffect(()=>{
    setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location:singleCompany.location || "",
        file: singleCompany.file || null
    })
  },[singleCompany])

  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form onSubmit={submitHandler} >
          <div className='flex gap-5 py-10 items-center'>
            <Button onClick={()=>navigate("/admin/companies")}variant='outline' className='rounded-xl bg-white text-black hover:bg-black hover:text-white'>
              <ArrowLeft />
              <span className='mx-3'>Back</span>
            </Button>
            <h1 className='font-bold'>Company setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div >
              <Label className=''>Company Name</Label>
              <Input type='text'
                className='my-2 rounded-xl border border-gray-200 hover:border-black'
                placeholder=''
                name='name'
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div >
              <Label className=''>Company description</Label>
              <Input type='text'
                className='my-2 rounded-xl border border-gray-200 hover:border-black'
                placeholder=''
                name='description'
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div >
              <Label className=''>Company website</Label>
              <Input type='text'
                className='my-2 rounded-xl border border-gray-200 hover:border-black'
                placeholder=''
                name='website'
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div >
              <Label className=''>Company location</Label>
              <Input type='text'
                className='my-2 rounded-xl border border-gray-200 hover:border-black'
                placeholder=''
                name='location'
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div >
              <Label className=''>Company Logo</Label>
              <Input type='file'
                className='my-2 rounded-xl border border-gray-200 hover:border-black'
                accept='image/*'
                onChange={changeFileHandler}
              />
            </div>
          </div>
            {
              loading ? <Button variant="outline" type="submit" className='w-full my-4 rounded-xl bg-white hover:bg-black hover:text-white'><Loader2 className='mr-2 h-4 w-4 animate-spin' />please wait</Button> :
                <Button variant="outline" className="w-full my-4 rounded-xl bg-white hover:bg-black hover:text-white" type="submit">Update</Button>
            }
        </form>
      </div>
    </div>
  )
}

export default CompaniesSetup
