import {useEffect} from 'react'
import {setAllJobs,setSearchedQuery} from '@/redux/jobSlice'
import axios from 'axios'
import {JOB_API_END_POINT} from '@/utils/constant.js'
import {useDispatch,useSelector} from 'react-redux'

function useGetAllJobs() {
  
  const dispatch = useDispatch()
  const {searchedQuery} = useSelector(store=>store.job)
  
    useEffect(()=>{
      const fetchAllJobs = async () => {
        try{
          const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true})
          
          if(res.data.success)
            {
              dispatch(setAllJobs(res.data.jobs))    
             
                }     
        }
        catch(error)
        {
          console.log(error)
        }
      }
        fetchAllJobs();
      },[])
  
}

export default useGetAllJobs
