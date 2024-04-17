import { Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='flex flex-row-reverse items-center justify-between md:mr-[250px] p-4 mt-4 bg-red-50'>
     <div className="flex items-center justify-center">
        <a href='http://localhost:5173/dashboard'>
          <Text>
            تمامی حقوق محفوظ است.
          </Text>
        </a>
        <a href='http://localhost:5173/dashboard'>
          <img className='inline' src="/logo_hix.svg" alt="" width={50} />
        </a>
     </div>
      
      <div className="">
        <Link to="/dashboard/rules" className='text-gray-800 underline underline-offset-4 decoration-blue-700'>
          قوانین
        </Link>
        <Link to="/dashboard/rules" className='text-gray-800 mx-3 underline underline-offset-4 decoration-blue-700'>
          صفحه اصلی
        </Link>
      </div>
      
    </div>
  )
}
