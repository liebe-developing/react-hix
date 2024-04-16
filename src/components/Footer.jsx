import { Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
      <a href='http://localhost:5173/dashboard' className='flex items-center justify-center p-2  bg-red-50'>
       
              <Text>
                  تمامی حقوق محفوظ است.
              </Text>
              <img className='inline' src="/logo_hix.svg" alt="" width={50} />
      </a>
  )
}
