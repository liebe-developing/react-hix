import {
    Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Flex, Table, useColorMode, SimpleGrid,
} from '@chakra-ui/react'
import { CardeCom } from '../components';


function Report() {
    // const even = new EventSource()
    // even.
    const { colorMode } = useColorMode();
    return (
        <div className="flex flex-col">
            <SimpleGrid
                border='1px' borderColor='gray.200'
                rounded="10px"
                mx="10px"
                my="10px"
                padding="10px"
                gap="20px"
                columns={[2, null, 4]}
                
            >
                <CardeCom title="بیشترین خرید" caption="بیشترین خرید برسی کنید" button="برسی کن" />
                <CardeCom title="محصولات" caption="بیشترین محصولات برسی کنید" button="برسی کن" />
                <CardeCom title="فروش چند هفته قبل!" caption="بیشترین خرید برسی کنید" button="برسی کن" />
                <CardeCom title="خرید چند هفته قبل!" caption="بیشترین خرید برسی کنید" button="برسی کن" />

            </SimpleGrid>
            {/* TABEL CONTENT */}

            <div className="flex flex-col mt-3 ">
                <div className="overflow-x-auto sm:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:text-center px-[10px]">
                        <div className="overflow-hidden rounded-md">
                            <table className="min-w-full">
                                <thead className="bg-blue-500 border-b ">
                                    <tr className='text-white'>
                                        <th scope="col" className="text-sm font-medium  text-center py-4">
                                            ایدی
                                        </th>
                                        <th scope="col" className="text-sm font-medium  text-center py-4 ">
                                            بیشترین خرید
                                        </th>
                                        <th scope="col" className="text-sm font-medium  text-center py-4 ">
                                            بیشترین چت
                                        </th>
                                        <th scope="col" className="text-sm font-medium  text-center py-4 ">
                                            اخرین برسی
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='border-2'>
                                    <tr
                                        bg={colorMode === "light" ? "gray.300" : "gray.700"}
                                        className="border-b ">
                                        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">1</td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            لب تاب
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            گزارشات
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            ماه پیش
                                        </td>
                                    </tr>
                                    <tr
                                        bg={colorMode === "light" ? "gray.300" : "gray.700"}
                                        className="border-b">
                                        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">2</td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            کولد پد
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            برسی
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            روز پیش
                                        </td>
                                    </tr>
                                    <tr
                                        bg={colorMode === "light" ? "gray.300" : "gray.700"}
                                        className="border-b">
                                        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">3</td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            دسته بازی
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            جایگاه
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            ماه پیش
                                        </td>
                                    </tr>
                                    <tr
                                        bg={colorMode === "light" ? "gray.300" : "gray.700"}
                                        className="border-b">
                                        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">4</td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            خودکار
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            سایت ها
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            هفته پیش
                                        </td>
                                    </tr>
                                    <tr
                                        bg={colorMode === "light" ? "gray.300" : "gray.700"}
                                        className="border-b">
                                        <td className="text-center py-4 whitespace-nowrap text-sm font-medium ">5</td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            اخرین خرید
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            فروشگا ها
                                        </td>
                                        <td className="text-sm  font-light text-center py-4 whitespace-nowrap">
                                            چند لحظه قبل
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* test */}

        </div>
    )
}

export default Report
