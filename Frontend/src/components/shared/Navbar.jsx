import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {LogOut,User2} from 'lucide-react'
import {Link,useNavigate} from 'react-router-dom'
import Home from '../Home.jsx'
import {useDispatch,useSelector} from 'react-redux'
import {USER_API_END_POINT} from '@/utils/constant.js'
import axios from 'axios'
import {toast} from 'sonner'
import {setUser} from '@/redux/authSlice.js'
function Navbar() {


  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler= async () =>{
    try{
        const res= await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
        console.log(res)
        if(res.data.success)
        {
          dispatch(setUser(null))
          navigate("/")
          toast.success(res.data.message)
        }
    }
    catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  }


  return (
    <>
  <div className="bg-white">
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
          <div>
          <h1 className='text-2xl font-bold'>
          Job <span className='text-red-400'> Portal</span>
          </h1>
          </div>

      <div className='flex items-center gap-12 '>
        <ul className='flex font-medium items-center gap-5'>
          {
            user && user.role === 'recruiter' ? (
              <>
              <li><Link to="/admin/companies">Companies</Link></li>
              <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ):
            <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/browse">Browse</Link></li>
            </>
          }
        </ul>
      {
          !user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline" className='bg-white hover:bg-red-500 rounded'>Login</Button></Link>  
              <Link to="/singup"><Button variant="outline" className='bg-white hover:bg-[#5b30a6] rounded'>SingUp</Button></Link>  
            </div>
          ) : 
          (

            <Popover>
        <PopoverTrigger asChild>
             <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />  
             </Avatar>
        </PopoverTrigger>

        <PopoverContent className="w-80">
          <div className='flex items-center space-y-2'>
               <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />  
               </Avatar>
               <div className='flex flex-col mx-3 mb-3'>
                     <h4 className='font-medium'>{user?.fullname}</h4>
                     <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
               </div>
          </div>
               <div className='flex flex-col my-2 text-grey-600'>
                    {
                      user.role === 'student' && (
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2/>
                     <Button variant="link"><Link to='profile'>View Profile</Link></Button>
                     </div>
                      )
                    }
                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
                     <LogOut/>
                     <Button onClick={logoutHandler} variant="link">Logout</Button>
                     </div>
               </div>
        </PopoverContent>
      </Popover>
      )
  }

      </div>
    </div> 
  </div>
    
    </>
  )
}

export default Navbar
