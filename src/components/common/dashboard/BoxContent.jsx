import { Box } from '@chakra-ui/react'
import React from 'react'
import { InstIcon, MenuCricle } from '../../../constants/icons'

function BoxUiContentHero({label,number}) {
    return (
        <Box bg='tomato' width={130} height='60px' p={1} className="box_border" >
            <h5 className="text-sm">خدمات ویژه</h5>
            <div className="flex justify-around my-2 text-purple-500">
                <h2>544213</h2>
                <h2>|</h2>
            </div>
        </Box>
    )
}

function BoxUiContentBottom ({icon,lable}) {
    return (
        <Box height='80px'>
            <div className="box_border flex items-center justify-around w-full h-full cursor-pointer bg-red-300
            hover:bg-red-400 rounded-2xl py-4 shadow-xl ">
                <div className="">
                    <h3>اینستاگرام</h3>
                    <h3 className="mr-3 mt-2"><InstIcon className="bg-gray-500 text-white text-4xl rounded-full p-[3px]" /></h3>
                </div>
                <span><MenuCricle className="text-3xl" /></span>
            </div>
        </Box>
    )
}

export {
    BoxUiContentHero,
    BoxUiContentBottom
}




