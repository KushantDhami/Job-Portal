import React,{useState,useEffect} from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'


function CompaniesTable() {

  const { companies,searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany,setFilterCompany] = useState()

  useEffect(()=>{
    const filteredCompany = companies.length > 0 && companies.filter((company)=>{
        if(!searchCompanyByText)
        {
          return true
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  },[companies,searchCompanyByText])
  return (
    <div>
      <Table className='my-10'>
        <TableCaption>A list of your registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterCompany?.map((company) => (
              
                <tr key={companies._id}>
                   
                      <TableCell className="font-medium">
                        <div className='flex items-center gap-4'>
                          <Avatar className='h-10 w-10' >
                            <AvatarImage src={company.logo}></AvatarImage>
                          </Avatar>
                        </div>
                      </TableCell>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                      <TableCell className="text-right">
                        <Popover className='w-32'>
                          <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                          <PopoverContent className='w-32'>
                            <div className='flex gap-5 items-center w-fit cursor-pointer'>
                              <Link to={`/admin/companies/${company._id}`} >
                              <Edit2 />
                              <span>Edit</span>
                              </Link>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    
                </tr>
              )
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
