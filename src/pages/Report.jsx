import {
    Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Flex, Table, useColorMode, SimpleGrid,
    useToast,
    Spinner,
} from '@chakra-ui/react'
import { CardeCom } from '../components';
import { FaShoppingBasket } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useState,useEffect } from 'react';
import { apiGetRequest } from '../api/apiRequest';
import { useOutletContext } from 'react-router-dom';
import { useFetch } from '../hook';


function Report() {
    const { userToken, userContent } = useOutletContext();
    const { colorMode } = useColorMode();
    const [valueReport,setValueReport] = useState();

    const [data] = useFetch(`/api/user_plan/${ userContent.user_plan_id }/report`,userToken);
    
    return (
        <div className="flex flex-col">
                <SimpleGrid
                rounded="10px"
                padding="10px"
                gap="20px"
                columns={[1, null, 2]}
            >
                <CardeCom sum={data ? data.chatCount : "0"} title="تعداد چت" discount="0" iconsTitle={<IoChatboxEllipsesOutline className='text-5xl mr-16 p-2 bg-blue-700 rounded-full text-white' />} />
                <CardeCom sum={data ? data.productCount : "0"} title="تعداد محصولات" discount="0" iconsTitle={<FaShoppingBasket className='text-5xl p-2 bg-blue-700 rounded-full text-white' />} />


            </SimpleGrid>
            {/* TABEL CONTENT */}
            {!data ? <div className="w-full h-[250px] flex items-center justify-center"><Spinner size="xl" /></div> : (
                <div className="flex flex-col py-1 ">
                    <div className="overflow-x-auto sm:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:text-center px-[10px]">
                            <div className="overflow-hidden rounded-md">
                                <table className="min-w-full">
                                    <thead className="bg-blue-500 border-b ">
                                        <tr className='text-white'>
                                            <th scope="col" className="text-sm font-medium  text-center py-4">
                                                ردیف
                                            </th>
                                            <th scope="col" className="text-sm font-medium  text-center py-4 ">
                                                تعداد کاربران ویجت
                                            </th>
                                            <th scope="col" className="text-sm font-medium  text-center py-4 ">
                                                مدت زمان
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className='border-2'>
                                        <tr
                                            bg={colorMode === "light" ? "gray.300" : "gray.700"}
                                            className="border-b">
                                            <td className={"text-center py-4 whitespace-nowrap text-sm font-medium border-l border-gray-400 " + (colorMode === "light" ? "bg-gray-300" : "bg-[#1a202c]")}>1</td>
                                            <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                                {data.pastChatCount[0]}
                                            </td>
                                            <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                                24 ساعت گذشته
                                            </td>
                                        </tr>

                                        <tr
                                            bg={colorMode === "light" ? "gray.300" : "gray.700"}
                                            className="border-b">
                                            <td className={"text-center py-4 whitespace-nowrap text-sm font-medium border-l border-gray-400 " + (colorMode === "light" ? "bg-gray-300" : "bg-[#1a202c]")}>2</td>
                                            <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                                {data.pastChatCount[1]}
                                            </td>
                                            <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                                7 روز گذشته
                                            </td>
                                        </tr>
                                        <tr
                                            bg={colorMode === "light" ? "gray.300" : "gray.700"}
                                            className="border-b">
                                            <td className={"text-center py-4 whitespace-nowrap text-sm font-medium border-l border-gray-400 " + (colorMode === "light" ? "bg-gray-300" : "bg-[#1a202c]")}>3</td>
                                            <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                                {data.pastChatCount[2]}
                                            </td>
                                            <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                                30 روز گذشته
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Report
