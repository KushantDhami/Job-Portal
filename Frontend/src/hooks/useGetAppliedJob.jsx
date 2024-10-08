import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {APPLICATION_API_END_POINT} from '@/utils/constant.js'
import {setAllAppliedJobs} from '@/redux/jobSlice.js'
function useGetAppliedJob() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchAppliedJobs= async ()=>{
      try{
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true})
        console.log(res.data)
        if(res.data.success)
        {
          dispatch(setAllAppliedJobs(res.data.application))
        }
      }
      catch(error)
      {
        console.log(error)
      }
    }
    fetchAppliedJobs()
  },[])
}

export default useGetAppliedJob
