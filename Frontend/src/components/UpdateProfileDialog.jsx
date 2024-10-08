import React,{useState} from 'react'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter,DialogDescription} from "@/components/ui/dialog"
import {Input} from './ui/input'
import {Label} from './ui/label'
import {Button} from './ui/button'
import { Loader2 } from 'lucide-react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {USER_API_END_POINT} from '@/utils/constant.js'
import { toast } from "sonner"
import {setUser} from '@/redux/authSlice.js'

function UpdateProfileDialog({open,setOpen}) {
   
  const [loading,setLoading] = useState(false)
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const [input,setInput] = useState({
    fullname:user?.fullname,
    email:user?.email,
    phonenumber:user?.phonenumber,
    bio:user?.profile?.bio,  
    skills:user?.profile?.skills.map(skill=>skill),  
    file:user?.profile?.resume
  })

  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value})
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({...input,file})
  }

  const submitHandler = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname",input.fullname)
    formData.append("email",input.email)
    formData.append("phonenumber",input.phonenumber)
    formData.append("bio",input.bio)
    formData.append("skills",input.skills)
    if(input.file)
    {
      formData.append("file",input.file)
    }

    try {
      setLoading(true)
      const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
        headers:{
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          "Content-Type":"multipart/form-data",
          },
        withCredentials:true, 
      })

      if(res.data.success)
        {
          dispatch(setUser(res.data.message))
          toast.success(res.data.message)
          console.log(res.data.user)
        } 
      }
    catch (error) {
        console.log(error)
        
    } finally{
      setLoading(false)
    }
    setOpen(false)
  }



  return (
    <div className=''>
       <Dialog open={open} className=''>
          <DialogContent className='bg-white text-black sm:max-w-[425]' onInteractOutside={()=> setOpen(false)}>
            <DialogHeader>
              <DialogTitle className=''>Update Profile</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <form onSubmit={submitHandler}>
               <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='name' className='text-right'>Name</Label>
                      <Input id="name"
                             name='name'
                             type='text'
                             value={input.fullname}
                             onChange={changeEventHandler}
                             className='col-span-3 border-gray-400 rounded-xl hover:border-black'
                      />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='email' className='text-right'>E-mail</Label>
                      <Input id="email"
                             name='email'
                              type='text'
                             value={input.email}
                             onChange={changeEventHandler}
                             className='col-span-3 border-gray-400 rounded-xl hover:border-black'
                      />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='number' className='text-right'>Number</Label>
                      <Input id="number"
                             name='phonenumber'
                              type='text'
                             value={input.phonenumber}
                             onChange={changeEventHandler}
                             className='col-span-3 border-gray-400 rounded-xl hover:border-black'
                      />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='bio' className='text-right'>Bio</Label>
                      <Input id="bio"
                             name='bio'
                              type='text'
                             value={input.bio}
                             onChange={changeEventHandler}
                             className='col-span-3 border-gray-400 rounded-xl hover:border-black'
                      />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='skills' className='text-right'>Skills</Label>
                      <Input id="skills"
                             type='text'
                             name='skills'
                             onChange={changeEventHandler}
                             value={input.skills}
                             className='col-span-3 border-gray-400 rounded-xl hover:border-black'
                      />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='file' className='text-right'>Resume</Label>
                      <Input id="file"
                             name='file'
                             type='file'
                             
                             onChange={fileChangeHandler}
                             accept='application/pdf'
                             
                             className='col-span-3 border-gray-400 rounded-xl hover:border-black'
                      />
                  </div>
               </div>
               <DialogFooter>
               {
                 loading ? <Button variant="outline" className="w-full my-4 rounded-xl bg-white hover:bg-black hover:text-white"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>please wait</Button> :
                 <Button variant="outline" className="w-full my-4 rounded-xl bg-white hover:bg-black hover:text-white" type="submit">Update</Button>
                }  
               </DialogFooter>
            </form>
              
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
