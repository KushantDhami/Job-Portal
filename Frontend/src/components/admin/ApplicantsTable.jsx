import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {MoreHorizontal} from 'lucide-react'
import {useSelector} from 'react-redux'
import {APPLICATION_API_END_POINT} from '@/utils/constant.js'
import {toast} from 'sonner'
import axios from 'axios'

const shortListing = ["Accepted", "Rejected"]
function ApplicantsTable() {
    const {applicants} = useSelector(store=>store.application)
    axios.defaults.withCredentials = true
    const statusHandler = async (status,id) => {
        try{
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status})
            if(res.data.success)
            {
                toast.success(res.data.message)
            }
        }catch(error)
        {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent Applied User</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item)=>(

                            <TableRow key={item._id}>
                        <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phonenumber}</TableCell>
                        <TableCell className='text-blue-600'>
                           {
                            item?.applicant?.profile?.resume ?
                            <a href={item?.applicant?.profile?.resume} target='_blank'>{item?.applicant?.profile?.resumeoriginalname}</a> : <span>NA</span>
                           }
                        </TableCell>
                        <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                <PopoverContent className=''>

                            {
                                shortListing.map((status, index) => {
                                    return (
                                        <div onClick={()=>statusHandler(status,item?._id)} className='flex flex-col w-fit mx-auto items-center justify-center gap-3' key={index}>
                                            <span>{status}</span>
                                        </div>
                                    )
                                })
                            }
                            </PopoverContent>
                                    </Popover>
                        </TableCell>
                    </TableRow>
                            ))
                        }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable
