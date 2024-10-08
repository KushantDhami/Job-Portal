import React,{useState} from 'react'
import {Button} from '@/components/ui/button.jsx'
import {Search} from 'lucide-react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {setSearchedQuery} from '@/redux/jobSlice.js'
function HeroSection() {
  const [query,setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-5'>
      <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium mx-auto'><span>No 1 Job Hunt webSite</span></span>
      <h1 className='text-5xl font-bold'>Search , Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel molestiae amet vero perferendis nostrum </p>
      <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
        <input type="text"
               onChange={(e)=>setQuery(e.target.value)}
               placeholder='Find Your Dream Jobs'
               className='outline-none border-none w-full'/>
        <Button onClick={searchJobHandler}variant="outline" className='rounded-r-full bg-[#6A38C2] hover:bg-red-400'>
                <Search className='h-5 w-5'/>
        </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
