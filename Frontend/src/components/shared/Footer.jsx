import { Facebook ,Instagram ,Linkedin} from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='flex flex justify-around'>
      <div className='flex flex-col items-center justify-center gap-3 m-5'>
          <h1 className='text-blue-700 font-bold text-3xl'>Let's Keep In Touch <span className='text-[#F83002]  font-bold flex flex-col justify-center items-center p-1'>Job Portal</span></h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-3 m-5'>
      <h1 className='text-blue-700 font-bold text-xl'>Contact us on email <span className='text-[#F83002]  font-bold flex flex-col justify-center items-center p-1'>Job Portal</span></h1>

          <p className='hover:text-white hover:bg-blue-300 border border-gray-100 hover:rounded-xl hover:p-1'>JobPortal@gmail.com</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-3 border border-gray-100 rounded m-5 p-3 '>
          <div className='flex gap-3'>
              <p><Facebook></Facebook></p>
              <p className='text-blue-700 font-bold'>JOB<span className='text-red-400'> Portal</span></p>
            </div>
            <div className='flex gap-3 font-bold'>
              <p><Instagram></Instagram></p>
              <p className='text-blue-700 '>JOB<span className='text-red-400'> Portal</span></p>
            </div>
            <div className='flex gap-3 font-bold'>
              <p><Linkedin></Linkedin></p>
              <p className='text-blue-700 '>JOB<span className='text-red-400'> Portal</span></p>
            </div>
          
      </div>
    </div>
  )
}

export default Footer
