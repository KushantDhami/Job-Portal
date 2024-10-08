import React, { useState,useEffect } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button.jsx"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice.js'
import { Loader2 } from 'lucide-react'

function Singup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: ""
  })

  const { loading ,user} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phonenumber", input.phonenumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          "Content-Type": "multipart/form-data",

        },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate("/login")
        toast(res.data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }

  }
  
  useEffect(()=>{
    if(user)
    {
      navigate("/")
    }
  })



  return (
    <>
      <div>
        <Navbar />

        <div className='flex items-center justify-center my-3 mx-w-7xl mx-auto'>
          <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold mb-5 text-xl'>Sing Up</h1>

            <div className='my-2'>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                className="rounded-xl"
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Full Name"
              />
            </div>

            <div className='my-2'>
              <Label htmlFor="email">Email</Label>
              <Input
                className="rounded-xl"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Email"
              />
            </div>

            <div className='my-2'>
              <Label htmlFor="phonenumber">Phone Number</Label>
              <Input
                className="rounded-xl"
                type="text"
                value={input.phonenumber}
                name="phonenumber"
                onChange={changeEventHandler}
                placeholder="Phone Number"
              />
            </div>

            <div className='my-2'>
              <Label htmlFor="password">Password</Label>
              <Input
                className="rounded-xl"
                type="text"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Password"
              />
            </div>

            <div className='flex items-center justify-between'>
              <RadioGroup defaultValue="student" className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <Input type="radio"
                    value="student"
                    name="role"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer" />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input type="radio"
                    value="recruiter"
                    name="role"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer" />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>

              <div className="flex items-center gap-2">
                <Label htmlFor="profile">Profile</Label>
                <Input type="file"
                  accept="image/*"
                  id="profile"
                  onChange={changeFileHandler}
                  className="cursor-pointer rounded-xl" />
              </div>
            </div>
            {
              loading ? <Button variant="outline" type="submit" className='w-full my-4 rounded-xl bg-white hover:bg-black hover:text-white'><Loader2 className='mr-2 h-4 w-4 animate-spin' />please wait</Button> :
                <Button variant="outline" className="w-full my-4 rounded-xl bg-white hover:bg-black hover:text-white" type="submit">Sing Up</Button>
            }
            <span className='rounded-xl text-sm'>Already have an account <Link to="/login" className='text-blue-600'>Login</Link></span>
          </form>
        </div>

      </div>
    </>
  )
}

export default Singup
