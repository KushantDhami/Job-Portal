import React,{useState} from 'react'
import Navbar from './shared/Navbar.jsx'
import AppliedJobsTable from './AppliedJobsTable.jsx'
import {Pen , Contact , Mail} from 'lucide-react'
import {Avatar , AvatarImage } from './ui/avatar.jsx'
import {Button} from './ui/button'
import {Badge} from './ui/badge'
import { Label } from './ui/label'
import UpdateProfileDialog from './UpdateProfileDialog.jsx'
import {useSelector} from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJob.jsx'

const isResume = true 

function Profile() {
  useGetAppliedJobs()
  const [open,setOpen] = useState(false)
  const {user} =useSelector(store=>store.auth)
  return (
    <div>
      <Navbar/>
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 '>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className='h-24 w-24' >
                        <AvatarImage src='https://tse3.mm.bing.net/th?id=OIP.Yibqr7QEIOmGnkMIaa_JMAHaHa&pid=Api&P=0&h=180'></AvatarImage>
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>
                <Button onClick={()=>setOpen(true)} className='text-right rounded-xl' variant='outline'><Pen/></Button>
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                  <Mail/>
                  <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                  <Contact/>
                  <span>{user?.phonenumber}</span>
                </div>
            </div>
            <div className='my-5'>
                <h1>Skills</h1>
                <div className='flex items-center gap-1'>
                  {
                    user?.profile?.skills.length !==0 ? user?.profile?.skills.map((item,index) => <Badge className='shadow-xl' variant='outline'key={index}>{item}</Badge>) : <span>NA</span>
                  }
                </div>
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
               <Label className='text-md font-bold'>Resume</Label>
               {
                isResume ? <a target="blank" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeoriginalname}</a> : <span>NA</span>
               }
            </div>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
          <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
          <AppliedJobsTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile

