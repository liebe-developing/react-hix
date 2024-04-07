
import react from 'react'
import {
    Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Flex, Table,
} from '@chakra-ui/react'
import { FaShoppingBasket } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

function CardeCom({ title, caption, button, img }) {
    return (
        <Card
        shadow="md"
        display="flex">
            <CardHeader>
                <Heading size='md'>
                    <FaShoppingBasket className='text-5xl p-3 bg-blue-700 rounded-full
                    text-white
                    ' />
                </Heading>
            </CardHeader>
            <CardBody>
                <Text>خرید /
                    <span className="font-bold m-4 text-2xl">28947</span>
                </Text>
            </CardBody>
            <CardFooter display="flex" gap="10px">
                <FaArrowTrendDown className='text-2xl font-light inline-flex' />
                <h4>3% / سال قبل</h4>
            </CardFooter>
        </Card>
    )
}

export default CardeCom
