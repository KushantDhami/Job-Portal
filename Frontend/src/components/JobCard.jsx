import React from 'react'
import {Button} from './ui/button'
import {Bookmark} from 'lucide-react'
import {Avatar,AvatarImage} from './ui/avatar'
import {Badge} from './ui/badge'
import {useNavigate} from 'react-router-dom'
function JobCard({job}) {
        const navigate= useNavigate()
       const daycount = (mt) => {
        const createdAt= new Date(mt);
        const current=new Date()
        const diff= current-createdAt;
        return Math.floor(diff/(1000*24*60*60))
       }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
              <p className='text-sm text-gray-500'>{daycount(job?.createdAt) === 0 ? "Today" : `${daycount(job?.createdAt)} days ago`}</p>
              <Button variant='outline' className='rounded-full' size='icon'><Bookmark/></Button>
        </div>
        <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                  <Avatar>
                        <AvatarImage src={job?.company?.logo}></AvatarImage>
                  </Avatar>
                </Button>
                <div className=''>
                        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                        <p>{job?.location}</p>
                </div>
        </div>
        <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
        </div>
        <div className='flex items-center gap-4 mt-4'>
                <Button variant='outline' onClick={()=>navigate(`/description/${job?._id}`)} className='bg-white hover:bg-red-500 rounded'>Details</Button>
                <Button variant='outline' className='bg-[#7209b7] bg-white hover:bg-[#5b30a6] rounded'>Save for Later</Button>
        </div>
            
    </div>
  )
}

export default JobCard
