import {useEffect} from 'react'
import {setCompanies} from '@/redux/companySlice.js'
import axios from 'axios'
import {COMPANY_API_END_POINT} from '@/utils/constant.js'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'sonner'
function useGetAllCompanies() {

  const dispatch = useDispatch()
    useEffect(()=>{
      const fetchAllCompany = async () => {
        try{
          const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true})
          
          if(res.data.success)
            {
                dispatch(setCompanies(res.data.companies))    
            }   
            
        }
        catch(error)
        {
            console.log(error)
        }
    }
    fetchAllCompany();
},[])

  
}

export default useGetAllCompanies
