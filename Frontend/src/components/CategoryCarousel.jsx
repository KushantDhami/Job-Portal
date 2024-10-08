import React,{useState} from 'react'
import {Carousel, CarouselContent, CarouselItem,CarouselPrevious,CarouselNext } from './ui/carousel.jsx'
import {Button } from './ui/button.jsx'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {setSearchedQuery} from '@/redux/jobSlice.js'
const category = [
  "Frontend Devloper",
  "Backend Devloper",
  "Data Science",
  "Graphics Designer",
  "FullStack Devloper",
  "Node"
]
function CategoryCarousel() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const searchJobHandler=(query)=>{

    dispatch(setSearchedQuery(query))
    navigate("/browse")
    
  }
  return (
    <div className='text-center'>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
         <CarouselContent>
            {
              category.map((cat,index)=>(
                <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={index}>
                    <Button onClick={()=>searchJobHandler(cat)} variant='outline' className='rounded-full'>{cat}</Button>
               </CarouselItem>
              ))
            }
         </CarouselContent>
         <CarouselPrevious/>
         <CarouselNext/>
      </Carousel>
     </div>
  )
}

export default CategoryCarousel
