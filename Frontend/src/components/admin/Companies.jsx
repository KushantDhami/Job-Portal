import React,{useState,useEffect} from 'react'
import Navbar from '../shared/Navbar.jsx'
import {Input} from '../ui/input.jsx'
import {Button} from '../ui/button'
import CompaniesTable from './CompaniesTable.jsx'
import {useNavigate} from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies.jsx'
import {useDispatch} from 'react-redux'
import {setSearchCompanyByText} from "@/redux/companySlice.js"
function Companies() {


  const navigate=useNavigate()
  useGetAllCompanies() 

  const [input,setInput] = useState("")

  const searchEventHandler = (e) => {
    setInput(e.target.value)
  }
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
            <Input onChange={searchEventHandler} className='w-fit rounded-xl'
                   placeholder='Filter By Names'
            />
            <Button onClick={()=>navigate("/admin/companies/create")} variant='outline' className='rounded-xl bg-white text-black hover:bg-black hover:text-white'>New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
